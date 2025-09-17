'use client'

import type { Pipeline } from '@prosspecta/codegen'
import { useEffect, useState } from 'react'
import { fetchPipeline } from '@/app/(dashboard)/pipelines/actions'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { usePipelinesParams } from '@/hooks/use-pipelines-params'
import { PipelineForm } from '../forms/pipeline-form'
import { ContactFormSkeleton } from '../skeletons/contact-form-skeleton'

export function PipelineUpdateDialog() {
  const { setParams, updatePipeline } = usePipelinesParams()
  const [pipeline, setPipeline] = useState<Pipeline | null>()

  useEffect(() => {
    if (!updatePipeline) {
      setPipeline(null)
      return
    }

    fetchPipeline(updatePipeline)
      .then((data) => {
        setPipeline(data)
      })
      .catch((error) => console.error(error))
  }, [updatePipeline])

  return (
    <Dialog open={!!updatePipeline} onOpenChange={() => setParams(null)}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Editar Pipeline</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full h-full">
          {pipeline ? (
            <PipelineForm data={pipeline} isUpdate />
          ) : (
            <ContactFormSkeleton />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}