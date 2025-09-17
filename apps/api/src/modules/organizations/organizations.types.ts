import { builder } from '../../shared/builder'

export const Organization = builder.prismaObject('Organization', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    slug: t.exposeString('slug'),
    isActive: t.exposeBoolean('isActive'),
    createdAt: t.field({
      type: 'String',
      resolve: (organization) => organization.createdAt.toISOString(),
    }),
    updatedAt: t.field({
      type: 'String',
      resolve: (organization) => organization.updatedAt.toISOString(),
    }),
    users: t.relation('users'),
    leads: t.relation('leads'),
    contacts: t.relation('contacts'),
    pipelines: t.relation('pipelines'),
  }),
})

export const CreateOrganizationInput = builder.inputType(
  'CreateOrganizationInput',
  {
    fields: (t) => ({
      name: t.string({ required: true }),
      slug: t.string({ required: true }),
      isActive: t.boolean({ required: false }),
    }),
  },
)

export const UpdateOrganizationInput = builder.inputType(
  'UpdateOrganizationInput',
  {
    fields: (t) => ({
      name: t.string({ required: false }),
      slug: t.string({ required: false }),
      isActive: t.boolean({ required: false }),
    }),
  },
)

export const OrganizationWhereInput = builder.inputType(
  'OrganizationWhereInput',
  {
    fields: (t) => ({
      id: t.string({ required: false }),
      name: t.string({ required: false }),
      slug: t.string({ required: false }),
      isActive: t.boolean({ required: false }),
    }),
  },
)
