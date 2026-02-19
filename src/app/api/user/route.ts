import { NextResponse } from 'next/server'
import { prisma } from '~/api/Libs/prisma'
import { UserBaseSchema } from '~/app/api/schemas'
import bcrypt from 'bcryptjs'
import type { CreateUserPayload } from '~/app/api/user/types'

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      where: { active: true },
      omit: { password: true },
    })
    return NextResponse.json({ users })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: error.status || 500 })
  }
}

export const POST = async (request: Request) => {
  try {
    const userCreateSchema = UserBaseSchema.omit({ id: true })
    const data: CreateUserPayload = userCreateSchema.parse(await request.json())
    const hashedPassword = await bcrypt.hash(data.password, 12)
    const newUser = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      omit: { password: true },
    })
    return NextResponse.json({ user: newUser }, { status: 201 })


  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: error.status || 500 })
  }
}