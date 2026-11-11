import { Check, Trash2 } from 'lucide-react';

import type { Todo } from '../types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <li className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-slate-300 hover:shadow">
      <button
        type="button"
        onClick={() => onToggle(todo)}
        aria-label={todo.completed ? 'Mark as not done' : 'Mark as done'}
        aria-pressed={todo.completed}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition active:scale-90 ${
          todo.completed
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-slate-300 text-transparent hover:border-sky-500'
        }`}
      >
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <span
        className={`flex-1 break-words text-base transition-colors ${
          todo.completed ? 'text-slate-400 line-through' : 'text-slate-900'
        }`}
      >
        {todo.title}
      </span>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.title}`}
        className="rounded-md p-1.5 text-slate-400 opacity-100 transition hover:bg-red-50 hover:text-red-600 focus:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </li>
  );
};
