import type { Todo } from '@todo-app/shared';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  return <div>TODO: implement TodoItem</div>;
}
