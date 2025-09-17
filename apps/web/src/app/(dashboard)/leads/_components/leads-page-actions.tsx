'use client'

import { IconFilter, IconTableExport, IconUsersPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useLeadsParams } from '@/hooks/use-leads-params'

export function LeadsPageActions() {
  const { setParams, createLead } = useLeadsParams()

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
        onClick={() => setParams({ createLead: true })}
      >
        <IconUsersPlus />
      </Button>
    </div>
  )
}