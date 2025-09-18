'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { login } from '@/app/(auth)/actions'
import { Button } from '@/components/ui/button'
import EmojiWavingHand from '../../../public/waving-hand-emoji.png'
import { FormInput } from '../form-input'
import { Form } from '../ui/form'
import { Label } from '../ui/label'

export const loginSchema = z.object({
  email: z.email(),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  })

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const mutation = await login({ data: { email: values.email } })

      if (!mutation.data.login) {
        toast.error(
          'Erro ao enviar o email. Verifique as credenciais e tente novamente.'
        )
        return
      }

      toast.success('Email de acesso enviado com sucesso!')
      return
    } catch (error) {
      toast.error('Não foi possível completar sua requisição')
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form className='w-full' onSubmit={form.handleSubmit(onLoginSubmit)}>
        <div className='flex flex-col items-center text-center mb-4'>
          <div className='flex items-center gap-2'>
            <Label className='text-[22px] font-semibold'>
              Bem-vindo de volta!{' '}
            </Label>
            <Image
              src={EmojiWavingHand}
              alt='waving-hand-emoji'
              className='size-8'
            />
          </div>
          <Label className='text-muted-foreground text-sm font-light text-balance'>
            Informe seu email para acessar a sua conta
          </Label>
        </div>
        <div className='grid gap-2'>
          <FormInput
            type='email'
            name='email'
            control={form.control}
            placeholder='m@example.com'
          />
          <Button type='submit' className='w-full'>
            Login
          </Button>
        </div>
      </form>
    </Form>
  )
}
