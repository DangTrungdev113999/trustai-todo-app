import { useState } from 'react';
import type { Todo } from '@todo-app/shared';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onEdit: (content: string) => void;
  onDelete: () => void;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(todo.content);

  function handleSave() {
    if (editContent.trim()) {
      onEdit(editContent);
      setEditing(false);
    }
  }

  if (editing) {
    return (
      <li style={{ padding: '8px 0', borderBottom: '1px solid #eee', display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={editContent}
          onChange={e => setEditContent(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSave()}
          style={{ flex: 1, padding: 4 }}
          autoFocus
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={() => { setEditing(false); setEditContent(todo.content); }}>Cancel</button>
      </li>
    );
  }

  return (
    <li style={{ padding: '8px 0', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 8 }}>
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      <span
        style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#999' : '#000', cursor: 'pointer' }}
        onClick={() => setEditing(true)}
      >
        {todo.content}
      </span>
      <button onClick={() => setEditing(true)}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}
