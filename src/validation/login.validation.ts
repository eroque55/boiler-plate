import z from './zod';

export const LoginSchema = z.object({
  identifier: z.email(),
  password: z.string().min(1),
  requestRefresh: z.boolean(),
});

export type LoginForm = z.infer<typeof LoginSchema>;
