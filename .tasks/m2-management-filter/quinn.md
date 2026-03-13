# Task: Viết types + tests cho M2 — Edit, Delete, Filter

## Steps
1. git checkout develop && git checkout -b feature/m2-management-filter
2. Viết shared types (TypeScript interfaces) từ spec
3. Viết unit tests: API tests + component tests
4. Commit: git add -A && git commit -m "test: add types + tests for m2-management-filter (all RED)"

## Spec

**Shared Types:**
```typescript
// Todo interface (từ M1, không thay đổi)
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

// Filter type
type TodoFilter = 'all' | 'active' | 'completed';

// Update request
interface UpdateTodoRequest {
  text: string;
}
```

**API Contracts:**

**PUT /api/todos/:id**
- Request body: `{ "text": "updated content" }`
- Response 200: `{ "id": "...", "text": "updated content", "completed": false, "createdAt": "..." }`
- Response 404: `{ "error": "Todo not found" }`
- Response 400: `{ "error": "Invalid text" }` (nếu text empty/missing)

**DELETE /api/todos/:id**
- Request body: none
- Response 200: `{ "message": "Todo deleted" }`
- Response 404: `{ "error": "Todo not found" }`

**GET /api/todos?filter=all|active|completed**
- Query param: `filter` (optional, default "all")
- Response 200: `Todo[]` (filtered theo filter param)
- Response 400: `{ "error": "Invalid filter" }` (nếu filter không phải all/active/completed)

**Test Scenarios:**

**Edit Todo:**
- Render todo list → click edit button trên 1 todo → input hiện ra với text hiện tại → sửa text → save → verify text mới hiển thị
- Edit với text rỗng → verify error message
- Edit todo không tồn tại → verify 404

**Delete Todo:**
- Render todo list → click delete button trên 1 todo → verify todo biến mất khỏi list
- Delete todo không tồn tại → verify 404

**Filter Todos:**
- Setup: 3 todos (2 active, 1 completed)
- Render todo list với filter "all" → verify 3 todos hiển thị
- Chọn filter "active" → verify 2 todos hiển thị
- Chọn filter "completed" → verify 1 todo hiển thị
- Filter với giá trị invalid → verify error

**Edit UX (Inline Edit):**
- Default state: todo row hiển thị text + checkbox + edit button + delete button
- Click edit button → todo row chuyển thành input field (chứa text hiện tại) + save button + cancel button
- Click save → gọi PUT /api/todos/:id → update UI với text mới
- Click cancel → revert về text cũ, không gọi API

## Rules
- Chỉ viết types + tests. KHÔNG implement.
- Tests phải chạy được nhưng FAIL (RED).
- Tự quyết định vị trí file tests.
- **FE tests = CHỈ render tests.** Verify components render + key elements exist.
- **TUYỆT ĐỐI KHÔNG dùng vi.mock() trong FE tests.** Không mock react-router-dom, useNavigate, fetch, etc.
- FE test pattern: `render(<MemoryRouter><Component /></MemoryRouter>)` → `expect(screen.getByRole(...))`.
