import { PrismaClient } from '../../../../generated/prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
  omit: {
    user: {
      createdAt: true,
      updatedAt: true,
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma