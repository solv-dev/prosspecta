import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import type PrismaTypes from '../../prisma/pothos-types'
import type { GraphQLContext } from '../common/context'
import { prisma } from './prisma'

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Context: GraphQLContext
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
})

builder.queryType({})
builder.mutationType({})
