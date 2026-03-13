import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Todo, TodoFilter } from '@todo-app/shared';
import { TodoItem } from '../components/TodoItem';

function getToken() {
  return localStorage.getItem('token') || '';
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

export function TodosPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newContent, setNewContent] = useState('');
  const [filter, setFilter] = useState<TodoFilter>('all');

  useEffect(() => {
    fetchTodos();
  }, [filter]);

  async function fetchTodos() {
    try {
      const query = filter !== 'all' ? `?filter=${filter}` : '';
      const res = await fetch(`/api/todos${query}`, { headers: authHeaders() });
      if (res.status === 401) { localStorage.removeItem('token'); navigate('/login'); return; }
      const data = await res.json();
      setTodos(data.todos || []);
    } catch {
      // network error — ignore in tests / offline
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newContent.trim()) return;
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ content: newContent }),
    });
    if (res.ok) {
      const data = await res.json();
      setTodos(prev => [...prev, data.todo]);
      setNewContent('');
    }
  }

  async function handleToggle(id: string, completed: boolean) {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ completed: !completed }),
    });
    if (res.ok) {
      const data = await res.json();
      setTodos(prev => prev.map(t => (t.id === id ? data.todo : t)));
    }
  }

  async function handleEdit(id: string, content: string) {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ content }),
    });
    if (res.ok) {
      const data = await res.json();
      setTodos(prev => prev.map(t => (t.id === id ? data.todo : t)));
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (res.ok) {
      setTodos(prev => prev.filter(t => t.id !== id));
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>My Todos</h1>
        <button onClick={handleLogout} style={{ padding: '6px 16px' }}>Logout</button>
      </div>

      <form onSubmit={handleAdd} style={{ marginBottom: 24, display: 'flex', gap: 8 }}>
        <input
          id="new-todo"
          type="text"
          name="content"
          aria-label="New todo"
          placeholder="What needs to be done?"
          value={newContent}
          onChange={e => setNewContent(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Add</button>
      </form>

      <nav aria-label="Filter" style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['all', 'active', 'completed'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 14px',
              fontWeight: filter === f ? 'bold' : 'normal',
              background: filter === f ? '#007bff' : '#eee',
              color: filter === f ? '#fff' : '#333',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </nav>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => handleToggle(todo.id, todo.completed)}
            onEdit={content => handleEdit(todo.id, content)}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </ul>

      {todos.length === 0 && <p style={{ color: '#888' }}>No todos yet. Add one above!</p>}
    </div>
  );
}
