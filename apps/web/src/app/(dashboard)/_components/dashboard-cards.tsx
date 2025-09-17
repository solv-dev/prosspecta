import { IconTrendingUp } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { fetchDashboardMetrics } from '../actions'

export async function DashboardCards() {
  const metrics = await fetchDashboardMetrics()

  return (
    <div className="grid grid-cols-4 w-full gap-4">
      <Card className="bg-primary px-1">
        <CardHeader>
          <CardDescription className="text-background text-sm font-medium select-none">
            Total de Leads
          </CardDescription>
          <CardTitle className="text-5xl font-bold text-background -mb-2 mt-2 select-none">
            {metrics?.totalLeads}
          </CardTitle>
          <CardAction>
            <Badge className="text-primary bg-background font-semibold select-none">
              <IconTrendingUp className="size-3" />
              {metrics?.monthlyGrowthPercentage &&
              metrics.monthlyGrowthPercentage > 0
                ? '+'
                : ''}
              {metrics?.monthlyGrowthPercentage}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start text-sm">
          <div className="text-xs flex gap-2 font-medium text-background select-none">
            Crescimento desde o mês passado
          </div>
          <div className="text-background/70 text-xs font-medium select-none">
            Total de leads no sistema
          </div>
        </CardFooter>
      </Card>

      <Card className="border-none bg-black/50 px-1">
        <CardHeader>
          <CardDescription className="text-sm font-medium select-none">
            Novos Leads (Mês)
          </CardDescription>
          <CardTitle className="text-5xl font-bold -mb-2 mt-2 select-none">
            {metrics?.newLeadsThisMonth}
          </CardTitle>
          <CardAction>
            <Badge className="select-none bg-primary/15 text-primary">
              <IconTrendingUp className="size-3" />
              {metrics?.monthlyGrowthPercentage &&
              metrics.monthlyGrowthPercentage > 0
                ? '+'
                : ''}
              {metrics?.monthlyGrowthPercentage ?? 0}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start text-sm">
          <div className="text-xs flex gap-2 font-medium select-none">
            Novos leads neste mês
          </div>
          <div className="text-xs text-white/50 font-medium select-none">
            Leads criados no mês atual
          </div>
        </CardFooter>
      </Card>

      <Card className="border-none bg-black/50 px-1">
        <CardHeader>
          <CardDescription className="text-sm font-medium select-none">
            Leads em Processo
          </CardDescription>
          <CardTitle className="text-5xl font-bold -mb-2 mt-2 select-none">
            {metrics?.leadsInProcess}
          </CardTitle>
          <CardAction>
            <Badge className="select-none bg-primary/15 text-primary">
              <IconTrendingUp className="size-3" />
              {metrics?.monthlyGrowthPercentage &&
              metrics.monthlyGrowthPercentage > 0
                ? '+'
                : ''}
              {metrics?.monthlyGrowthPercentage ?? 0}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start text-sm">
          <div className="text-xs flex gap-2 font-medium select-none">
            Leads em processo
          </div>
          <div className="text-xs text-white/50 font-medium select-none">
            Contacted, Qualified ou Proposal
          </div>
        </CardFooter>
      </Card>

      <Card className="border-none bg-black/50 px-1">
        <CardHeader>
          <CardDescription className="text-sm font-medium select-none">
            Taxa de Crescimento
          </CardDescription>
          <CardTitle className="text-5xl font-bold -mb-2 mt-2 select-none">
            {metrics?.monthlyGrowthPercentage &&
            metrics.monthlyGrowthPercentage > 0
              ? '+'
              : ''}
            {metrics?.monthlyGrowthPercentage ?? 0}%
          </CardTitle>
          <CardAction>
            <Badge className="select-none bg-primary/15 text-primary">
              <IconTrendingUp className="size-3" />
              {metrics?.monthlyGrowthPercentage &&
              metrics.monthlyGrowthPercentage > 0
                ? '+'
                : ''}
              {metrics?.monthlyGrowthPercentage ?? 0}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start text-sm">
          <div className="text-xs flex gap-2 font-medium select-none">
            Crescimento desde o mês passado
          </div>
          <div className="text-xs text-white/50 font-medium select-none">
            Comparado ao mês anterior
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
