'use client'

import { IconFilter, IconTableExport, IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { usePipelinesParams } from '@/hooks/use-pipelines-params'

export function PipelinesPageActions() {
  const { setParams, createPipeline } = usePipelinesParams()

  return (
    <div className="flex items-end gap-2 justify-end">
      <Button type="button" variant="outline">
        <IconFilter />
      </Button>
      <Button type="button" variant="outline">
        <IconTableExport />
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => setParams({ createPipeline: true })}
      >
        <IconPlus />
      </Button>
    </div>
  )
}