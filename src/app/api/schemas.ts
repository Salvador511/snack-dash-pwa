import { z } from 'zod'

export const UserBaseSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string().optional(),
  username: z.string().min(3).max(100),
  password: z.string().min(6).max(100),
})

export const LoginSchema = z.object({
  username: z.string().min(3).max(100),
  password: z.string().min(6).max(100),
})