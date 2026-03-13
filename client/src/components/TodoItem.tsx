import { useState } from 'react';
import type { Todo } from '@todo-app/shared';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div>
        <input type="text" defaultValue={todo.content} />
        <button onClick={() => setEditing(false)}>Save</button>
        <button onClick={() => setEditing(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div>
      <span>{todo.content}</span>
      <button onClick={() => setEditing(true)}>Edit</button>
      <button>Delete</button>
    </div>
  );
}
