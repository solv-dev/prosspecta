'use client'

import type { Lead } from '@prosspecta/codegen'
import { useEffect, useState } from 'react'
import { fetchLead } from '@/app/(dashboard)/leads/actions'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useLeadsParams } from '@/hooks/use-leads-params'
import { LeadForm } from '../forms/lead-form'
import { ContactFormSkeleton } from '../skeletons/contact-form-skeleton'

export function LeadUpdateDialog() {
  const { setParams, updateLead } = useLeadsParams()
  const [lead, setLead] = useState<Lead | null>()

  useEffect(() => {
    if (!updateLead) {
      setLead(null)
      return
    }

    fetchLead(updateLead)
      .then((data) => {
        setLead(data)
      })
      .catch((error) => console.error(error))
  }, [updateLead])

  return (
    <Dialog open={!!updateLead} onOpenChange={() => setParams(null)}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Editar Lead</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full h-full">
          {lead ? <LeadForm data={lead} isUpdate /> : <ContactFormSkeleton />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
