'use server'

import type {
  Contact,
  CreateContactInput,
  Mutation,
  Query,
  QueryContactArgs,
  UpdateContactInput,
} from '@prosspecta/codegen'
import { revalidateTag } from 'next/cache'
import {
  ContactCreateMutation,
  ContactDeleteMutation,
  ContactUpdateMutation,
} from '@/graphql/mutations'
import { ContactQuery, ContactsQuery } from '@/graphql/queries'
import { api } from '@/lib/api'

export async function fetchContacts() {
  const response = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['contacts'],
      },
      body: JSON.stringify({
        query: ContactsQuery,
      }),
    })
    .json<{ data: { contacts: Query['contacts'] } }>()

  return response.data.contacts
}

export async function fetchContact(
  contactId: string,
): Promise<Query['contact']> {
  try {
    const response = await api
      .post('graphql', {
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          tags: [`contact/${contactId}`],
        },
        body: JSON.stringify({
          query: ContactQuery,
          variables: {
            id: contactId,
          },
        }),
      })
      .json<{ data: { contact: Query['contact'] } }>()

    return response.data.contact
  } catch (error) {
    console.error(error)
    throw new Error('Error when getting contacts')
  }
}

export async function contactCreate(args: CreateContactInput) {
  const response = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: ContactCreateMutation,
        variables: {
          data: {
            ...args,
          },
        },
      }),
    })
    .json<{ data: { contactCreate: Mutation['contactCreate'] } }>()

  revalidateTag('contacts')

  return response.data.contactCreate
}

export async function contactUpdate(id: string, args: UpdateContactInput) {
  const response = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: ContactUpdateMutation,
        variables: {
          id,
          data: {
            ...args,
          },
        },
      }),
    })
    .json<{ data: { contactUpdate: Mutation['contactUpdate'] } }>()

  revalidateTag('contacts')

  return response.data.contactUpdate
}

export async function contactDelete(id: string) {
  const response = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: ContactDeleteMutation,
        variables: {
          id,
        },
      }),
    })
    .json<{ data: { contactDelete: Mutation['contactDelete'] } }>()

  revalidateTag('contacts')

  return response.data.contactDelete
}
