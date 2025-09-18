'use server'

import type {
  Lead,
  CreateLeadInput,
  Mutation,
  Query,
  QueryLeadArgs,
  UpdateLeadInput,
} from '@prosspecta/codegen'
import { revalidateTag } from 'next/cache'
import {
  LeadCreateMutation,
  LeadDeleteMutation,
  LeadUpdateMutation,
} from '@/graphql/mutations'
import { LeadQuery, LeadsQuery } from '@/graphql/queries'
import { api } from '@/lib/api'

export async function fetchLeads() {
  const response = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['leads'],
      },
      body: JSON.stringify({
        query: LeadsQuery,
      }),
    })
    .json<{ data: { leads: Query['leads'] } }>()

  return response.data.leads
}

export async function fetchLead(leadId: string): Promise<Query['lead']> {
  try {
    const response = await api
      .post('graphql', {
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          tags: [`lead/${leadId}`],
        },
        body: JSON.stringify({
          query: LeadQuery,
          variables: {
            id: leadId,
          },
        }),
      })
      .json<{ data: { lead: Query['lead'] } }>()

    return response.data.lead
  } catch (error) {
    console.error(error)
    throw new Error('Error when getting leads')
  }
}

export async function leadCreate(args: CreateLeadInput) {
  const response = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: LeadCreateMutation,
        variables: {
          data: {
            ...args,
          },
        },
      }),
    })
    .json<{ data: { leadCreate: Mutation['leadCreate'] } }>()

  revalidateTag('leads')

  return response.data.leadCreate
}

export async function leadUpdate(id: string, args: UpdateLeadInput) {
  const response = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: LeadUpdateMutation,
        variables: {
          id,
          data: {
            ...args,
          },
        },
      }),
    })
    .json<{ data: { leadUpdate: Mutation['leadUpdate'] } }>()

  revalidateTag('leads')

  return response.data.leadUpdate
}

export async function leadDelete(id: string) {
  const response = await api
    .post('graphql', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: LeadDeleteMutation,
        variables: {
          id,
        },
      }),
    })
    .json<{ data: { leadDelete: Mutation['leadDelete'] } }>()

  revalidateTag('leads')

  return response.data.leadDelete
}

export async function bulkImportLeads(
  externalLeads: Array<{
    name: string
    email: string
    phone?: string
    company: string
    job_title: string
    location: string
    industry: string
    experience_level: string
    technologies: string[]
  }>,
) {
  const results = []

  for (const externalLead of externalLeads) {
    try {
      const leadData: CreateLeadInput = {
        name: externalLead.name,
        email: externalLead.email,
        phone: externalLead.phone || '',
        company: externalLead.company,
        description: `Cargo: ${externalLead.job_title}\nLocalização: ${externalLead.location}\nSetor: ${externalLead.industry}\nExperiência: ${externalLead.experience_level}\nTecnologias: ${externalLead.technologies.join(', ')}`,
      }

      const result = await leadCreate(leadData)
      results.push({ success: true, lead: result, originalData: externalLead })
    } catch (error) {
      console.error(`Error importing lead ${externalLead.name}:`, error)
      results.push({ success: false, error: error, originalData: externalLead })
    }
  }

  return results
}
