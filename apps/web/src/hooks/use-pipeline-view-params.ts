'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export type PipelineViewType = 'kanban' | 'table'

export function usePipelineViewParams() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentView = (searchParams.get('view') as PipelineViewType) || 'kanban'

  const setView = useCallback(
    (view: PipelineViewType) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('view', view)
      router.push(`?${params.toString()}`)
    },
    [router, searchParams],
  )

  return {
    currentView,
    setView,
  }
}
