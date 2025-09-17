import { builder } from '../../shared/builder'
import { prisma } from '../../shared/prisma'
import { CreateUserInput, UpdateUserInput, UserWhereInput } from './users.types'

builder.queryField('user', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      return prisma.user.findUniqueOrThrow({
        ...query,
        where: { id: args.id },
      })
    },
  }),
)

builder.queryField('users', (t) =>
  t.prismaField({
    type: ['User'],
    args: {
      where: t.arg({ type: UserWhereInput, required: false }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      let where = {}

      if (args.where) {
        where = args.where
      }

      return prisma.user.findMany({
        ...query,
        where,
      })
    },
  }),
)

builder.mutationField('userCreate', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      data: t.arg({ type: CreateUserInput, required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      let organization = {}

      if (args.data.organizationId) {
        organization = {
          connect: {
            id: args.data.organizationId,
          },
        }
      } else {
        const userName = args.data.name.split(' ')[0]
        organization = {
          create: {
            name: `${userName} Organization`,
            slug: `${userName.toLocaleLowerCase().trim()}-organization`,
            isActive: true,
          },
        }
      }

      return prisma.user.create({
        ...query,
        data: {
          name: args.data.name,
          email: args.data.email,
          role: args.data.role ?? 'USER',
          isActive: args.data.isActive ?? true,
          organization,
        },
      })
    },
  }),
)

builder.mutationField('userUpdate', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      id: t.arg.id({ required: true }),
      data: t.arg({ type: UpdateUserInput, required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const { name, email, role, isActive } = args.data

      const user = await prisma.user.findUnique({
        where: { id: args.id },
      })

      if (!user) {
        throw new Error('User not found!')
      }

      const updatedUser = {
        name: name ?? user.name,
        email: email ?? user.email,
        role: role ?? user.role,
        isActive: isActive ?? user.isActive,
      }

      return prisma.user.update({
        ...query,
        where: { id: user.id },
        data: updatedUser,
      })
    },
  }),
)

builder.mutationField('userDelete', (t) =>
  t.prismaField({
    type: 'User',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      return prisma.user.delete({
        ...query,
        where: { id: args.id },
      })
    },
  }),
)
