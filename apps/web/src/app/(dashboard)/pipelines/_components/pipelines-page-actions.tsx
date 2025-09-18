'use client'

import {
  IconChevronDown,
  IconColumns,
  IconPlus,
  IconTable,
} from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  type PipelineViewType,
  usePipelineViewParams,
} from '@/hooks/use-pipeline-view-params'
import { usePipelinesParams } from '@/hooks/use-pipelines-params'

export function PipelinesPageActions() {
  const { setParams } = usePipelinesParams()
  const { currentView, setView } = usePipelineViewParams()

  const viewOptions: Array<{
    value: PipelineViewType
    label: string
    icon: typeof IconColumns
  }> = [
    {
      value: 'kanban',
      label: 'Kanban',
      icon: IconColumns,
    },
    {
      value: 'table',
      label: 'Tabela',
      icon: IconTable,
    },
  ]

  const currentViewOption = viewOptions.find(
    option => option.value === currentView
  )

  return (
    <div className='flex items-end gap-2 justify-end'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='flex items-center gap-2'>
            {currentViewOption && <currentViewOption.icon className='size-4' />}
            {currentViewOption?.label}
            <IconChevronDown className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {viewOptions.map(option => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setView(option.value)}
              className='flex items-center gap-2'
            >
              <option.icon className='size-4' />
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        type='button'
        variant='outline'
        onClick={() => setParams({ createPipeline: true })}
      >
        <IconPlus />
      </Button>
    </div>
  )
}
