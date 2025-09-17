'use client'

import type { Contact } from '@prosspecta/codegen'
import { useEffect, useState } from 'react'
import { fetchContact } from '@/app/(dashboard)/contacts/actions'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useContactsParams } from '@/hooks/use-contacts-params'
import { ContactForm } from '../forms/contact-form'
import { ContactFormSkeleton } from '../skeletons/contact-form-skeleton'

export function ContactUpdateDialog() {
  const { setParams, updateContact } = useContactsParams()
  const [contact, setContact] = useState<Contact | null>()

  useEffect(() => {
    if (!updateContact) {
      setContact(null)
      return
    }

    fetchContact(updateContact)
      .then((data) => {
        setContact(data)
      })
      .catch((error) => console.error(error))
  }, [updateContact])

  return (
    <Dialog open={!!updateContact} onOpenChange={() => setParams(null)}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Editar Contato</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 w-full h-full">
          {contact ? (
            <ContactForm data={contact} isUpdate />
          ) : (
            <ContactFormSkeleton />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
