import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TodosPage } from '../pages/TodosPage';

describe('TodosPage', () => {
  it('renders a list of todos', () => {
    render(
      <MemoryRouter>
        <TodosPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders create todo form', () => {
    render(
      <MemoryRouter>
        <TodosPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('textbox', { name: /todo|content|new/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add|create/i })).toBeInTheDocument();
  });
});
