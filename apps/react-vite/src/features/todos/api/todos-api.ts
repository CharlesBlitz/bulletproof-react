import * as z from 'zod';

import { supabase } from '@/lib/supabase';

import { todoSchema, type Todo } from '../types';

const todosSchema = z.array(todoSchema);

export const getTodos = async (): Promise<Todo[]> => {
  const { data, error } = await supabase
    .from('todos')
    .select('id, title, completed, created_at')
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);

  return todosSchema.parse(data);
};

export const createTodo = async (title: string): Promise<Todo> => {
  const { data, error } = await supabase
    .from('todos')
    .insert({ title })
    .select('id, title, completed, created_at')
    .single();

  if (error) throw new Error(error.message);

  return todoSchema.parse(data);
};

export const setTodoCompleted = async (
  id: string,
  completed: boolean,
): Promise<void> => {
  const { error } = await supabase
    .from('todos')
    .update({ completed })
    .eq('id', id);

  if (error) throw new Error(error.message);
};

export const deleteTodo = async (id: string): Promise<void> => {
  const { error } = await supabase.from('todos').delete().eq('id', id);

  if (error) throw new Error(error.message);
};
