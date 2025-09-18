'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function ContactFormSkeleton() {
  return (
    <div className='space-y-4'>
      <div className='flex flex-col w-full gap-2'>
        <Skeleton className='h-3 rounded-md w-1/3' />
        <Skeleton className='h-9 rounded-md' />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <Skeleton className='h-3 rounded-md w-1/3' />
        <Skeleton className='h-9 rounded-md' />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <Skeleton className='h-3 rounded-md w-1/3' />
        <Skeleton className='h-9 rounded-md' />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <Skeleton className='h-3 rounded-md w-1/3' />
        <Skeleton className='h-9 rounded-md' />
      </div>
      <Skeleton className='h-9 rounded-full' />
    </div>
  )
}
