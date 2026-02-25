import { NextResponse } from 'next/server'
import { prisma } from '~/api/Libs/prisma'
import { authenticateToken } from '~/app/api/Libs/auth/auth'
import { UserUpdateSchema } from '~/app/api/schemas'
import bcrypt from 'bcryptjs'

export const GET = async (request: Request) => {
  try {
    const auth = authenticateToken({ headers: request.headers })
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      omit: { password: true },
    })

    if (!user || !user.active) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: error.status || 500 })
  }
}

export const PATCH = async (request: Request) => {
  try {
    const auth = authenticateToken({ headers: request.headers })
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const parsed = UserUpdateSchema.safeParse(await request.json())
    if (!parsed.success) return NextResponse.json({ error: 'Invalid input data' }, { status: 400 })

    const updateData = { ...parsed.data }
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No data to update' }, { status: 400 })
    }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 12)
    }

    const existingUser = await prisma.user.findUnique({ where: { id: auth.userId } })
    if (!existingUser || !existingUser.active) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const user = await prisma.user.update({
      where: { id: auth.userId },
      data: updateData,
      omit: { password: true },
    })

    return NextResponse.json({ user }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: error.status || 500 })
  }
}
