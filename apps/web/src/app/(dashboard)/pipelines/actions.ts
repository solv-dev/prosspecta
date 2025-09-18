'use server'

import type {
  CreatePipelineInput,
  Mutation,
  PipelineStatus,
  Query,
  UpdatePipelineInput,
} from '@prosspecta/codegen'
import { revalidateTag } from 'next/cache'
import {
  PipelineCreateMutation,
  PipelineDeleteMutation,
  PipelineUpdateMutation,
} from '@/graphql/mutations'
import { PipelineQuery, PipelinesQuery } from '@/graphql/queries'
import { api } from '@/lib/api'

export async function fetchPipelines() {
  const response = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['pipelines'],
      },
      body: JSON.stringify({
        query: PipelinesQuery,
      }),
    })
    .json<{ data: { pipelines: Query['pipelines'] } }>()

  return response.data.pipelines
}

export async function fetchPipeline(
  pipelineId: string
): Promise<Query['pipeline']> {
  try {
    const response = await api
      .post('graphql', {
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          tags: [`pipeline/${pipelineId}`],
        },
        body: JSON.stringify({
          query: PipelineQuery,
          variables: {
            id: pipelineId,
          },
        }),
      })
      .json<{ data: { pipeline: Query['pipeline'] } }>()

    return response.data.pipeline
  } catch (error) {
    console.error(error)
    throw new Error('Error when getting pipelines')
  }
}

export async function pipelineCreate(args: CreatePipelineInput) {
  const response = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: PipelineCreateMutation,
        variables: {
          data: {
            ...args,
          },
        },
      }),
    })
    .json<{ data: { pipelineCreate: Mutation['pipelineCreate'] } }>()

  revalidateTag('pipelines')

  return response.data.pipelineCreate
}

export async function pipelineUpdate(id: string, args: UpdatePipelineInput) {
  const response = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: PipelineUpdateMutation,
        variables: {
          id,
          data: {
            ...args,
          },
        },
      }),
    })
    .json<{ data: { pipelineUpdate: Mutation['pipelineUpdate'] } }>()

  revalidateTag('pipelines')

  return response.data.pipelineUpdate
}

export async function pipelineUpdateStatus(id: string, status: PipelineStatus) {
  try {
    const payload = {
      query: PipelineUpdateMutation,
      variables: {
        id,
        data: {
          status,
        },
      },
    }

    console.log('Pipeline update payload:', JSON.stringify(payload, null, 2))

    const response = await api
      .post('graphql', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      .json<{
        data: { pipelineUpdate: Mutation['pipelineUpdate'] }
        errors?: any[]
      }>()

    if (response.errors) {
      console.error('GraphQL errors:', response.errors)
      throw new Error(`GraphQL errors: ${JSON.stringify(response.errors)}`)
    }

    revalidateTag('pipelines')

    return response.data.pipelineUpdate
  } catch (error) {
    console.error('Error updating pipeline status:', error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to update pipeline status')
  }
}

export async function pipelineDelete(id: string) {
  const response = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: PipelineDeleteMutation,
        variables: {
          id,
        },
      }),
    })
    .json<{ data: { pipelineDelete: Mutation['pipelineDelete'] } }>()

  revalidateTag('pipelines')

  return response.data.pipelineDelete
}
