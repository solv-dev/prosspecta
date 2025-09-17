import { routeGuard } from '../../common/guards/route-guard'
import { builder } from '../../shared/builder'
import { prisma } from '../../shared/prisma'
import {
  CreateOrganizationInput,
  OrganizationWhereInput,
  UpdateOrganizationInput,
} from './organizations.types'

builder.queryField('organization', (t) =>
  t.prismaField({
    type: 'Organization',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      await routeGuard(_ctx)

      return prisma.organization.findUniqueOrThrow({
        ...query,
        where: { id: args.id },
      })
    },
  }),
)

builder.queryField('organizations', (t) =>
  t.prismaField({
    type: ['Organization'],
    args: {
      where: t.arg({ type: OrganizationWhereInput, required: false }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      await routeGuard(_ctx)

      let where = {}

      if (args.where) {
        where = args.where
      }

      return prisma.organization.findMany({
        ...query,
        where,
      })
    },
  }),
)

builder.mutationField('organizationCreate', (t) =>
  t.prismaField({
    type: 'Organization',
    args: {
      data: t.arg({ type: CreateOrganizationInput, required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      await routeGuard(_ctx)

      return prisma.organization.create({
        ...query,
        data: {
          ...args.data,
          isActive: args.data.isActive ?? true,
        },
      })
    },
  }),
)

builder.mutationField('organizationUpdate', (t) =>
  t.prismaField({
    type: 'Organization',
    args: {
      id: t.arg.id({ required: true }),
      data: t.arg({ type: UpdateOrganizationInput, required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      await routeGuard(_ctx)

      const { name, slug, isActive } = args.data

      const organization = await prisma.organization.findUnique({
        where: { id: args.id },
      })

      if (!organization) {
        throw new Error('Organization not found!')
      }

      const updatedOrganization = {
        name: name ?? organization.name,
        slug: slug ?? organization.slug,
        isActive: isActive ?? organization.isActive,
      }

      return prisma.organization.update({
        ...query,
        where: { id: organization.id },
        data: updatedOrganization,
      })
    },
  }),
)

builder.mutationField('organizationDelete', (t) =>
  t.prismaField({
    type: 'Organization',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      await routeGuard(_ctx)

      return prisma.organization.update({
        ...query,
        where: { id: args.id },
        data: {
          isActive: false,
        },
      })
    },
  }),
)
