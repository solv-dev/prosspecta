import type { PropsWithChildren } from 'react'
import { Header } from '@/components/common/header'

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <div className='flex flex-1 flex-col w-full h-full px-6'>{children}</div>
    </>
  )
}
