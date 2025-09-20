import { Status } from '@prisma/client'
import { routeGuard } from '../../common/guards/route-guard'
import { builder } from '../../shared/builder'
import { prisma } from '../../shared/prisma'
import { DashboardMetrics } from './dashboard.types'

builder.queryField('dashboardMetrics', t =>
  t.field({
    type: DashboardMetrics,
    resolve: async (_parent, _, _ctx, _info) => {
      const currentUser = await routeGuard(_ctx)

      if (!currentUser) {
        throw new Error('Usuário não autenticado')
      }

      const organizationId = currentUser.organizationId

      const now = new Date()
      const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const lastMonthEnd = new Date(
        now.getFullYear(),
        now.getMonth(),
        0,
        23,
        59,
        59,
        999
      )

      const [totalLeads, newLeadsThisMonth, newLeadsLastMonth, leadsInProcess] =
        await Promise.all([
          prisma.lead.count({
            where: {
              organizationId,
              isActive: true,
            },
          }),

          prisma.lead.count({
            where: {
              organizationId,
              isActive: true,
              createdAt: {
                gte: currentMonth,
              },
            },
          }),

          prisma.lead.count({
            where: {
              organizationId,
              isActive: true,
              createdAt: {
                gte: lastMonth,
                lte: lastMonthEnd,
              },
            },
          }),

          prisma.lead.count({
            where: {
              organizationId,
              isActive: true,
              status: {
                in: [Status.CONTACTED, Status.QUALIFIED, Status.PROPOSAL],
              },
            },
          }),
        ])

      const monthlyGrowthPercentage =
        newLeadsLastMonth > 0
          ? ((newLeadsThisMonth - newLeadsLastMonth) / newLeadsLastMonth) * 100
          : newLeadsThisMonth > 0
            ? 100
            : 0

      return {
        totalLeads,
        newLeadsThisMonth,
        leadsInProcess,
        monthlyGrowthPercentage:
          Math.round(monthlyGrowthPercentage * 100) / 100,
      }
    },
  })
)
