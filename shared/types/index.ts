// ============================================================
// User
// ============================================================

export interface User {
  id: string;
  email: string;
  createdAt: string;
}

// ============================================================
// Todo
// ============================================================

export interface Todo {
  id: string;
  userId: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// Auth
// ============================================================

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// ============================================================
// Todos
// ============================================================

export type TodoFilter = 'all' | 'active' | 'completed';

export interface CreateTodoRequest {
  content: string;
}

export interface UpdateTodoRequest {
  content?: string;
  completed?: boolean;
}

export interface TodoResponse {
  todo: Todo;
}

export interface TodosListResponse {
  todos: Todo[];
}

// ============================================================
// Errors
// ============================================================

export interface ErrorResponse {
  error: string;
  code: string;
}
