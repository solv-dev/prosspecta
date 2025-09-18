
import { generate } from 'generate-password'
import jwt from 'jsonwebtoken'
import { authenticateEmail } from '../../common/emails/authenticate-email'
import { env } from '../../lib/env'
import { resend } from '../../lib/resend'
import { builder } from '../../shared/builder'
import { prisma } from '../../shared/prisma'
import {
  AuthenticateInput,
  AuthResponse,
  LoginInput,
  RefreshTokenInput,
  RegisterInput,
} from './auth.types'

builder.mutationField('authenticate', (t) =>
  t.field({
    type: AuthResponse,
    args: {
      data: t.arg({ type: AuthenticateInput, required: true }),
    },
    resolve: async (_parent, args, _info) => {
      const { secret } = args.data

      const authToken = await prisma.authToken.findUnique({
        where: {
          secret,
        },
        include: {
          user: true,
        },
      })

      if (!authToken || authToken.isUsed || authToken.isRevoked) {
        throw new Error('User auth token expired or not valid.')
      }

      await prisma.authToken.update({
        where: {
          secret,
        },
        data: {
          isUsed: true,
        },
      })

      return {
        token: authToken.token,
        user: authToken.user,
      }
    },
  }),
)

builder.mutationField('login', (t) =>
  t.field({
    type: 'Boolean',
    args: {
      data: t.arg({ type: LoginInput, required: true }),
    },
    resolve: async (_parent, args, _ctx, _info) => {
      const { email } = args.data

      const user = await prisma.user.findFirst({
        where: {
          email,
          isActive: true,
        },
        include: {
          organization: true,
        },
      })

      if (!user) {
        throw new Error('Invalid credentials')
      }

      const token = jwt.sign(
        { userId: user.id, organizationId: user.organizationId },
        env.JWT_SECRET,
        { expiresIn: '7d' },
      )

      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 7)

      const gerenatedSecret = generate()

      await prisma.authToken.create({
        data: {
          token,
          secret: gerenatedSecret,
          expirationDate,
          userId: user.id,
        },
      })

      const authLink = `${env.WEB_URL}/login/${gerenatedSecret}`
      const emailHtml = authenticateEmail(authLink)

      await resend.emails.send({
        from: 'Prosspecta <no-reply@solvs.dev>',
        to: user.email,
        subject: 'Seu link de autenticação - Prosspecta',
        html: emailHtml,
      })

      return true
    },
  }),
)

builder.mutationField('register', (t) =>
  t.field({
    type: AuthResponse,
    args: {
      data: t.arg({ type: RegisterInput, required: true }),
    },
    resolve: async (_parent, args, _ctx, _info) => {
      const { name, email, organizationId } = args.data

      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          organizationId,
        },
      })

      if (existingUser) {
        throw new Error('User already exists')
      }

      const user = await prisma.user.create({
        data: {
          name,
          email,
          organizationId,
          role: 'USER',
        },
        include: {
          organization: true,
        },
      })

      const token = jwt.sign(
        { userId: user.id, organizationId: user.organizationId },
        env.JWT_SECRET,
        { expiresIn: '7d' },
      )

      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 7)

      await prisma.authToken.create({
        data: {
          token,
          expirationDate,
          userId: user.id,
        },
      })

      return {
        token,
        user,
      }
    },
  }),
)

builder.mutationField('refreshToken', (t) =>
  t.field({
    type: AuthResponse,
    args: {
      data: t.arg({ type: RefreshTokenInput, required: true }),
    },
    resolve: async (_parent, args, _ctx, _info) => {
      const { token } = args.data

      const authToken = await prisma.authToken.findUnique({
        where: { token },
        include: {
          user: {
            include: {
              organization: true,
            },
          },
        },
      })

      if (
        !authToken ||
        authToken.isRevoked ||
        authToken.expirationDate < new Date()
      ) {
        throw new Error('Invalid or expired token')
      }

      const newToken = jwt.sign(
        {
          userId: authToken.user.id,
          organizationId: authToken.user.organizationId,
        },
        env.JWT_SECRET,
        { expiresIn: '7d' },
      )

      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 7)

      await prisma.authToken.update({
        where: { id: authToken.id },
        data: { isRevoked: true },
      })

      await prisma.authToken.create({
        data: {
          token: newToken,
          expirationDate,
          userId: authToken.user.id,
        },
      })

      return {
        token: newToken,
        user: authToken.user,
      }
    },
  }),
)

builder.mutationField('logout', (t) =>
  t.field({
    type: 'Boolean',
    args: {
      data: t.arg({ type: RefreshTokenInput, required: true }),
    },
    resolve: async (_parent, args, _ctx, _info) => {
      const { token } = args.data

      const result = await prisma.authToken.updateMany({
        where: {
          token,
          isRevoked: false,
        },
        data: { isRevoked: true },
      })

      if (result.count === 0) {
        throw new Error('Token not found or already revoked')
      }

      return true
    },
  }),
)
