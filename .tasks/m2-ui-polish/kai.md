# Task: Implement UI Polish với shadcn/ui

## Context
Trung feedback: UI xấu. Cần refactor UI với shadcn/ui (Tailwind-based component library).

## Steps
1. Chờ <@1480799899107856404> commit design-system.md
2. Setup shadcn/ui:
   ```bash
   cd packages/client
   npx shadcn@latest init
   ```
   Config: Tailwind, TypeScript, src/ structure
3. Install components cần thiết:
   ```bash
   npx shadcn@latest add button input card checkbox
   ```
4. Refactor UI theo design-system.md:
   - Replace existing buttons/inputs với shadcn components
   - Update TodosPage layout (filter buttons, spacing)
   - Update TodoItem (edit/delete buttons, checkbox)
   - Update forms (LoginPage, RegisterPage)
5. Run tests: npx vitest run
6. Iterate đến khi ALL GREEN
7. Commit: git add -A && git commit -m "feat: polish UI with shadcn/ui"

## Rules
- **KHÔNG sửa test logic.** Tests phải vẫn GREEN sau refactor.
- Nếu test assertions dựa trên class names cũ → update test setup (KHÔNG sửa expect).
- Maintain existing functionality — chỉ thay đổi visual/styling.
- Design system từ Mia = source of truth cho colors/spacing.

## Reference
- shadcn/ui docs: https://ui.shadcn.com/docs
- Design system: `.tasks/m2-ui-polish/design-system.md`
