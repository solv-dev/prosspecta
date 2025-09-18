'use client'

import type { Lead } from '@prosspecta/codegen'
import { IconSearch, IconTableExport, IconUsersPlus } from '@tabler/icons-react'
import Link from 'next/link'
import { useMemo } from 'react'
import {
  type LeadFilters,
  LeadsFilterDialog,
} from '@/components/dialogs/leads-filter-dialog'
import { LeadsTable } from '@/components/tables/leads/table'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useLeadsFilters } from '@/hooks/use-leads-filters'
import { useLeadsParams } from '@/hooks/use-leads-params'

interface LeadsPageClientProps {
  initialLeads: Lead[]
}

function applyFilters(leads: Lead[], filters: LeadFilters): Lead[] {
  if (!filters || Object.keys(filters).length === 0) {
    return leads
  }

  return leads.filter(lead => {
    // Filtro por período
    if (filters.startDate || filters.endDate) {
      if (!lead.createdAt) return false

      const leadDate = new Date(lead.createdAt)

      if (filters.startDate && leadDate < filters.startDate) {
        return false
      }

      if (filters.endDate && leadDate > filters.endDate) {
        return false
      }
    }

    // Filtro por DDD
    if (filters.areaCode && lead.phone) {
      const phoneNumbers = lead.phone.replace(/\D/g, '')

      if (phoneNumbers.length >= 10) {
        const ddd =
          phoneNumbers.length === 11
            ? phoneNumbers.substring(0, 2)
            : phoneNumbers.length === 10
              ? phoneNumbers.substring(0, 2)
              : phoneNumbers.length === 13 && phoneNumbers.startsWith('55')
                ? phoneNumbers.substring(2, 4)
                : null

        if (!ddd || ddd !== filters.areaCode) {
          return false
        }
      } else {
        return false
      }
    }

    // Filtro por domínio do email
    if (filters.emailDomain && lead.email) {
      const emailDomain = lead.email.split('@')[1]?.toLowerCase()
      const filterDomain = filters.emailDomain.toLowerCase()

      if (!emailDomain || !emailDomain.includes(filterDomain)) {
        return false
      }
    }

    return true
  })
}

export function LeadsPageClient({ initialLeads }: LeadsPageClientProps) {
  const { filters, setFilters, clearFilters, hasActiveFilters } =
    useLeadsFilters()
  const { setParams } = useLeadsParams()

  const filteredLeads = useMemo(() => {
    return applyFilters(initialLeads, filters)
  }, [initialLeads, filters])

  return (
    <div className='flex flex-col w-full h-full gap-4'>
      <div className='grid grid-cols-2'>
        <div className='flex flex-col justify-end'>
          <Label className='text-[22px] font-semibold'>Leads</Label>
          <Label className='text-sm font-light text-muted-foreground'>
            Gerencie os seus leads registrados
          </Label>
        </div>
        <div className='flex items-center justify-end gap-2'>
          <LeadsFilterDialog
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
          />
          <Link href='/leads/search'>
            <Button type='button' variant='outline' size='icon'>
              <IconSearch className='size-4' />
            </Button>
          </Link>
          <Button type='button' variant='outline' size='icon'>
            <IconTableExport className='size-4' />
          </Button>
          <Button
            type='button'
            variant='outline'
            size='icon'
            onClick={() => setParams({ createLead: true })}
          >
            <IconUsersPlus className='size-4' />
          </Button>
        </div>
      </div>

      {hasActiveFilters && (
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <span>
            {filteredLeads.length} lead(s) encontrado(s) com os filtros
            aplicados
          </span>
          <Button
            variant='ghost'
            size='sm'
            onClick={clearFilters}
            className='h-auto p-1 text-primary hover:text-primary'
          >
            Limpar filtros
          </Button>
        </div>
      )}

      <div className='relative'>
        <LeadsTable data={filteredLeads} />
      </div>
    </div>
  )
}
