import { Plus } from 'lucide-react';
import { useState, type FormEvent } from 'react';

import { useCreateTodo } from '../hooks/use-todos';
import { TODO_TITLE_MAX_LENGTH } from '../types';

export const AddTodoForm = () => {
  const [title, setTitle] = useState('');
  const createTodo = useCreateTodo();
  const trimmedTitle = title.trim();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!trimmedTitle || createTodo.isPending) return;

    createTodo.mutate(trimmedTitle, {
      onSuccess: () => setTitle(''),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What needs to be done?"
          maxLength={TODO_TITLE_MAX_LENGTH}
          aria-label="New todo"
          className="h-11 flex-1 rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
        />
        <button
          type="submit"
          disabled={!trimmedTitle || createTodo.isPending}
          className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-sky-600 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {createTodo.isPending ? 'Adding...' : 'Add'}
        </button>
      </div>
      {createTodo.isError && (
        <p role="alert" className="text-sm text-red-700">
          Could not add your todo. Please try again.
        </p>
      )}
    </form>
  );
};
