'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface PipelineChartData {
  month: string
  ativas: number
  finalizadas: number
}

const chartConfig = {
  ativas: {
    label: 'Pipelines Ativas',
    color: 'var(--chart-1)',
  },
  finalizadas: {
    label: 'Pipelines Finalizadas',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export function ChartAreaLegend({ data }: { data: PipelineChartData[] }) {
  return (
    <ChartContainer config={chartConfig} className='h-[250px] w-full'>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='month'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={value => value.split(' ')[0].slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator='line' />}
        />
        <Area
          dataKey='finalizadas'
          type='natural'
          fill='var(--color-finalizadas)'
          fillOpacity={0.4}
          stroke='var(--color-finalizadas)'
          stackId='a'
        />
        <Area
          dataKey='ativas'
          type='natural'
          fill='var(--color-ativas)'
          fillOpacity={0.4}
          stroke='var(--color-ativas)'
          stackId='a'
        />
        <ChartLegend
          content={props => (
            <ChartLegendContent
              payload={props.payload}
              verticalAlign={props.verticalAlign}
            />
          )}
        />
      </AreaChart>
    </ChartContainer>
  )
}
