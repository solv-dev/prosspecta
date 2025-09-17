'use client'

import type { Pipeline } from '@prosspecta/codegen'
import { PipelinesTable } from '@/components/tables/pipelines/table'
import { usePipelineViewParams } from '@/hooks/use-pipeline-view-params'
import { PipelinesKanban } from './pipelines-kanban'

export function PipelinesDataViews({ data }: { data: Pipeline[] }) {
  const { currentView } = usePipelineViewParams()

  return (
    <div>
      {currentView === 'kanban' && <PipelinesKanban pipelines={data} />}
      {currentView === 'table' && <PipelinesTable data={data} />}
    </div>
  )
}
