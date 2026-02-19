import { UserBaseSchema } from '~/app/api/schemas'
import { z } from 'zod'

export type CreateUserPayload = z.infer<ReturnType<typeof UserBaseSchema.omit<{ id: true }>>>
