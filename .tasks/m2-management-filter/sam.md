# Task: Implement M2 — Edit, Delete, Filter Backend

## Tests cần pass
`packages/server/src/__tests__/m2-management-filter.test.ts`

## Steps
1. Đọc types + tests để hiểu requirements
2. Implement BE: routes, logic, database — TỰ QUYẾT ĐỊNH cách tổ chức
3. Run: npx vitest run packages/server/src/__tests__/m2-management-filter.test.ts
4. Iterate đến khi ALL GREEN
5. Commit: git add -A && git commit -m "feat: implement m2-management-filter backend"

## Rules
- TOÀN QUYỀN: folder structure, dependencies, patterns, database
- TypeScript strict, no any
- Import shared types đã có
- KHÔNG sửa test files

## Spec

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
