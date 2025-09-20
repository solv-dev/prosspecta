import { builder } from '../../shared/builder'

export interface DashboardMetricsType {
  totalLeads: number
  newLeadsThisMonth: number
  leadsInProcess: number
  monthlyGrowthPercentage: number
}

export const DashboardMetrics = builder
  .objectRef<DashboardMetricsType>('DashboardMetrics')
  .implement({
    fields: t => ({
      totalLeads: t.exposeInt('totalLeads', {
        description: 'Número total de leads',
      }),
      newLeadsThisMonth: t.exposeInt('newLeadsThisMonth', {
        description: 'Novos leads este mês',
      }),
      leadsInProcess: t.exposeInt('leadsInProcess', {
        description: 'Leads em processo (Contacted, Qualified, Proposal)',
      }),
      monthlyGrowthPercentage: t.exposeFloat('monthlyGrowthPercentage', {
        description: 'Porcentagem de crescimento mensal',
      }),
    }),
  })
