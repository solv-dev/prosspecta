import type { GraphQLContext } from '../context'

export async function routeGuard(context: GraphQLContext) {
  if (!context.currentUser) {
    throw new Error('Unauthorized!')
  }

  return context.currentUser
}
