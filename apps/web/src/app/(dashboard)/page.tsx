import { Page, PageContent, PageHead } from '@/components/common/page'
import { DashboardCards } from './_components/dashboard-cards'
import { DashboardChart, DashboardInbox } from './_components/dashboard-inbox'

export default async function Home() {
  return (
    <Page>
      <PageContent>
        <PageHead
          title="Dashboard"
          subtitle="Visão geral do desempenho da sua equipe"
        />
        <div className="flex flex-col w-full gap-4 h-full">
          <DashboardCards />
          <DashboardChart />
        </div>
      </PageContent>
    </Page>
  )
}
