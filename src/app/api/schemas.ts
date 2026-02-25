import { z } from 'zod'

export const UserBaseSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string().optional(),
  username: z.string().min(3).max(100),
  password: z.string().min(6).max(100),
  image: z.string().url().nullable().optional(),
})

export const UserUpdateSchema = UserBaseSchema.omit({ id: true }).partial()

export const LoginSchema = z.object({
  identifier: z.string().min(3).max(100),
  password: z.string().min(6).max(100),
})