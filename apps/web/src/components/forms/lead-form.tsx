'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import type { Lead } from '@prosspecta/codegen'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { leadCreate, leadUpdate } from '@/app/(dashboard)/leads/actions'
import { useLeadsParams } from '@/hooks/use-leads-params'
import { FormInput } from '../form-input'
import { Button } from '../ui/button'
import { Form } from '../ui/form'

export const leadFormSchema = z.object({
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  company: z.string(),
  description: z.string().optional(),
})

export function LeadForm({
  data,
  isUpdate = false,
}: {
  data?: Lead
  isUpdate?: boolean
}) {
  const { setParams } = useLeadsParams()

  const form = useForm<z.infer<typeof leadFormSchema>>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: data?.name ?? '',
      email: data?.email ?? '',
      phone: data?.phone ?? '',
      company: data?.company ?? '',
      description: data?.description ?? '',
    },
  })

  const onSubmit = (values: z.infer<typeof leadFormSchema>) => {
    if (isUpdate && data?.id) {
      leadUpdate(data?.id, values)
        .then(() => toast.success('Lead atualizado com sucesso!'))
        .catch(error => {
          toast.error('Erro ao atualizar lead.')
          console.error(error)
        })
        .finally(() => {
          setParams(null)
        })
    } else {
      leadCreate(values)
        .then(() => toast.success('Lead criado com sucesso!'))
        .catch(error => {
          toast.error('Erro ao criar lead.')
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
          placeholder='Nome do lead'
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
        <FormInput
          isTextarea
          name='description'
          control={form.control}
          label='Descrição'
          placeholder='Descrição do lead'
        />
        <Button className='w-full'>
          {isUpdate ? 'Atualizar' : 'Adicionar'}
        </Button>
      </form>
    </Form>
  )
}
