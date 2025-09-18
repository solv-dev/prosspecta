import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/components/common/logo'
import { LoginForm } from '@/components/forms/login-form'

export const metadata: Metadata = {
  title: 'Login',
}

export default function LoginPage() {
  return (
    <div className='flex flex-col items-center gap-4 w-full max-w-sm'>
      <Logo className='size-14' />
      <LoginForm />
      <div className='flex flex-col w-full items-center'>
        <p className='text-muted-foreground font-normal text-xs select-none'>
          Ao clicar em continuar, você concorda com nossos
        </p>
        <div className='flex gap-1 text-xs text-muted-foreground select-none'>
          <Link href='/' className='hover:underline hover:text-white'>
            Termos de serviço
          </Link>
          e
          <Link href='/' className='hover:underline hover:text-white'>
            Políticas de Privacidade
          </Link>
        </div>
      </div>
    </div>
  )
}
