'use server'

import type { Query } from '@prosspecta/codegen'
import { DashboardMetricsQuery, PipelinesQuery } from '@/graphql/queries'
import { api } from '@/lib/api'

export async function fetchDashboardMetrics(): Promise<Query['dashboardMetrics']> {
  try {
    const response = await api
      .post('graphql', {
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          tags: ['dashboard'],
        },
        body: JSON.stringify({
          query: DashboardMetricsQuery,
        }),
      })
      .json<{ data: { dashboardMetrics: Query['dashboardMetrics'] } }>()

    return response.data.dashboardMetrics
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error)
    throw new Error('Error when getting dashboard metrics')
  }
}

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

export async function fetchPipelineAnalytics() {
  const pipelines = await fetchPipelines()

  if (!pipelines) return []

  // Agrupar por mês e contar ativas vs finalizadas
  const monthlyData = pipelines.reduce((acc, pipeline) => {
    if (!pipeline?.createdAt) return acc

    const date = new Date(pipeline.createdAt)
    const monthKey = date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

    if (!acc[monthKey]) {
      acc[monthKey] = { month: monthKey, ativas: 0, finalizadas: 0 }
    }

    // Considerar WON e LOST como finalizadas, resto como ativas
    if (pipeline.status === 'WON' || pipeline.status === 'LOST') {
      acc[monthKey].finalizadas++
    } else {
      acc[monthKey].ativas++
    }

    return acc
  }, {} as Record<string, { month: string; ativas: number; finalizadas: number }>)

  return Object.values(monthlyData).slice(-6) // Últimos 6 meses
}