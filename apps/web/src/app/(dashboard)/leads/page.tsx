import { LeadCreateDialog } from '@/components/dialogs/lead-create-dialog'
import { LeadDeleteDialog } from '@/components/dialogs/lead-delete-dialog'
import { LeadUpdateDialog } from '@/components/dialogs/lead-update-dialog'
import { LeadsPageClient } from './_components/leads-page-client'
import { fetchLeads } from './actions'

export default async function LeadsPage() {
  const leads = await fetchLeads()

  return (
    <>
      <LeadsPageClient initialLeads={leads ?? []} />

      <LeadCreateDialog />
      <LeadUpdateDialog />
      <LeadDeleteDialog />
    </>
  )
}
