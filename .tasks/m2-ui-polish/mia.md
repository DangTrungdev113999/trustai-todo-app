# Task: Design System cho Todo App UI Polish

## Context
Trung feedback: UI hiện tại xấu (màu sắc + layout). Cần polish UI với shadcn/ui.

## Steps
1. Đọc shadcn/ui docs: https://ui.shadcn.com/docs
2. Define design system:
   - Color palette (primary, secondary, muted, accent, destructive)
   - Typography scale
   - Spacing system
   - Component styles (buttons, inputs, cards, filters)
3. Tạo file `design-system.md` trong `.tasks/m2-ui-polish/` với:
   - Tailwind color classes
   - Component variants (default, outline, ghost, destructive cho buttons)
   - Layout guidelines (spacing, padding, margins)
4. Screenshot references (nếu có) hoặc describe desired aesthetic
5. Commit: git add .tasks/m2-ui-polish/design-system.md && git commit -m "docs: add design system for UI polish"

## Output
`.tasks/m2-ui-polish/design-system.md` — Kai sẽ dùng làm reference khi implement.

## Rules
- Focus on modern, clean aesthetic
- Shadcn/ui compatible (Tailwind-first)
- Accessibility: good contrast, readable text sizes
- Mobile-friendly spacing
