import { Status } from '@prisma/client'
import { builder } from '../../shared/builder'

export const ContactStatus = builder.enumType(Status, {
  name: 'ContactStatus',
})

export const Contact = builder.prismaObject('Contact', {
  fields: t => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    email: t.exposeString('email'),
    phone: t.exposeString('phone', { nullable: true }),
    company: t.exposeString('company', { nullable: true }),
    status: t.expose('status', { type: ContactStatus }),
    isActive: t.exposeBoolean('isActive'),
    createdAt: t.field({
      type: 'String',
      resolve: contact => contact.createdAt.toISOString(),
    }),
    updatedAt: t.field({
      type: 'String',
      resolve: contact => contact.updatedAt.toISOString(),
    }),
    organization: t.relation('organization'),
    pipelines: t.relation('pipelines'),
  }),
})

export const CreateContactInput = builder.inputType('CreateContactInput', {
  fields: t => ({
    name: t.string({ required: true }),
    email: t.string({ required: true }),
    phone: t.string({ required: false }),
    company: t.string({ required: false }),
    status: t.field({ type: ContactStatus, required: false }),
    isActive: t.boolean({ required: false }),
  }),
})

export const UpdateContactInput = builder.inputType('UpdateContactInput', {
  fields: t => ({
    name: t.string({ required: false }),
    email: t.string({ required: false }),
    phone: t.string({ required: false }),
    company: t.string({ required: false }),
    status: t.field({ type: ContactStatus, required: false }),
    isActive: t.boolean({ required: false }),
  }),
})

export const ContactWhereInput = builder.inputType('ContactWhereInput', {
  fields: t => ({
    id: t.string({ required: false }),
    name: t.string({ required: false }),
    email: t.string({ required: false }),
    company: t.string({ required: false }),
    status: t.field({ type: ContactStatus, required: false }),
    isActive: t.boolean({ required: false }),
  }),
})
