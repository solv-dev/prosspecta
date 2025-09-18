'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  type Contact,
  type Lead,
  type Pipeline,
  PipelinePriority,
  PipelineStatus,
  type User,
} from '@prosspecta/codegen'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { fetchContacts } from '@/app/(dashboard)/contacts/actions'
import { fetchLeads } from '@/app/(dashboard)/leads/actions'
import {
  pipelineCreate,
  pipelineUpdate,
} from '@/app/(dashboard)/pipelines/actions'
import { fetchUsers } from '@/app/(dashboard)/users/actions'
import { usePipelinesParams } from '@/hooks/use-pipelines-params'
import { FormInput } from '../form-input'
import { FormSelect } from '../form-select'
import { Button } from '../ui/button'
import { Form } from '../ui/form'

const PipelineStatusEnum = z.enum([
  PipelineStatus.New,
  PipelineStatus.Contacted,
  PipelineStatus.Qualified,
  PipelineStatus.Proposal,
  PipelineStatus.Won,
  PipelineStatus.Lost,
  PipelineStatus.Canceled,
  PipelineStatus.Discarded,
])

const PipelinePriorityEnum = z.enum([
  PipelinePriority.Low,
  PipelinePriority.Medium,
  PipelinePriority.High,
  PipelinePriority.Urgent,
])

export const pipelineFormSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  status: PipelineStatusEnum,
  priority: PipelinePriorityEnum,
  assignedUserId: z.string(),
  leadId: z.string(),
  contactId: z.string(),
})

export function PipelineForm({
  data,
  isUpdate = false,
}: {
  data?: Pipeline
  isUpdate?: boolean
}) {
  const { setParams } = usePipelinesParams()

  const [users, setUsers] = useState<User[]>()
  const [contacts, setContacts] = useState<Contact[]>()
  const [leads, setLeads] = useState<Lead[]>()

  const form = useForm<z.infer<typeof pipelineFormSchema>>({
    resolver: zodResolver(pipelineFormSchema),
    defaultValues: {
      title: data?.title ?? '',
      description: data?.description ?? '',
      status: data?.status ?? PipelineStatus.New,
      priority: data?.priority ?? PipelinePriority.Low,
      assignedUserId: data?.assignedUser?.id ?? '',
      leadId: data?.lead?.id ?? '',
      contactId: data?.contact?.id ?? '',
    },
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, contactsData, leadsData] = await Promise.all([
          fetchUsers(),
          fetchContacts(),
          fetchLeads(),
        ])
        setUsers(usersData ?? [])
        setContacts(contactsData ?? [])
        setLeads(leadsData ?? [])
      } catch (error) {
        console.error('Error loading form data:', error)
        toast.error('Erro ao carregar dados do formulário')
      }
    }

    loadData()
  }, [])

  const onSubmit = (values: z.infer<typeof pipelineFormSchema>) => {
    if (isUpdate && data?.id) {
      pipelineUpdate(data?.id, values)
        .then(() => toast.success('Pipeline atualizado com sucesso!'))
        .catch(error => {
          toast.error('Erro ao atualizar pipeline.')
          console.error(error)
        })
        .finally(() => {
          setParams(null)
        })
    } else {
      pipelineCreate(values)
        .then(() => toast.success('Pipeline criado com sucesso!'))
        .catch(error => {
          toast.error('Erro ao criar pipeline.')
          console.error(error)
        })
        .finally(() => {
          setParams(null)
        })
    }
  }

  const statusOptions = [
    { label: 'Novo', value: PipelineStatus.New },
    { label: 'Contatado', value: PipelineStatus.Contacted },
    { label: 'Qualificado', value: PipelineStatus.Qualified },
    { label: 'Proposta', value: PipelineStatus.Proposal },
    { label: 'Ganho', value: PipelineStatus.Won },
    { label: 'Perdido', value: PipelineStatus.Lost },
    { label: 'Cancelado', value: PipelineStatus.Canceled },
    { label: 'Descartado', value: PipelineStatus.Discarded },
  ]

  const priorityOptions = [
    { label: 'Baixa', value: PipelinePriority.Low },
    { label: 'Média', value: PipelinePriority.Medium },
    { label: 'Alta', value: PipelinePriority.High },
    { label: 'Urgente', value: PipelinePriority.Urgent },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormInput
          name='title'
          type='text'
          control={form.control}
          label='Título'
          placeholder='Título da pipeline'
        />
        <FormSelect
          name='assignedUserId'
          control={form.control}
          label='Responsável'
          placeholder='Selecione o usuário'
          items={
            users?.map(user => ({
              value: user.id ?? '',
              label: user.name ?? '',
            })) ?? []
          }
        />
        <div className='grid grid-cols-2 gap-4'>
          <FormSelect
            name='status'
            control={form.control}
            label='Status'
            placeholder='Selecione o status'
            items={statusOptions}
          />
          <FormSelect
            name='priority'
            control={form.control}
            label='Prioridade'
            placeholder='Selecione a prioridade'
            items={priorityOptions}
          />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <FormSelect
            name='leadId'
            control={form.control}
            label='Lead'
            placeholder='Selecione o lead'
            items={
              leads?.map(lead => ({
                value: lead.id ?? '',
                label: lead.name ?? '',
              })) ?? []
            }
          />
          <FormSelect
            name='contactId'
            control={form.control}
            label='Contato'
            placeholder='Selecione o contato'
            items={
              contacts?.map(contact => ({
                value: contact.id ?? '',
                label: contact.name ?? '',
              })) ?? []
            }
          />
        </div>

        <FormInput
          isTextarea
          name='description'
          type='text'
          control={form.control}
          label='Descrição'
          placeholder='Descreva a pipeline...'
        />
        <Button className='w-full'>{isUpdate ? 'Atualizar' : 'Criar'}</Button>
      </form>
    </Form>
  )
}
