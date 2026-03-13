import { describe, it, expect } from 'vitest';
import request from 'supertest';
import type { AuthResponse, TodoResponse, TodosListResponse, ErrorResponse } from '@todo-app/shared';
import { app } from '../app.js';

/**
 * Helper: Register + login, return accessToken
 */
async function getAuthToken(email: string, password: string): Promise<string> {
  await request(app)
    .post('/api/auth/register')
    .send({ email, password });

  const res = await request(app)
    .post('/api/auth/login')
    .send({ email, password });

  return (res.body as AuthResponse).tokens.accessToken;
}

/**
 * Helper: Create a todo and return its id
 */
async function createTodo(token: string, content: string): Promise<string> {
  const res = await request(app)
    .post('/api/todos')
    .set('Authorization', `Bearer ${token}`)
    .send({ content });

  return (res.body as TodoResponse).todo.id;
}

// ============================================================
// M2: Edit — empty content validation
// ============================================================

describe('PATCH /api/todos/:id — edit validation', () => {
  it('should return 400 when updating content to empty string', async () => {
    const token = await getAuthToken('m2-edit-empty@example.com', 'password123');
    const todoId = await createTodo(token, 'Original content');

    const res = await request(app)
      .patch(`/api/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: '' });

    expect(res.status).toBe(400);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });

  it('should return 400 when updating content to whitespace only', async () => {
    const token = await getAuthToken('m2-edit-whitespace@example.com', 'password123');
    const todoId = await createTodo(token, 'Original content');

    const res = await request(app)
      .patch(`/api/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: '   ' });

    expect(res.status).toBe(400);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });
});

// ============================================================
// M2: Delete — verify todo is actually removed
// ============================================================

describe('DELETE /api/todos/:id — verify removal', () => {
  it('should not return deleted todo in subsequent GET', async () => {
    const token = await getAuthToken('m2-delete-verify@example.com', 'password123');
    const todoId = await createTodo(token, 'To be deleted');

    // Delete the todo
    await request(app)
      .delete(`/api/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`);

    // Verify it's gone from the list
    const res = await request(app)
      .get('/api/todos')
      .set('Authorization', `Bearer ${token}`);

    const body: TodosListResponse = res.body;
    const found = body.todos.find(t => t.id === todoId);
    expect(found).toBeUndefined();
  });
});

// ============================================================
// M2: Filter — GET /api/todos?filter=
// ============================================================

describe('GET /api/todos?filter= — filter support', () => {
  let token: string;

  // Setup: 3 todos — 2 active, 1 completed
  beforeAll(async () => {
    token = await getAuthToken('m2-filter@example.com', 'password123');

    // Create 3 todos
    const id1 = await createTodo(token, 'Active todo 1');
    const id2 = await createTodo(token, 'Active todo 2');
    const id3 = await createTodo(token, 'Completed todo');

    // Mark todo 3 as completed
    await request(app)
      .patch(`/api/todos/${id3}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ completed: true });
  });

  it('should return all todos when filter=all', async () => {
    const res = await request(app)
      .get('/api/todos?filter=all')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);

    const body: TodosListResponse = res.body;
    expect(body.todos).toHaveLength(3);
  });

  it('should return only active (not completed) todos when filter=active', async () => {
    const res = await request(app)
      .get('/api/todos?filter=active')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);

    const body: TodosListResponse = res.body;
    expect(body.todos).toHaveLength(2);
    expect(body.todos.every(t => t.completed === false)).toBe(true);
  });

  it('should return only completed todos when filter=completed', async () => {
    const res = await request(app)
      .get('/api/todos?filter=completed')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);

    const body: TodosListResponse = res.body;
    expect(body.todos).toHaveLength(1);
    expect(body.todos.every(t => t.completed === true)).toBe(true);
  });

  it('should return 400 when filter value is invalid', async () => {
    const res = await request(app)
      .get('/api/todos?filter=invalid')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(400);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });
});
