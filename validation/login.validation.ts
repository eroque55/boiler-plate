import z from './zod';

export const LoginSchema = z.object({
  identifier: z.string().email(),
  password: z.string().min(1),
  requestRefresh: z.boolean().optional(),
});

export type LoginForm = z.infer<typeof LoginSchema>;
