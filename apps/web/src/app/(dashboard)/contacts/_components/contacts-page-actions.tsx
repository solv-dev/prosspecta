'use client'

import { IconFilter, IconTableExport, IconUsersPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useContactsParams } from '@/hooks/use-contacts-params'

export function ContactsPageActions() {
  const { setParams, createContact } = useContactsParams()

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
        onClick={() => setParams({ createContact: true })}
      >
        <IconUsersPlus />
      </Button>
    </div>
  )
}
