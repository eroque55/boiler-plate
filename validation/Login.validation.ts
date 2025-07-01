import { z } from './zod';

export type LoginForm = z.infer<typeof LoginSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
