'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Contact } from '@prosspecta/codegen'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import {
  contactCreate,
  contactUpdate,
} from '@/app/(dashboard)/contacts/actions'
import { useContactsParams } from '@/hooks/use-contacts-params'
import { FormInput } from '../form-input'
import { Button } from '../ui/button'
import { Form } from '../ui/form'

export const contactFormSchema = z.object({
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  company: z.string(),
})

export function ContactForm({
  data,
  isUpdate = false,
}: {
  data?: Contact
  isUpdate?: boolean
}) {
  const { setParams } = useContactsParams()

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: data?.name ?? '',
      email: data?.email ?? '',
      phone: data?.phone ?? '',
      company: data?.company ?? '',
    },
  })

  const onSubmit = (values: z.infer<typeof contactFormSchema>) => {
    if (isUpdate && data?.id) {
      contactUpdate(data?.id, values)
        .then(() => toast.success('Contato atualizado com sucesso!'))
        .catch(error => {
          toast.error('Erro ao atualizar contato.')
          console.error(error)
        })
        .finally(() => {
          setParams(null)
        })
    } else {
      contactCreate(values)
        .then(() => toast.success('Contato criado com sucesso!'))
        .catch(error => {
          toast.error('Erro ao criar contato.')
          console.error(error)
        })
        .finally(() => {
          setParams(null)
        })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormInput
          name='name'
          type='text'
          control={form.control}
          label='Nome'
          placeholder='Nome do contato'
        />
        <FormInput
          name='email'
          type='email'
          control={form.control}
          label='Email'
          placeholder='john@example.com'
        />
        <FormInput
          name='phone'
          control={form.control}
          label='Telefone'
          placeholder='+55 11 99999-9999'
        />
        <FormInput
          name='company'
          type='text'
          control={form.control}
          label='Empresa'
          placeholder='Nome da empresa'
        />
        <Button className='w-full'>
          {isUpdate ? 'Atualizar' : 'Adicionar'}
        </Button>
      </form>
    </Form>
  )
}
