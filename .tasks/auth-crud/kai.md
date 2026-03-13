# Task: Implement Auth + CRUD Todos Frontend

## Tests cần pass
Tất cả FE tests trong branch feature/auth-crud (Quinn sẽ tạo)

## Steps
1. Đọc types + tests để hiểu requirements
2. Implement FE: components, pages, API calls — TỰ QUYẾT ĐỊNH cách tổ chức
3. BẮT BUỘC: Config Vite proxy `/api` → `localhost:3000` (cho tunnel testing)
4. Nếu BE chưa xong → dùng MSW mock
5. Run: npx vitest run <test-path>
6. Iterate đến khi ALL GREEN
7. Commit: git add -A && git commit -m "feat: implement auth-crud frontend"

## Rules
- TOÀN QUYỀN: folder structure, UI framework, state management, routing
- TypeScript strict, no any
- Import shared types đã có
- KHÔNG sửa test assertions (expect statements). NẾU test có lỗi setup/import (vi.mock hoisting, missing module) → ĐƯỢC PHÉP fix setup.
- BẮT BUỘC Vite proxy cho API calls

## Spec

**UI Requirements:**

**Register Page:**
- Email input field
- Password input field
- Submit button
- Link to Login page

**Login Page:**
- Email input field
- Password input field
- Submit button
- Link to Register page

**Todos Page (sau khi đăng nhập):**
- List of todos (content, completed status)
- Each todo item có: edit button, delete button, checkbox (toggle completed)
- Create todo form (content input + submit button)
- Edit mode: input field + save/cancel buttons

**Shared Types:**
```typescript
interface User {
  id: string;
  email: string;
  createdAt: string;
}

interface Todo {
  id: string;
  userId: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface RegisterRequest {
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

interface CreateTodoRequest {
  content: string;
}

interface UpdateTodoRequest {
  content?: string;
  completed?: boolean;
}

interface TodoResponse {
  todo: Todo;
}

interface TodosListResponse {
  todos: Todo[];
}

interface ErrorResponse {
  error: string;
  code: string;
}
```
