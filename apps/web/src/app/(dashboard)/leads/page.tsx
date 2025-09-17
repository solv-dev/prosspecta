import { Suspense } from 'react'
import { Loader } from '@/components/common/loader'
import { LeadCreateDialog } from '@/components/dialogs/lead-create-dialog'
import { LeadDeleteDialog } from '@/components/dialogs/lead-delete-dialog'
import { LeadUpdateDialog } from '@/components/dialogs/lead-update-dialog'
import { LeadsTable } from '@/components/tables/leads/table'
import { Label } from '@/components/ui/label'
import { LeadsPageActions } from './_components/leads-page-actions'
import { fetchLeads } from './actions'

export default async function LeadsPage() {
  const leads = await fetchLeads()

  return (
    <>
      <div className="flex flex-col w-full h-full gap-4">
        <div className="grid grid-cols-2">
          <div className="flex flex-col justify-end">
            <Label className="text-[22px] font-semibold">Leads</Label>
            <Label className="text-sm font-light text-muted-foreground">
              Gerencie os seus leads registrados
            </Label>
          </div>
          <LeadsPageActions />
        </div>
        <Suspense fallback={<Loader />}>
          <LeadsTable data={leads ?? []} />
        </Suspense>
      </div>

      <LeadCreateDialog />
      <LeadUpdateDialog />
      <LeadDeleteDialog />
    </>
  )
}