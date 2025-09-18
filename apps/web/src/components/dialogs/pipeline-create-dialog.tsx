'use client'

import { PipelineForm } from '@/components/forms/pipeline-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { usePipelinesParams } from '@/hooks/use-pipelines-params'

export function PipelineCreateDialog() {
  const { setParams, createPipeline } = usePipelinesParams()

  return (
    <Dialog open={!!createPipeline} onOpenChange={() => setParams(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Pipeline</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4 w-full h-full'>
          <PipelineForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
