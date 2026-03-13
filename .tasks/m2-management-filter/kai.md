# Task: Implement M2 — Edit, Delete, Filter Frontend

## Tests cần pass
`packages/client/src/__tests__/m2-management-filter.test.tsx`

## Steps
1. Đọc types + tests để hiểu requirements
2. Implement FE: components, pages, API calls — TỰ QUYẾT ĐỊNH cách tổ chức
3. BẮT BUỘC: Config Vite proxy `/api` → `localhost:3000` (cho tunnel testing)
4. Nếu BE chưa xong → dùng MSW mock
5. Run: npx vitest run packages/client/src/__tests__/m2-management-filter.test.tsx
6. Iterate đến khi ALL GREEN
7. Commit: git add -A && git commit -m "feat: implement m2-management-filter frontend"

## Rules
- TOÀN QUYỀN: folder structure, UI framework, state management, routing
- TypeScript strict, no any
- Import shared types đã có
- KHÔNG sửa test assertions (expect statements). NẾU test có lỗi setup/import (vi.mock hoisting, missing module) → ĐƯỢC PHÉP fix setup.
- BẮT BUỘC Vite proxy cho API calls

## Spec

**Edit UX (Inline Edit):**
- Default state: todo row hiển thị text + checkbox + edit button + delete button
- Click edit button → todo row chuyển thành input field (chứa text hiện tại) + save button + cancel button
- Click save → gọi PUT /api/todos/:id → update UI với text mới
- Click cancel → revert về text cũ, không gọi API

**Delete UX:**
- Mỗi todo có delete button
- Click delete → gọi DELETE /api/todos/:id → remove todo khỏi UI

**Filter UX:**
- UI có 3 filter buttons/tabs: "All", "Active", "Completed"
- Click filter → gọi GET /api/todos?filter=[value] → update danh sách todos hiển thị
- Default filter: "all"

**Shared Types:**
```typescript
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

type TodoFilter = 'all' | 'active' | 'completed';

interface UpdateTodoRequest {
  text: string;
}
```
