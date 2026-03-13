# Task: Implement Auth + CRUD Todos Backend

## Tests cần pass
Tất cả BE tests trong branch feature/auth-crud (Quinn sẽ tạo)

## Steps
1. Đọc types + tests để hiểu requirements
2. Implement BE: routes, logic, database — TỰ QUYẾT ĐỊNH cách tổ chức
3. Run: npx vitest run <test-path>
4. Iterate đến khi ALL GREEN
5. Commit: git add -A && git commit -m "feat: implement auth-crud backend"

## Rules
- TOÀN QUYỀN: folder structure, dependencies, patterns, database
- TypeScript strict, no any
- Import shared types đã có
- KHÔNG sửa test files

## Spec

**API Contracts:**

**POST /api/auth/register**
- Request: `RegisterRequest { email: string, password: string }`
- Response 201: `AuthResponse { user: User, tokens: AuthTokens }`
- Response 400: `ErrorResponse` (email already exists / invalid email / weak password < 8 chars)

**POST /api/auth/login**
- Request: `LoginRequest { email: string, password: string }`
- Response 200: `AuthResponse { user: User, tokens: AuthTokens }`
- Response 401: `ErrorResponse` (invalid credentials)

**GET /api/todos**
- Headers: `Authorization: Bearer <accessToken>`
- Response 200: `TodosListResponse { todos: Todo[] }` (chỉ todos của user authenticated)
- Response 401: `ErrorResponse` (unauthorized)

**POST /api/todos**
- Headers: `Authorization: Bearer <accessToken>`
- Request: `CreateTodoRequest { content: string }`
- Response 201: `TodoResponse { todo: Todo }`
- Response 400: `ErrorResponse` (content empty)
- Response 401: `ErrorResponse` (unauthorized)

**PATCH /api/todos/:id**
- Headers: `Authorization: Bearer <accessToken>`
- Request: `UpdateTodoRequest { content?: string, completed?: boolean }`
- Response 200: `TodoResponse { todo: Todo }`
- Response 400: `ErrorResponse` (invalid data / EMPTY_UPDATE if no fields provided)
- Response 401: `ErrorResponse` (unauthorized)
- Response 404: `ErrorResponse` (todo not found OR cross-user access - treat same as not found)

**DELETE /api/todos/:id**
- Headers: `Authorization: Bearer <accessToken>`
- Response 204: No content
- Response 401: `ErrorResponse` (unauthorized)
- Response 404: `ErrorResponse` (todo not found OR cross-user access - treat same as not found)

**Security:**
- Cross-user access: User B KHÔNG được PATCH/DELETE/GET todo của user A → trả về 404 (không expose 403)
- Passwords phải hash trước khi lưu DB
- JWT tokens cho auth
