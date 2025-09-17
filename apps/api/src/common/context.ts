import type { User } from '@prisma/client'
import { authGuard } from './guards/auth-guard'

export type GraphQLContext = {
  currentUser: null | User
}

export async function createContext(
  initialContext: any,
): Promise<GraphQLContext> {
  return {
    currentUser: await authGuard(initialContext.request),
  }
}
