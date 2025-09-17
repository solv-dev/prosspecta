import { Priority, Status } from '@prisma/client'
import { builder } from '../../shared/builder'

export const PipelineStatus = builder.enumType(Status, {
  name: 'PipelineStatus',
})

export const PipelinePriority = builder.enumType(Priority, {
  name: 'PipelinePriority',
})

export const Pipeline = builder.prismaObject('Pipeline', {
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    description: t.exposeString('description', { nullable: true }),
    status: t.expose('status', { type: PipelineStatus }),
    priority: t.expose('priority', { type: PipelinePriority }),
    isActive: t.exposeBoolean('isActive'),
    createdAt: t.field({
      type: 'String',
      resolve: (pipeline) => pipeline.createdAt.toISOString(),
    }),
    updatedAt: t.field({
      type: 'String',
      resolve: (pipeline) => pipeline.updatedAt.toISOString(),
    }),
    organization: t.relation('organization'),
    assignedUser: t.relation('assignedUser', { nullable: true }),
    lead: t.relation('lead', { nullable: true }),
    contact: t.relation('contact', { nullable: true }),
  }),
})

export const CreatePipelineInput = builder.inputType('CreatePipelineInput', {
  fields: (t) => ({
    title: t.string({ required: true }),
    description: t.string({ required: false }),
    status: t.field({ type: PipelineStatus, required: false }),
    priority: t.field({ type: PipelinePriority, required: false }),
    isActive: t.boolean({ required: false }),
    assignedUserId: t.string({ required: true }),
    leadId: t.string({ required: true }),
    contactId: t.string({ required: true }),
  }),
})

export const UpdatePipelineInput = builder.inputType('UpdatePipelineInput', {
  fields: (t) => ({
    title: t.string({ required: false }),
    description: t.string({ required: false }),
    status: t.field({ type: PipelineStatus, required: false }),
    priority: t.field({ type: PipelinePriority, required: false }),
    isActive: t.boolean({ required: false }),
    assignedUserId: t.string({ required: false }),
    leadId: t.string({ required: false }),
    contactId: t.string({ required: false }),
  }),
})

export const PipelineWhereInput = builder.inputType('PipelineWhereInput', {
  fields: (t) => ({
    id: t.string({ required: false }),
    title: t.string({ required: false }),
    status: t.field({ type: PipelineStatus, required: false }),
    priority: t.field({ type: PipelinePriority, required: false }),
    isActive: t.boolean({ required: false }),
    assignedUserId: t.string({ required: false }),
    leadId: t.string({ required: false }),
    contactId: t.string({ required: false }),
  }),
})
