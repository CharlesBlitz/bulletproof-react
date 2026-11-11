import type { Todo } from '../types';
import { TodoItem } from './todo-item';
import type { TodoFilter } from './filter-tabs';

const EMPTY_MESSAGES: Record<TodoFilter, string> = {
  all: 'No todos yet. Add one above to get started.',
  active: 'Nothing left to do. Nice work!',
  completed: 'No completed todos yet.',
};

type TodoListProps = {
  todos: Todo[];
  filter: TodoFilter;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

export const TodoList = ({
  todos,
  filter,
  isLoading,
  isError,
  onRetry,
  onToggle,
  onDelete,
}: TodoListProps) => {
  if (isLoading) {
    return <p className="py-8 text-center text-sm text-slate-500">Loading todos...</p>;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <p role="alert" className="text-sm text-red-700">
          We couldn't load your todos.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Try again
        </button>
      </div>
    );
  }

  if (todos.length === 0) {
    return <p className="py-8 text-center text-sm text-slate-500">{EMPTY_MESSAGES[filter]}</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
};
