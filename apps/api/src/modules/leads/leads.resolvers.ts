import { routeGuard } from '../../common/guards/route-guard'
import { builder } from '../../shared/builder'
import { prisma } from '../../shared/prisma'
import { CreateLeadInput, LeadWhereInput, UpdateLeadInput } from './leads.types'

builder.queryField('lead', (t) =>
  t.prismaField({
    type: 'Lead',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      await routeGuard(_ctx)

      return prisma.lead.findUniqueOrThrow({
        ...query,
        where: { id: args.id },
      })
    },
  }),
)

builder.queryField('leads', (t) =>
  t.prismaField({
    type: ['Lead'],
    args: {
      where: t.arg({ type: LeadWhereInput, required: false }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const currentUser = await routeGuard(_ctx)

      let whereInput = {}

      if (args.where) {
        whereInput = args.where
      }

      return prisma.lead.findMany({
        ...query,
        where: {
          organizationId: currentUser?.organizationId,
          ...whereInput,
        },
      })
    },
  }),
)

builder.mutationField('leadCreate', (t) =>
  t.prismaField({
    type: 'Lead',
    args: {
      data: t.arg({ type: CreateLeadInput, required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const currentUser = await routeGuard(_ctx)

      return prisma.lead.create({
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

builder.mutationField('leadUpdate', (t) =>
  t.prismaField({
    type: 'Lead',
    args: {
      id: t.arg.id({ required: true }),
      data: t.arg({ type: UpdateLeadInput, required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      await routeGuard(_ctx)

      const { name, description, email, phone, company, status, isActive } =
        args.data

      const lead = await prisma.lead.findUnique({
        where: { id: args.id },
      })

      if (!lead) {
        throw new Error('Lead not found!')
      }

      const updatedLead = {
        name: name ?? lead.name,
        description: description ?? lead.description,
        email: email ?? lead.email,
        phone: phone ?? lead.phone,
        company: company ?? lead.company,
        status: status ?? lead.status,
        isActive: isActive ?? lead.isActive,
      }

      return prisma.lead.update({
        ...query,
        where: { id: lead.id },
        data: updatedLead,
      })
    },
  }),
)

builder.mutationField('leadDelete', (t) =>
  t.prismaField({
    type: 'Lead',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      await routeGuard(_ctx)

      return prisma.lead.delete({
        ...query,
        where: { id: args.id },
      })
    },
  }),
)
