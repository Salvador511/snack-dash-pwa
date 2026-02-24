import { NextResponse } from 'next/server'
import { prisma } from '~/api/Libs/prisma'
import { LoginSchema } from '~/app/api/schemas'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const POST = async (request: Request) => {
  try {
    const data = await request.json()
    const validatedData = LoginSchema.safeParse(data)
    if (!validatedData.success) return NextResponse.json({ error: 'Invalid input data' }, { status: 400 })

    const { identifier, password } = validatedData.data
    const user = await prisma.user.findFirst({
      where: {
        active: true,
        OR: [{ email: identifier }, { username: identifier }],
      },
    })
    if (!user) return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 })

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 })

    if (!process.env.JWT_SECRET) return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 })
    const token = jwt.sign({ userId: user.id, email: user.email, username: user.username }, process.env.JWT_SECRET)
    return NextResponse.json(token, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: error.status || 500 })
  }
}