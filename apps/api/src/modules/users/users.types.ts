import { Role } from '@prisma/client'
import { builder } from '../../shared/builder'

export const UserRole = builder.enumType(Role, {
  name: 'UserRole',
})

export const User = builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    email: t.exposeString('email'),
    role: t.expose('role', { type: UserRole }),
    isActive: t.exposeBoolean('isActive'),
    createdAt: t.field({
      type: 'String',
      resolve: (user) => user.createdAt.toISOString(),
    }),
    updatedAt: t.field({
      type: 'String',
      resolve: (user) => user.updatedAt.toISOString(),
    }),

    organization: t.relation('organization'),
    authTokens: t.relation('authTokens'),
    assignedPipelines: t.relation('assignedPipelines'),
  }),
})

export const CreateUserInput = builder.inputType('CreateUserInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    email: t.string({ required: true }),
    role: t.field({ type: UserRole, required: false }),
    isActive: t.boolean({ required: false }),
    organizationId: t.string({ required: false }),
  }),
})

export const UpdateUserInput = builder.inputType('UpdateUserInput', {
  fields: (t) => ({
    name: t.string({ required: false }),
    email: t.string({ required: false }),
    role: t.field({ type: UserRole, required: false }),
    isActive: t.boolean({ required: false }),
  }),
})

export const UserWhereInput = builder.inputType('UserWhereInput', {
  fields: (t) => ({
    id: t.string({ required: false }),
    name: t.string({ required: false }),
    email: t.string({ required: false }),
    role: t.field({ type: UserRole, required: false }),
    isActive: t.boolean({ required: false }),
    organizationId: t.string({ required: false }),
  }),
})
