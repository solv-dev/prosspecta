import type * as React from 'react'
import { cn } from '@/lib/utils'

function Page({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='page'
      className={cn('w-full min-h-full', className)}
      {...props}
    />
  )
}

function PageHead({
  className,
  title,
  subtitle,
  ...props
}: { title?: string; subtitle?: string } & React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='page-head'
      className={cn(
        'flex h-auto w-full grid-cols-2 flex-col items-end md:grid',
        className
      )}
    >
      <div className='col-span-1 flex h-full w-full flex-col justify-end'>
        {title && <PageTitle>{title}</PageTitle>}
        {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
      </div>
      <div className='col-span-1 flex h-full w-full items-end justify-end'>
        {props.children}
      </div>
    </div>
  )
}

function PageTitle({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h3
      data-slot='page-title'
      className={cn('select-none', className)}
      {...props}
    />
  )
}

function PageSubtitle({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot='page-description'
      className={cn(
        'text-muted-foreground text-sm font-normal select-none',
        className
      )}
      {...props}
    />
  )
}

function PageContent({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot='page-content'
      className={cn(
        'flex flex-1 flex-col gap-2 space-y-4 px-7 py-6',
        className
      )}
      {...props}
    />
  )
}

export { Page, PageContent, PageHead, PageSubtitle, PageTitle }
