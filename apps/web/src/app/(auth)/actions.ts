'use server'

import type { Mutation, MutationLoginArgs } from '@prosspecta/codegen'
import { cookies } from 'next/headers'
import { LoginMutation, LogOutMutation } from '@/graphql/mutations'
import { api } from '@/lib/api'

export async function login(args: MutationLoginArgs) {
  const result = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: LoginMutation,
        variables: {
          data: {
            email: args.data.email,
          },
        },
      }),
    })
    .json<{ data: { login: Mutation['login'] } }>()

  return result
}

export async function logout() {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')

  const result = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: LogOutMutation,
        variables: {
          token,
        },
      }),
    })
    .json<{ data: { logout: Mutation['logout'] } }>()

  // cookieStore.delete('token')

  return result.data.logout
}
