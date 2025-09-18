'use client'

import { ContactForm } from '@/components/forms/contact-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useContactsParams } from '@/hooks/use-contacts-params'

export function ContactCreateDialog() {
  const { setParams, createContact } = useContactsParams()

  return (
    <Dialog open={!!createContact} onOpenChange={() => setParams(null)}>
      <DialogContent className='sm:max-w-sm'>
        <DialogHeader>
          <DialogTitle>Criar Contato</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4 w-full h-full'>
          <ContactForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
