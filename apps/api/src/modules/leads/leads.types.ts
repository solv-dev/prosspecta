import { Status } from '@prisma/client'
import { builder } from '../../shared/builder'

export const LeadStatus = builder.enumType(Status, {
  name: 'LeadStatus',
})

export const Lead = builder.prismaObject('Lead', {
  fields: t => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    description: t.exposeString('description', { nullable: true }),
    email: t.exposeString('email'),
    phone: t.exposeString('phone', { nullable: true }),
    company: t.exposeString('company', { nullable: true }),
    status: t.expose('status', { type: LeadStatus }),
    isActive: t.exposeBoolean('isActive'),
    createdAt: t.field({
      type: 'String',
      resolve: lead => lead.createdAt.toISOString(),
    }),
    updatedAt: t.field({
      type: 'String',
      resolve: lead => lead.updatedAt.toISOString(),
    }),
    organization: t.relation('organization'),
    pipelines: t.relation('pipelines'),
  }),
})

export const CreateLeadInput = builder.inputType('CreateLeadInput', {
  fields: t => ({
    name: t.string({ required: true }),
    description: t.string({ required: false }),
    email: t.string({ required: true }),
    phone: t.string({ required: false }),
    company: t.string({ required: false }),
    status: t.field({ type: LeadStatus, required: false }),
    isActive: t.boolean({ required: false }),
  }),
})

export const UpdateLeadInput = builder.inputType('UpdateLeadInput', {
  fields: t => ({
    name: t.string({ required: false }),
    description: t.string({ required: false }),
    email: t.string({ required: false }),
    phone: t.string({ required: false }),
    company: t.string({ required: false }),
    status: t.field({ type: LeadStatus, required: false }),
    isActive: t.boolean({ required: false }),
  }),
})

export const LeadWhereInput = builder.inputType('LeadWhereInput', {
  fields: t => ({
    id: t.string({ required: false }),
    name: t.string({ required: false }),
    email: t.string({ required: false }),
    company: t.string({ required: false }),
    status: t.field({ type: LeadStatus, required: false }),
    isActive: t.boolean({ required: false }),
  }),
})
