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

export function DashboardCards() {
  return (
    <div className="grid grid-cols-4 w-full gap-4">
      <Card className="bg-primary px-1">
        <CardHeader>
          <CardDescription className="text-background text-sm font-medium select-none">
            Total de Leads
          </CardDescription>
          <CardTitle className="text-5xl font-bold text-background -mb-2 mt-2 select-none">
            100
          </CardTitle>
          <CardAction>
            <Badge className="text-primary bg-background font-semibold select-none">
              <IconTrendingUp className="size-3" />
              12
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
            Novos Leads
          </CardDescription>
          <CardTitle className="text-5xl font-bold -mb-2 mt-2 select-none">
            10
          </CardTitle>
          <CardAction>
            <Badge className="select-none bg-primary/15 text-primary">
              <IconTrendingUp className="size-3" />
              12
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start text-sm">
          <div className="text-xs flex gap-2 font-medium select-none">
            Leads com status novo
          </div>
          <div className="text-xs text-white/50 font-medium select-none">
            Leads aguardando primeira análise
          </div>
        </CardFooter>
      </Card>

      <Card className="border-none bg-black/50 px-1">
        <CardHeader>
          <CardDescription className="text-sm font-medium select-none">
            Leads Ativos
          </CardDescription>
          <CardTitle className="text-5xl font-bold -mb-2 mt-2 select-none">
            19
          </CardTitle>
          <CardAction>
            <Badge className="select-none bg-primary/15 text-primary">
              <IconTrendingUp className="size-3" />
              12
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start text-sm">
          <div className="text-xs flex gap-2 font-medium select-none">
            Leads em andamento
          </div>
          <div className="text-xs text-white/50 font-medium select-none">
            Leads sendo trabalhados ativamente
          </div>
        </CardFooter>
      </Card>

      <Card className="border-none bg-black/50 px-1">
        <CardHeader>
          <CardDescription className="text-sm font-medium select-none">
            Taxa de Crescimento
          </CardDescription>
          <CardTitle className="text-5xl font-bold -mb-2 mt-2 select-none">
            +100.0%
          </CardTitle>
          <CardAction>
            <Badge className="select-none bg-primary/15 text-primary">
              <IconTrendingUp className="size-3" />
              12
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
