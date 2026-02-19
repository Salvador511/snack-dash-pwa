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

    const { username, password } = validatedData.data
    const user = await prisma.user.findUnique({ where: { username, active: true } })
    if (!user) return NextResponse.json({ error: 'Invalid username or password' }, { status: 400 })

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return NextResponse.json({ error: 'Invalid username or password' }, { status: 400 })

    if (!process.env.JWT_SECRET) return NextResponse.json({ error: 'Invalid username or password' }, { status: 400 })
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET)
    return NextResponse.json(token, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: error.status || 500 })
  }
}