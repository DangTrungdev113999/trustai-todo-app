# todo-app

## Project
- Description: Simple todo app with auth + CRUD
- GitHub: git@github.com:DangTrungdev113999/trustai-todo-app.git
- Started: 2026-03-13

## Workflow — TDD (Test-Driven Development)
1. Đọc Tech Spec trong docs/ hoặc Discord thread SPEC
2. Quinn viết shared types (`shared/types/`) + tests (ALL RED)
3. Sam implement BE (`server/`) để tests GREEN
4. Kai implement FE (`client/`) để tests GREEN
5. Quinn verify ALL GREEN + E2E (`e2e/`)

## Structure
```
todo-app/
  shared/types/    ← Quinn viết types từ spec (FE + BE import)
  client/          ← Kai setup + implement
  server/          ← Sam setup + implement
  e2e/             ← Quinn viết E2E tests (Playwright)
  .tasks/          ← Marcus generate task files cho agents
  docs/            ← Tech Spec + wiki
```

## Git — 1 Folder, 1 Repo
- Folder: ~/Desktop/TrustAI/todo-app/
- Tất cả agents làm việc trong CÙNG folder này
- KHÔNG clone, KHÔNG pull giữa các agents
- Chỉ commit sau mỗi bước, Marcus push + merge khi feature done
- Feature branches: feature/[name] từ develop

## Rules
- Tech stack quyết định trong Tech Spec, không tự chọn
- TypeScript strict mode, no `any`
- Mọi code phải có tests
- `shared/types/` là source of truth cho types
