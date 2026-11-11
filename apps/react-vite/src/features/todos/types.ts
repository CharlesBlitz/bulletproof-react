import * as z from 'zod';

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  created_at: z.string(),
});

export type Todo = z.infer<typeof todoSchema>;

export const TODO_TITLE_MAX_LENGTH = 500;
