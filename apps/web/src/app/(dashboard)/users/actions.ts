'use server'

import type {
  User,
  CreateUserInput,
  Mutation,
  Query,
  QueryUserArgs,
  UpdateUserInput,
} from '@prosspecta/codegen'
import { revalidateTag } from 'next/cache'
import {
  UserCreateMutation,
  UserDeleteMutation,
  UserUpdateMutation,
} from '@/graphql/mutations'
import { UserQuery, UsersQuery } from '@/graphql/queries'
import { api } from '@/lib/api'

export async function fetchUsers() {
  const response = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['users'],
      },
      body: JSON.stringify({
        query: UsersQuery,
      }),
    })
    .json<{ data: { users: Query['users'] } }>()

  return response.data.users
}

export async function fetchUser(
  userId: string,
): Promise<Query['user']> {
  try {
    const response = await api
      .post('graphql', {
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          tags: [`user/${userId}`],
        },
        body: JSON.stringify({
          query: UserQuery,
          variables: {
            id: userId,
          },
        }),
      })
      .json<{ data: { user: Query['user'] } }>()

    return response.data.user
  } catch (error) {
    console.error(error)
    throw new Error('Error when getting users')
  }
}

export async function userCreate(args: CreateUserInput) {
  const response = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: UserCreateMutation,
        variables: {
          data: {
            ...args,
          },
        },
      }),
    })
    .json<{ data: { userCreate: Mutation['userCreate'] } }>()

  revalidateTag('users')

  return response.data.userCreate
}

export async function userUpdate(id: string, args: UpdateUserInput) {
  const response = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: UserUpdateMutation,
        variables: {
          id,
          data: {
            ...args,
          },
        },
      }),
    })
    .json<{ data: { userUpdate: Mutation['userUpdate'] } }>()

  revalidateTag('users')

  return response.data.userUpdate
}

export async function userDelete(id: string) {
  const response = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: UserDeleteMutation,
        variables: {
          id,
        },
      }),
    })
    .json<{ data: { userDelete: Mutation['userDelete'] } }>()

  revalidateTag('users')

  return response.data.userDelete
}