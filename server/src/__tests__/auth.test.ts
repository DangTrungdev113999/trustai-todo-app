import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import type { AuthResponse, ErrorResponse } from '@todo-app/shared';
import { app } from '../app.js';

describe('POST /api/auth/register', () => {
  it('should register with valid email and password → 201 with user + tokens', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(res.status).toBe(201);

    const body: AuthResponse = res.body;
    expect(body.user).toBeDefined();
    expect(body.user.id).toBeDefined();
    expect(body.user.email).toBe('test@example.com');
    expect(body.user.createdAt).toBeDefined();
    expect(body.tokens).toBeDefined();
    expect(body.tokens.accessToken).toBeDefined();
    expect(body.tokens.refreshToken).toBeDefined();
  });

  it('should return 400 when email already exists', async () => {
    // Register first
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'duplicate@example.com', password: 'password123' });

    // Try to register again with same email
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'duplicate@example.com', password: 'password456' });

    expect(res.status).toBe(400);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });

  it('should return 400 for invalid email format', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'not-an-email', password: 'password123' });

    expect(res.status).toBe(400);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });

  it('should return 400 for weak password (< 8 chars)', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'weak@example.com', password: 'short' });

    expect(res.status).toBe(400);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });
});

describe('POST /api/auth/login', () => {
  it('should login with valid credentials → 200 with user + tokens', async () => {
    // Register first
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'login@example.com', password: 'password123' });

    // Login
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@example.com', password: 'password123' });

    expect(res.status).toBe(200);

    const body: AuthResponse = res.body;
    expect(body.user).toBeDefined();
    expect(body.user.email).toBe('login@example.com');
    expect(body.tokens).toBeDefined();
    expect(body.tokens.accessToken).toBeDefined();
    expect(body.tokens.refreshToken).toBeDefined();
  });

  it('should return 401 for wrong password', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'wrong-pass@example.com', password: 'password123' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'wrong-pass@example.com', password: 'wrongpassword' });

    expect(res.status).toBe(401);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });

  it('should return 401 for non-existent email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nonexistent@example.com', password: 'password123' });

    expect(res.status).toBe(401);

    const body: ErrorResponse = res.body;
    expect(body.error).toBeDefined();
    expect(body.code).toBeDefined();
  });
});
