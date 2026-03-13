import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TodoItem } from '../components/TodoItem';
import type { Todo } from '@todo-app/shared';

const mockTodo: Todo = {
  id: '1',
  userId: 'user-1',
  content: 'Buy groceries',
  completed: false,
  createdAt: '2026-03-13T00:00:00.000Z',
  updatedAt: '2026-03-13T00:00:00.000Z',
};

describe('TodoItem', () => {
  it('renders todo content', () => {
    render(
      <MemoryRouter>
        <TodoItem todo={mockTodo} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  });

  it('renders edit button', () => {
    render(
      <MemoryRouter>
        <TodoItem todo={mockTodo} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
  });

  it('renders delete button', () => {
    render(
      <MemoryRouter>
        <TodoItem todo={mockTodo} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('shows input field + save/cancel buttons in edit mode', () => {
    render(
      <MemoryRouter>
        <TodoItem todo={mockTodo} />
      </MemoryRouter>,
    );

    // Click edit to enter edit mode
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });
});
