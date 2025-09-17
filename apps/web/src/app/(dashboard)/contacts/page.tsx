import { Suspense } from 'react'
import { Loader } from '@/components/common/loader'
import { ContactCreateDialog } from '@/components/dialogs/contact-create-dialog'
import { ContactDeleteDialog } from '@/components/dialogs/contact-delete-dialog'
import { ContactUpdateDialog } from '@/components/dialogs/contact-update-dialog'
import { ContactsTable } from '@/components/tables/contacts/table'
import { Label } from '@/components/ui/label'
import { ContactsPageActions } from './_components/contacts-page-actions'
import { fetchContacts } from './actions'

export default async function ContactsPage() {
  const contacts = await fetchContacts()

  return (
    <>
      <div className="flex flex-col w-full h-full gap-4">
        <div className="grid grid-cols-2">
          <div className="flex flex-col justify-end">
            <Label className="text-[22px] font-semibold">Contatos</Label>
            <Label className="text-sm font-light text-muted-foreground">
              Gerencie os seus contatos registrados
            </Label>
          </div>
          <ContactsPageActions />
        </div>
        <Suspense fallback={<Loader />}>
          <ContactsTable data={contacts ?? []} />
        </Suspense>
      </div>

      <ContactCreateDialog />
      <ContactUpdateDialog />
      <ContactDeleteDialog />
    </>
  )
}
