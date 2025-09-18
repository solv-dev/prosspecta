import { ContactCreateDialog } from '@/components/dialogs/contact-create-dialog'
import { ContactDeleteDialog } from '@/components/dialogs/contact-delete-dialog'
import { ContactUpdateDialog } from '@/components/dialogs/contact-update-dialog'
import { ContactsPageClient } from './_components/contacts-page-client'
import { fetchContacts } from './actions'

export default async function ContactsPage() {
  const contacts = await fetchContacts()

  return (
    <>
      <ContactsPageClient initialContacts={contacts ?? []} />

      <ContactCreateDialog />
      <ContactUpdateDialog />
      <ContactDeleteDialog />
    </>
  )
}
