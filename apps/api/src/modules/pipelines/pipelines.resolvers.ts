import { routeGuard } from '../../common/guards/route-guard'
import { builder } from '../../shared/builder'
import { prisma } from '../../shared/prisma'
import {
  CreatePipelineInput,
  PipelineWhereInput,
  UpdatePipelineInput,
} from './pipelines.types'

builder.queryField('pipeline', t =>
  t.prismaField({
    type: 'Pipeline',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      await routeGuard(_ctx)

      return prisma.pipeline.findUniqueOrThrow({
        ...query,
        where: { id: args.id },
      })
    },
  })
)

builder.queryField('pipelines', t =>
  t.prismaField({
    type: ['Pipeline'],
    args: {
      where: t.arg({ type: PipelineWhereInput, required: false }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const currentUser = await routeGuard(_ctx)

      let whereInput = {}

      if (args.where) {
        whereInput = args.where
      }

      return prisma.pipeline.findMany({
        ...query,
        where: {
          organizationId: currentUser?.organizationId,
          ...whereInput,
        },
      })
    },
  })
)

builder.mutationField('pipelineCreate', t =>
  t.prismaField({
    type: 'Pipeline',
    args: {
      data: t.arg({ type: CreatePipelineInput, required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      const currentUser = await routeGuard(_ctx)

      const { assignedUserId, contactId, leadId, ...rest } = args.data

      return prisma.pipeline.create({
        ...query,
        data: {
          ...rest,
          status: args.data.status ?? 'NEW',
          priority: args.data.priority ?? 'LOW',
          isActive: args.data.isActive ?? true,
          assignedUser: {
            connect: {
              id: assignedUserId,
            },
          },
          contact: {
            connect: {
              id: contactId,
            },
          },
          lead: {
            connect: {
              id: leadId,
            },
          },
          organization: {
            connect: {
              id: currentUser?.organizationId,
            },
          },
        },
      })
    },
  })
)

builder.mutationField('pipelineUpdate', t =>
  t.prismaField({
    type: 'Pipeline',
    args: {
      id: t.arg.id({ required: true }),
      data: t.arg({ type: UpdatePipelineInput, required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      await routeGuard(_ctx)

      const {
        title,
        description,
        status,
        priority,
        isActive,
        assignedUserId,
        leadId,
        contactId,
      } = args.data

      const pipeline = await prisma.pipeline.findUnique({
        where: { id: args.id },
      })

      if (!pipeline) {
        throw new Error('Pipeline not found!')
      }

      const updatedPipeline = {
        title: title ?? pipeline.title,
        description: description ?? pipeline.description,
        status: status ?? pipeline.status,
        priority: priority ?? pipeline.priority,
        isActive: isActive ?? pipeline.isActive,
        assignedUserId: assignedUserId ?? pipeline.assignedUserId,
        leadId: leadId ?? pipeline.leadId,
        contactId: contactId ?? pipeline.contactId,
      }

      return prisma.pipeline.update({
        ...query,
        where: { id: pipeline.id },
        data: updatedPipeline,
      })
    },
  })
)

builder.mutationField('pipelineDelete', t =>
  t.prismaField({
    type: 'Pipeline',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx, _info) => {
      await routeGuard(_ctx)

      return prisma.pipeline.delete({
        ...query,
        where: { id: args.id },
      })
    },
  })
)
