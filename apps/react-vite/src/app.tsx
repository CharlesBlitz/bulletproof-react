import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { AddTodoForm } from '@/features/todos/components/add-todo-form';
import { FilterTabs, type TodoFilter } from '@/features/todos/components/filter-tabs';
import { TodoList } from '@/features/todos/components/todo-list';
import {
  useDeleteTodo,
  useTodos,
  useToggleTodo,
} from '@/features/todos/hooks/use-todos';
import type { Todo } from '@/features/todos/types';

const filterTodos = (todos: Todo[], filter: TodoFilter) => {
  if (filter === 'active') return todos.filter((todo) => !todo.completed);
  if (filter === 'completed') return todos.filter((todo) => todo.completed);
  return todos;
};

const TodosPage = () => {
  const [filter, setFilter] = useState<TodoFilter>('all');
  const todosQuery = useTodos();
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();

  const todos = useMemo(() => todosQuery.data ?? [], [todosQuery.data]);
  const visibleTodos = useMemo(() => filterTodos(todos, filter), [todos, filter]);
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const hasMutationError = toggleTodo.isError || deleteTodo.isError;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col gap-6 px-4 py-12">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold tracking-tight">My todos</h1>
        <p className="text-sm text-slate-500">
          {activeCount} {activeCount === 1 ? 'item' : 'items'} left
        </p>
      </header>

      <AddTodoForm />

      <FilterTabs value={filter} onChange={setFilter} />

      {hasMutationError && (
        <p role="alert" className="text-sm text-red-700">
          Something went wrong while updating your todos. Please try again.
        </p>
      )}

      <TodoList
        todos={visibleTodos}
        filter={filter}
        isLoading={todosQuery.isPending}
        isError={todosQuery.isError}
        onRetry={() => todosQuery.refetch()}
        onToggle={(todo) =>
          toggleTodo.mutate({ id: todo.id, completed: !todo.completed })
        }
        onDelete={(id) => deleteTodo.mutate(id)}
      />
    </main>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TodosPage />
  </QueryClientProvider>
);
