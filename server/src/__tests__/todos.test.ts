import { describe, it, expect, beforeAll } from 'vitest';
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

describe('POST /api/todos', () => {
  it('should return 401 when creating todo without auth', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ content: 'Buy groceries' });

    expect(res.status).toBe(401);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });

  it('should create todo with valid token + content → 201', async () => {
    const token = await getAuthToken('create-todo@example.com', 'password123');

    const res = await request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Buy groceries' });

    expect(res.status).toBe(201);

    const body: TodoResponse = res.body;
    expect(body.todo).toBeDefined();
    expect(body.todo.id).toBeDefined();
    expect(body.todo.content).toBe('Buy groceries');
    expect(body.todo.completed).toBe(false);
    expect(body.todo.userId).toBeDefined();
    expect(body.todo.createdAt).toBeDefined();
    expect(body.todo.updatedAt).toBeDefined();
  });

  it('should return 400 when creating todo with empty content', async () => {
    const token = await getAuthToken('empty-todo@example.com', 'password123');

    const res = await request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: '' });

    expect(res.status).toBe(400);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });
});

describe('GET /api/todos', () => {
  it('should return 401 when getting todos without auth', async () => {
    const res = await request(app)
      .get('/api/todos');

    expect(res.status).toBe(401);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });

  it('should return todos array for authenticated user (only their todos)', async () => {
    const token = await getAuthToken('list-todos@example.com', 'password123');

    // Create a todo first
    await request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'My todo' });

    const res = await request(app)
      .get('/api/todos')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);

    const body: TodosListResponse = res.body;
    expect(body.todos).toBeDefined();
    expect(Array.isArray(body.todos)).toBe(true);
    expect(body.todos.length).toBeGreaterThanOrEqual(1);
    expect(body.todos[0].content).toBe('My todo');
  });
});

describe('PATCH /api/todos/:id', () => {
  it('should return 401 when updating todo without auth', async () => {
    const res = await request(app)
      .patch('/api/todos/some-id')
      .send({ content: 'Updated' });

    expect(res.status).toBe(401);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });

  it('should update todo with valid token → 200', async () => {
    const token = await getAuthToken('update-todo@example.com', 'password123');

    // Create a todo first
    const createRes = await request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Original content' });

    const todoId = (createRes.body as TodoResponse).todo.id;

    const res = await request(app)
      .patch(`/api/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Updated content', completed: true });

    expect(res.status).toBe(200);

    const body: TodoResponse = res.body;
    expect(body.todo.content).toBe('Updated content');
    expect(body.todo.completed).toBe(true);
  });

  it('should return 404 when updating another user\'s todo', async () => {
    const token1 = await getAuthToken('user1-update@example.com', 'password123');
    const token2 = await getAuthToken('user2-update@example.com', 'password123');

    // User1 creates a todo
    const createRes = await request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token1}`)
      .send({ content: 'User1 todo' });

    const todoId = (createRes.body as TodoResponse).todo.id;

    // User2 tries to update it
    const res = await request(app)
      .patch(`/api/todos/${todoId}`)
      .set('Authorization', `Bearer ${token2}`)
      .send({ content: 'Hacked!' });

    expect(res.status).toBe(404);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });

  it('should return 400 when updating with empty body', async () => {
    const token = await getAuthToken('empty-update@example.com', 'password123');

    const createRes = await request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Some todo' });

    const todoId = (createRes.body as TodoResponse).todo.id;

    const res = await request(app)
      .patch(`/api/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(400);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBe('EMPTY_UPDATE');
  });

  it('should return 404 when updating non-existent todo', async () => {
    const token = await getAuthToken('nonexist-update@example.com', 'password123');

    const res = await request(app)
      .patch('/api/todos/nonexistent-id')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Updated' });

    expect(res.status).toBe(404);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });
});

describe('DELETE /api/todos/:id', () => {
  it('should return 401 when deleting todo without auth', async () => {
    const res = await request(app)
      .delete('/api/todos/some-id');

    expect(res.status).toBe(401);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });

  it('should delete todo with valid token → 204', async () => {
    const token = await getAuthToken('delete-todo@example.com', 'password123');

    // Create a todo first
    const createRes = await request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'To delete' });

    const todoId = (createRes.body as TodoResponse).todo.id;

    const res = await request(app)
      .delete(`/api/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(204);
  });

  it('should return 404 when deleting another user\'s todo', async () => {
    const token1 = await getAuthToken('user1-delete@example.com', 'password123');
    const token2 = await getAuthToken('user2-delete@example.com', 'password123');

    // User1 creates a todo
    const createRes = await request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token1}`)
      .send({ content: 'User1 todo' });

    const todoId = (createRes.body as TodoResponse).todo.id;

    // User2 tries to delete it
    const res = await request(app)
      .delete(`/api/todos/${todoId}`)
      .set('Authorization', `Bearer ${token2}`);

    expect(res.status).toBe(404);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });

  it('should return 404 when deleting non-existent todo', async () => {
    const token = await getAuthToken('nonexist-delete@example.com', 'password123');

    const res = await request(app)
      .delete('/api/todos/nonexistent-id')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });
});
