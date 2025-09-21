import { yoga } from '@elysiajs/graphql-yoga'
import { env } from '@prosspecta/env'
import { Elysia } from 'elysia'
import { createContext } from './common/context'
import { schema } from './schema'

const app = new Elysia()
  .use(
    yoga({
      schema,
      context: createContext,
      graphiql: true,
    })
  )
  .listen(env.API_PORT || 3333)

console.log(
  `🚀 Prosspecta API is running at ${app.server?.hostname}:${app.server?.port}`
)
