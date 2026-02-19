import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '~/api/Libs/prisma'

export const PUT = async (
  _request: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) => {
  try {
    const { username } = await params
    const findUser = await prisma.user.findUnique({
      where: { username },
    })
    if (!findUser || !findUser.active) {
      return NextResponse.json({ error: 'User not found or already inactive' }, { status: 404 })
    }
    const user = await prisma.user.update({
      where: { id: findUser.id },
      data: { wins: { increment: 1 } },
      omit: { password: true },
    })
    return NextResponse.json({ user })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
}