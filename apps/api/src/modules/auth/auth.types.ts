import type { User } from '@prisma/client'
import { builder } from '../../shared/builder'
import { User as UserType } from '../users/users.types'

export const AuthToken = builder.prismaObject('AuthToken', {
  fields: t => ({
    id: t.exposeID('id'),
    token: t.exposeString('token'),
    expirationDate: t.field({
      type: 'String',
      resolve: user => user.expirationDate.toISOString(),
    }),
    isRevoked: t.exposeBoolean('isRevoked'),
    createdAt: t.field({
      type: 'String',
      resolve: user => user.createdAt.toISOString(),
    }),
    updatedAt: t.field({
      type: 'String',
      resolve: user => user.updatedAt.toISOString(),
    }),
    user: t.relation('user'),
  }),
})

export const LoginInput = builder.inputType('LoginInput', {
  fields: t => ({
    email: t.string({ required: true }),
  }),
})

export const RegisterInput = builder.inputType('RegisterInput', {
  fields: t => ({
    name: t.string({ required: true }),
    email: t.string({ required: true }),
    password: t.string({ required: true }),
    organizationId: t.string({ required: true }),
  }),
})

export interface AuthResponseType {
  token: string
  user: User
}

export const AuthResponse = builder
  .objectRef<AuthResponseType>('AuthResponse')
  .implement({
    fields: t => ({
      token: t.exposeString('token'),
      user: t.field({
        type: UserType,
        resolve: parent => parent.user,
      }),
    }),
  })

export const RefreshTokenInput = builder.inputType('RefreshTokenInput', {
  fields: t => ({
    token: t.string({ required: true }),
  }),
})

export const AuthenticateInput = builder.inputType('AuthenticateInput', {
  fields: t => ({
    secret: t.string({ required: true }),
  }),
})
