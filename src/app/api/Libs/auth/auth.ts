import jwt from 'jsonwebtoken'
import { TokenPayload } from '~/app/api/Libs/auth/types'

export const authenticateToken = ({ headers }:{ headers: Headers }) => {
  const authHeader = headers.get('authorization')
  const token = authHeader && authHeader.replace(/Bearer /,'')
  if (token) {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables')
    }
    const { userId, username }: TokenPayload = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload
    return { userId, username }
  }
  return null
}
