'use server'

import type { Mutation } from '@prosspecta/codegen'
import { cookies } from 'next/headers'
import { LogOutMutation } from '@/graphql/mutations'
import { api } from '@/lib/api'

export async function logout() {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get('token')?.value

  const result = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: LogOutMutation,
        variables: {
          data: {
            token: accessToken,
          },
        },
      }),
    })
    .json<{ data: { logout: Mutation['logout'] } }>()

  cookieStore.delete('token')

  return result
}
