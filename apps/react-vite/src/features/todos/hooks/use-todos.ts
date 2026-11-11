import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createTodo,
  deleteTodo,
  getTodos,
  setTodoCompleted,
} from '../api/todos-api';
import type { Todo } from '../types';

export const todosQueryKey = ['todos'] as const;

export const useTodos = () =>
  useQuery({
    queryKey: todosQueryKey,
    queryFn: getTodos,
  });

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: todosQueryKey }),
  });
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, completed }: Pick<Todo, 'id' | 'completed'>) =>
      setTodoCompleted(id, completed),
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: todosQueryKey });
      const previous = queryClient.getQueryData<Todo[]>(todosQueryKey);
      queryClient.setQueryData<Todo[]>(todosQueryKey, (current) =>
        current?.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo,
        ),
      );
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(todosQueryKey, context.previous);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: todosQueryKey }),
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: todosQueryKey }),
  });
};
