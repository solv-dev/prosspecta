import { cn } from '@/lib/utils'

export const Logo = ({ className }: { className?: string }) => (
  <svg
    role='img'
    aria-label='logo'
    xmlns='http://www.w3.org/2000/svg'
    width='43'
    height='43'
    fill='none'
    viewBox='0 0 43 43'
    className={cn('fill-primary', className)}
  >
    <path d='M42.5 14.3H28.1V0H14.3c0 7.9-6.4 14.3-14.3 14.3v13.8h14.3v14.3h13.8c0-7.9 6.5-14.3 14.4-14.3z'></path>
  </svg>
)
