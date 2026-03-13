# Task: Viết types + tests cho Auth + CRUD Todos

## Steps
1. git checkout develop && git checkout -b feature/auth-crud
2. Viết shared types (TypeScript interfaces) từ spec
3. Viết unit tests: API tests + component tests
4. Commit: git add -A && git commit -m "test: add types + tests for auth-crud (all RED)"

## Spec

**Shared Types:**
```typescript
// User
interface User {
  id: string;
  email: string;
  createdAt: string;
}

// Todo
interface Todo {
  id: string;
  userId: string;
  content: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth
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

// Todos
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

// Errors
interface ErrorResponse {
  error: string;
  code: string;
}
```

**API Contracts:**

**POST /api/auth/register**
- Request: `RegisterRequest`
- Response 201: `AuthResponse`
- Response 400: `ErrorResponse` (email already exists / invalid email / weak password)

**POST /api/auth/login**
- Request: `LoginRequest`
- Response 200: `AuthResponse`
- Response 401: `ErrorResponse` (invalid credentials)

**GET /api/todos**
- Headers: `Authorization: Bearer <accessToken>`
- Response 200: `TodosListResponse`
- Response 401: `ErrorResponse` (unauthorized)

**POST /api/todos**
- Headers: `Authorization: Bearer <accessToken>`
- Request: `CreateTodoRequest`
- Response 201: `TodoResponse`
- Response 400: `ErrorResponse` (content empty)
- Response 401: `ErrorResponse` (unauthorized)

**PATCH /api/todos/:id**
- Headers: `Authorization: Bearer <accessToken>`
- Request: `UpdateTodoRequest`
- Response 200: `TodoResponse`
- Response 400: `ErrorResponse` (invalid data / EMPTY_UPDATE)
- Response 401: `ErrorResponse` (unauthorized)
- Response 404: `ErrorResponse` (todo not found / cross-user access)

**DELETE /api/todos/:id**
- Headers: `Authorization: Bearer <accessToken>`
- Response 204: No content
- Response 401: `ErrorResponse` (unauthorized)
- Response 404: `ErrorResponse` (todo not found / cross-user access)

**Test Scenarios:**

**Auth Flow:**
- Register with valid email + password → 201 with user + tokens
- Register with existing email → 400 error
- Register with invalid email format → 400 error
- Register with weak password (< 8 chars) → 400 error
- Login with valid credentials → 200 with user + tokens
- Login with wrong password → 401 error
- Login with non-existent email → 401 error

**CRUD Flow:**
- Create todo without auth → 401 error
- Create todo with valid token + content → 201 with todo
- Create todo with empty content → 400 error
- Get todos without auth → 401 error
- Get todos with valid token → 200 with todos array (chỉ todos của user đó)
- Update todo without auth → 401 error
- Update todo with valid token → 200 with updated todo
- Update todo của user khác → 404 error
- Update todo với empty body → 400 error (code: "EMPTY_UPDATE")
- Update non-existent todo → 404 error
- Delete todo without auth → 401 error
- Delete todo with valid token → 204
- Delete todo của user khác → 404 error
- Delete non-existent todo → 404 error

**FE Render Tests:**
- Register page renders email + password fields + submit button
- Login page renders email + password fields + submit button
- Todos page renders list of todos + create form
- Each todo item renders content + edit + delete buttons
- Edit mode shows input field + save/cancel buttons

## Rules
- Chỉ viết types + tests. KHÔNG implement.
- Tests phải chạy được nhưng FAIL (RED).
- Tự quyết định vị trí file tests.
- **FE tests = CHỈ render tests.** Verify components render + key elements exist.
- **TUYỆT ĐỐI KHÔNG dùng vi.mock() trong FE tests.** Không mock react-router-dom, useNavigate, fetch, etc.
- FE test pattern: `render(<MemoryRouter><Component /></MemoryRouter>)` → `expect(screen.getByRole(...))`.
