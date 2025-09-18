'use client'

import type { Contact } from '@prosspecta/codegen'
import { IconTableExport, IconUsersPlus } from '@tabler/icons-react'
import { useMemo } from 'react'
import {
  type ContactFilters,
  ContactsFilterDialog,
} from '@/components/dialogs/contacts-filter-dialog'
import { ContactsTable } from '@/components/tables/contacts/table'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useContactsFilters } from '@/hooks/use-contacts-filters'
import { useContactsParams } from '@/hooks/use-contacts-params'

interface ContactsPageClientProps {
  initialContacts: Contact[]
}

function applyFilters(contacts: Contact[], filters: ContactFilters): Contact[] {
  if (!filters || Object.keys(filters).length === 0) {
    return contacts
  }

  return contacts.filter(contact => {
    if (filters.startDate || filters.endDate) {
      if (!contact.createdAt) return false

      const contactDate = new Date(contact.createdAt)

      if (filters.startDate && contactDate < filters.startDate) {
        return false
      }

      if (filters.endDate && contactDate > filters.endDate) {
        return false
      }
    }

    if (filters.areaCode && contact.phone) {
      const phoneNumbers = contact.phone.replace(/\D/g, '')

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

    if (filters.emailDomain && contact.email) {
      const emailDomain = contact.email.split('@')[1]?.toLowerCase()
      const filterDomain = filters.emailDomain.toLowerCase()

      if (!emailDomain || !emailDomain.includes(filterDomain)) {
        return false
      }
    }

    return true
  })
}

export function ContactsPageClient({
  initialContacts,
}: ContactsPageClientProps) {
  const { filters, setFilters, clearFilters, hasActiveFilters } =
    useContactsFilters()
  const { setParams } = useContactsParams()

  const filteredContacts = useMemo(() => {
    return applyFilters(initialContacts, filters)
  }, [initialContacts, filters])

  return (
    <div className='flex flex-col w-full h-full gap-4'>
      <div className='grid grid-cols-2'>
        <div className='flex flex-col justify-end'>
          <Label className='text-[22px] font-semibold'>Contatos</Label>
          <Label className='text-sm font-light text-muted-foreground'>
            Gerencie os seus contatos registrados
          </Label>
        </div>
        <div className='flex items-center justify-end gap-2'>
          <ContactsFilterDialog
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
          />
          <Button type='button' variant='outline' size='icon'>
            <IconTableExport className='size-4' />
          </Button>
          <Button
            type='button'
            variant='outline'
            size='icon'
            onClick={() => setParams({ createContact: true })}
          >
            <IconUsersPlus className='size-4' />
          </Button>
        </div>
      </div>

      {hasActiveFilters && (
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <span>
            {filteredContacts.length} contato(s) encontrado(s) com os filtros
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
        <ContactsTable data={filteredContacts} />
      </div>
    </div>
  )
}
