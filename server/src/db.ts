import type { Todo } from '@todo-app/shared';

export interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export const users = new Map<string, StoredUser>();
export const todos = new Map<string, Todo>();
