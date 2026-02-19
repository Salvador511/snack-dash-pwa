import { NextResponse } from 'next/server'
import { prisma } from '~/api/Libs/prisma'

export const PUT = async ({ params }: { params: { username: string } }) => {
  try {
    const findUser = await prisma.user.findUnique({
      where: { username: params.username, active: true }
    })
    if (!findUser) return NextResponse.json({ error: 'User not found or already inactive' }, { status: 404 })
    const user = await prisma.user.update({
      where: { username: params.username, active: true },
      data: { wins: { increment: 1 } },
    })
    return NextResponse.json({ user })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
}