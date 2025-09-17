import { Suspense } from 'react'
import { Loader } from '@/components/common/loader'
import { PipelineCreateDialog } from '@/components/dialogs/pipeline-create-dialog'
import { PipelineDeleteDialog } from '@/components/dialogs/pipeline-delete-dialog'
import { PipelineUpdateDialog } from '@/components/dialogs/pipeline-update-dialog'
import { Label } from '@/components/ui/label'
import { PipelinesDataViews } from './_components/pipelines-data-views'
import { PipelinesPageActions } from './_components/pipelines-page-actions'
import { fetchPipelines } from './actions'

export default async function PipelinesPage() {
  const pipelines = await fetchPipelines()

  return (
    <>
      <div className="flex flex-col w-full h-full gap-4">
        <div className="grid grid-cols-2">
          <div className="flex flex-col justify-end">
            <Label className="text-[22px] font-semibold">Pipelines</Label>
            <Label className="text-sm font-light text-muted-foreground">
              Gerencie os seus pipelines registrados
            </Label>
          </div>
          <PipelinesPageActions />
        </div>
        <Suspense fallback={<Loader />}>
          <PipelinesDataViews data={pipelines ?? []} />
        </Suspense>
      </div>

      <PipelineCreateDialog />
      <PipelineUpdateDialog />
      <PipelineDeleteDialog />
    </>
  )
}
