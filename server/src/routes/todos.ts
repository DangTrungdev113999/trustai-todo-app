import { Router } from 'express';
import crypto from 'node:crypto';
import type { CreateTodoRequest, UpdateTodoRequest, TodoResponse, TodosListResponse, ErrorResponse, TodoFilter } from '@todo-app/shared';
import { todos } from '../db.js';
import { authMiddleware } from '../auth.js';

const validFilters: TodoFilter[] = ['all', 'active', 'completed'];

const router = Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  const userId = res.locals['userId'] as string;
  const filter = (req.query['filter'] as string | undefined) ?? 'all';

  if (!validFilters.includes(filter as TodoFilter)) {
    const body: ErrorResponse = { error: 'Invalid filter', code: 'INVALID_FILTER' };
    res.status(400).json(body);
    return;
  }

  let userTodos = [...todos.values()].filter(t => t.userId === userId);

  if (filter === 'active') {
    userTodos = userTodos.filter(t => !t.completed);
  } else if (filter === 'completed') {
    userTodos = userTodos.filter(t => t.completed);
  }

  const body: TodosListResponse = { todos: userTodos };
  res.status(200).json(body);
});

router.post('/', (req, res) => {
  const userId = res.locals['userId'] as string;
  const { content } = req.body as CreateTodoRequest;

  if (!content || !content.trim()) {
    const body: ErrorResponse = { error: 'Content is required', code: 'EMPTY_CONTENT' };
    res.status(400).json(body);
    return;
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const todo = { id, userId, content, completed: false, createdAt: now, updatedAt: now };
  todos.set(id, todo);

  const body: TodoResponse = { todo };
  res.status(201).json(body);
});

router.patch('/:id', (req, res) => {
  const userId = res.locals['userId'] as string;
  const { id } = req.params;
  const { content, completed } = req.body as UpdateTodoRequest;

  if (content === undefined && completed === undefined) {
    const body: ErrorResponse = { error: 'No fields to update', code: 'EMPTY_UPDATE' };
    res.status(400).json(body);
    return;
  }

  const todo = todos.get(id);
  if (!todo || todo.userId !== userId) {
    const body: ErrorResponse = { error: 'Todo not found', code: 'NOT_FOUND' };
    res.status(404).json(body);
    return;
  }

  if (content !== undefined) {
    if (!content.trim()) {
      const body: ErrorResponse = { error: 'Content is required', code: 'EMPTY_CONTENT' };
      res.status(400).json(body);
      return;
    }
    todo.content = content;
  }
  if (completed !== undefined) todo.completed = completed;
  todo.updatedAt = new Date().toISOString();

  const body: TodoResponse = { todo };
  res.status(200).json(body);
});

router.delete('/:id', (req, res) => {
  const userId = res.locals['userId'] as string;
  const { id } = req.params;

  const todo = todos.get(id);
  if (!todo || todo.userId !== userId) {
    const body: ErrorResponse = { error: 'Todo not found', code: 'NOT_FOUND' };
    res.status(404).json(body);
    return;
  }

  todos.delete(id);
  res.status(204).send();
});

export { router as todosRouter };
