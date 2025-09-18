import { ChartAreaLegend } from '@/components/ui/area-chart'
import { Label } from '@/components/ui/label'
import { fetchPipelineAnalytics } from '../actions'

export async function DashboardChart() {
  const pipelineData = await fetchPipelineAnalytics()

  return (
    <div className='grid w-full h-full bg-black/40 overflow-hidden rounded-lg p-6'>
      <div className='flex flex-col gap-4'>
        <div>
          <Label className='text-lg font-semibold'>Pipelines por Período</Label>
          <Label className='text-sm text-muted-foreground block'>
            Comparativo de pipelines ativas vs finalizadas
          </Label>
        </div>
        <ChartAreaLegend data={pipelineData} />
      </div>
    </div>
  )
}
