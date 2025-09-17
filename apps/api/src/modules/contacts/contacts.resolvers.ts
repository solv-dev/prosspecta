import { routeGuard } from '../../common/guards/route-guard'
import { builder } from '../../shared/builder'
import { prisma } from '../../shared/prisma'
import {
  ContactWhereInput,
  CreateContactInput,
  UpdateContactInput,
} from './contacts.types'

builder.queryField('contact', (t) =>
  t.prismaField({
    type: 'Contact',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      await routeGuard(_ctx)

      return prisma.contact.findUniqueOrThrow({
        ...query,
        where: { id: args.id },
      })
    },
  }),
)

builder.queryField('contacts', (t) =>
  t.prismaField({
    type: ['Contact'],
    args: {
      where: t.arg({ type: ContactWhereInput, required: false }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const currentUser = await routeGuard(_ctx)

      let whereInput = {}

      if (args.where) {
        whereInput = args.where
      }

      return prisma.contact.findMany({
        ...query,
        where: {
          organizationId: currentUser?.organizationId,
          ...whereInput,
        },
      })
    },
  }),
)

builder.mutationField('contactCreate', (t) =>
  t.prismaField({
    type: 'Contact',
    args: {
      data: t.arg({ type: CreateContactInput, required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const currentUser = await routeGuard(_ctx)

      return prisma.contact.create({
        ...query,
        data: {
          ...args.data,
          status: args.data.status ?? 'NEW',
          isActive: args.data.isActive ?? true,
          organization: {
            connect: {
              id: currentUser?.organizationId,
            },
          },
        },
      })
    },
  }),
)

builder.mutationField('contactUpdate', (t) =>
  t.prismaField({
    type: 'Contact',
    args: {
      id: t.arg.id({ required: true }),
      data: t.arg({ type: UpdateContactInput, required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      await routeGuard(_ctx)

      const { name, email, phone, company, status, isActive } = args.data

      const contact = await prisma.contact.findUnique({
        where: { id: args.id },
      })

      if (!contact) {
        throw new Error('Contact not found!')
      }

      const updatedContact = {
        name: name ?? contact.name,
        email: email ?? contact.email,
        phone: phone ?? contact.phone,
        company: company ?? contact.company,
        status: status ?? contact.status,
        isActive: isActive ?? contact.isActive,
      }

      return prisma.contact.update({
        ...query,
        where: { id: contact.id },
        data: updatedContact,
      })
    },
  }),
)

builder.mutationField('contactDelete', (t) =>
  t.prismaField({
    type: 'Contact',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      await routeGuard(_ctx)

      return prisma.contact.delete({
        ...query,
        where: { id: args.id },
      })
    },
  }),
)
