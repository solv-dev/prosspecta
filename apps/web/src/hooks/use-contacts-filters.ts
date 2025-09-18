'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import type { ContactFilters } from '@/components/dialogs/contacts-filter-dialog'

export function useContactsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const filters: ContactFilters = {
    startDate: searchParams.get('startDate')
      ? new Date(searchParams.get('startDate')!)
      : undefined,
    endDate: searchParams.get('endDate')
      ? new Date(searchParams.get('endDate')!)
      : undefined,
    areaCode: searchParams.get('areaCode') || undefined,
    emailDomain: searchParams.get('emailDomain') || undefined,
  }

  const setFilters = useCallback(
    (newFilters: ContactFilters) => {
      const params = new URLSearchParams(searchParams.toString())

      // Remove filtros anteriores
      params.delete('startDate')
      params.delete('endDate')
      params.delete('areaCode')
      params.delete('emailDomain')

      // Adiciona novos filtros se existirem
      if (newFilters.startDate) {
        params.set('startDate', newFilters.startDate.toISOString())
      }
      if (newFilters.endDate) {
        params.set('endDate', newFilters.endDate.toISOString())
      }
      if (newFilters.areaCode) {
        params.set('areaCode', newFilters.areaCode)
      }
      if (newFilters.emailDomain) {
        params.set('emailDomain', newFilters.emailDomain)
      }

      router.push(`?${params.toString()}`)
    },
    [router, searchParams],
  )

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())

    // Remove todos os filtros
    params.delete('startDate')
    params.delete('endDate')
    params.delete('areaCode')
    params.delete('emailDomain')

    router.push(`?${params.toString()}`)
  }, [router, searchParams])

  const hasActiveFilters = Boolean(
    filters.startDate ||
      filters.endDate ||
      filters.areaCode ||
      filters.emailDomain,
  )

  return {
    filters,
    setFilters,
    clearFilters,
    hasActiveFilters,
  }
}
