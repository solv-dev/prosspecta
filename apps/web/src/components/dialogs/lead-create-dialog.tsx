'use client'

import { LeadForm } from '@/components/forms/lead-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useLeadsParams } from '@/hooks/use-leads-params'

export function LeadCreateDialog() {
  const { setParams, createLead } = useLeadsParams()

  return (
    <Dialog open={!!createLead} onOpenChange={() => setParams(null)}>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>Criar Lead</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4 w-full h-full'>
          <LeadForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
