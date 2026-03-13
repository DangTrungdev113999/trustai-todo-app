import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TodosPage } from '../pages/TodosPage';
import { TodoItem } from '../components/TodoItem';
import type { Todo } from '@todo-app/shared';

// ============================================================
// M2: Filter UI — TodosPage renders filter controls
// ============================================================

describe('TodosPage — filter controls', () => {
  it('renders filter button for "All"', () => {
    render(
      <MemoryRouter>
        <TodosPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
  });

  it('renders filter button for "Active"', () => {
    render(
      <MemoryRouter>
        <TodosPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: /active/i })).toBeInTheDocument();
  });

  it('renders filter button for "Completed"', () => {
    render(
      <MemoryRouter>
        <TodosPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument();
  });

  it('renders a navigation or group for filter buttons', () => {
    render(
      <MemoryRouter>
        <TodosPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('navigation', { name: /filter/i })).toBeInTheDocument();
  });
});

// ============================================================
// M2: Edit UX — TodoItem inline edit
// ============================================================

const mockTodo: Todo = {
  id: '1',
  userId: 'user-1',
  content: 'Buy groceries',
  completed: false,
  createdAt: '2026-03-13T00:00:00.000Z',
  updatedAt: '2026-03-13T00:00:00.000Z',
};

const completedTodo: Todo = {
  id: '2',
  userId: 'user-1',
  content: 'Done task',
  completed: true,
  createdAt: '2026-03-13T00:00:00.000Z',
  updatedAt: '2026-03-13T00:00:00.000Z',
};

describe('TodoItem — edit UX', () => {
  it('renders checkbox in default state', () => {
    render(
      <MemoryRouter>
        <TodoItem todo={mockTodo} onToggle={() => {}} onEdit={() => {}} onDelete={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders completed todo with checked checkbox', () => {
    render(
      <MemoryRouter>
        <TodoItem todo={completedTodo} onToggle={() => {}} onEdit={() => {}} onDelete={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders uncompleted todo with unchecked checkbox', () => {
    render(
      <MemoryRouter>
        <TodoItem todo={mockTodo} onToggle={() => {}} onEdit={() => {}} onDelete={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
