import type { User } from '@prisma/client'
import jwt, { type JwtPayload, verify } from 'jsonwebtoken'
import { env } from '../../lib/env'
import { prisma } from '../../shared/prisma'

const TOKEN_EXPIRATION = '7d'

export async function authGuard(request: Request): Promise<User | null> {
  const header = request.headers.get('authorization')

  if (!header) {
    return null
  }

  const token = header.split(' ')[1]

  if (!token) {
    return null
  }

  try {
    const tokenPayload = verify(token, env.JWT_SECRET) as JwtPayload

    const userId = tokenPayload.userId
    const organizationId = tokenPayload.organizationId
    const expirationDate = tokenPayload.exp

    const currentTimestamp = Math.floor(Date.now() / 1000)

    if (expirationDate && expirationDate <= currentTimestamp) {
      const authToken = await prisma.authToken.findUnique({
        where: { token },
        include: {
          user: true,
        },
      })

      if (!authToken || authToken?.isRevoked) {
        return null
      }

      const newToken = jwt.sign(
        {
          userId: authToken.user.id,
          organizationId: authToken.user.organizationId,
        },
        'your-secret-key',
        { expiresIn: TOKEN_EXPIRATION }
      )

      await prisma.authToken.update({
        where: { id: authToken.id },
        data: { token: newToken },
      })
    }

    return await prisma.user.findUnique({
      where: { id: userId, organizationId },
    })
  } catch (_error) {
    return null
  }
}
