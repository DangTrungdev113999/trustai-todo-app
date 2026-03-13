import { Router } from 'express';
import crypto from 'node:crypto';
import type { RegisterRequest, LoginRequest, AuthResponse, ErrorResponse } from '@todo-app/shared';
import { users } from '../db.js';
import { hashPassword, comparePassword, generateTokens } from '../auth.js';

const router = Router();

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post('/register', (req, res) => {
  const { email, password } = req.body as RegisterRequest;

  if (!isValidEmail(email)) {
    const body: ErrorResponse = { error: 'Invalid email format', code: 'INVALID_EMAIL' };
    res.status(400).json(body);
    return;
  }

  if (!password || password.length < 8) {
    const body: ErrorResponse = { error: 'Password must be at least 8 characters', code: 'WEAK_PASSWORD' };
    res.status(400).json(body);
    return;
  }

  const existingUser = [...users.values()].find(u => u.email === email);
  if (existingUser) {
    const body: ErrorResponse = { error: 'Email already exists', code: 'EMAIL_EXISTS' };
    res.status(400).json(body);
    return;
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const passwordHash = hashPassword(password);

  users.set(id, { id, email, passwordHash, createdAt: now });

  const tokens = generateTokens(id);
  const body: AuthResponse = {
    user: { id, email, createdAt: now },
    tokens,
  };
  res.status(201).json(body);
});

router.post('/login', (req, res) => {
  const { email, password } = req.body as LoginRequest;

  const user = [...users.values()].find(u => u.email === email);
  if (!user) {
    const body: ErrorResponse = { error: 'Invalid credentials', code: 'INVALID_CREDENTIALS' };
    res.status(401).json(body);
    return;
  }

  if (!comparePassword(password, user.passwordHash)) {
    const body: ErrorResponse = { error: 'Invalid credentials', code: 'INVALID_CREDENTIALS' };
    res.status(401).json(body);
    return;
  }

  const tokens = generateTokens(user.id);
  const body: AuthResponse = {
    user: { id: user.id, email: user.email, createdAt: user.createdAt },
    tokens,
  };
  res.status(200).json(body);
});

export { router as authRouter };
