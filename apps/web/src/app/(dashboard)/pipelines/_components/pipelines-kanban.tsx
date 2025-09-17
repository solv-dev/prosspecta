'use client'

import type { Pipeline, PipelineStatus } from '@prosspecta/codegen'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from '@/components/ui/kanban'
import { pipelineStatusOptions } from '@/utils/pipeline-status-options'
import { resolvePipelineStatus } from '@/utils/resolve-pipeline-status'
import { resolvePriority } from '@/utils/resolve-priority'
import { pipelineUpdateStatus } from '../actions'

const statusColors: Record<string, string> = {
  NEW: '#3B82F6',
  CONTACTED: '#F59E0B',
  QUALIFIED: '#8B5CF6',
  PROPOSAL: '#F97316',
  WON: '#10B981',
  LOST: '#EF4444',
  CANCELED: '#6B7280',
  DISCARDED: '#9CA3AF',
}

const priorityColors: Record<string, string> = {
  low: '#6B7280',
  medium: '#F59E0B',
  high: '#EF4444',
}

interface PipelineKanbanItem {
  id: string
  name: string
  assignedTo: string
  column: string
  priority: string
  pipelineData: Pipeline
}

export const PipelinesKanban = ({ pipelines }: { pipelines: Pipeline[] }) => {
  const originalDataRef = useRef<{ id: string; column: string }[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const columns = pipelineStatusOptions.map((status) => ({
    id: status.value,
    name: status.label,
    color: statusColors[status.value] || '#6B7280',
  }))

  const pipelinesData: PipelineKanbanItem[] = pipelines.map((pipeline) => {
    const assignedUser = pipeline.assignedUser

    return {
      id: pipeline.id ?? '',
      name: pipeline.title ?? '',
      assignedTo: assignedUser?.name || 'Não atribuído',
      column: pipeline.status ?? '',
      priority: (pipeline.priority ?? 'low') as string,
      pipelineData: pipeline,
    }
  })

  if (originalDataRef.current.length === 0) {
    originalDataRef.current = pipelinesData.map((pipeline) => ({
      id: pipeline.id,
      column: pipeline.column,
    }))
  }

  if (!isClient) {
    return (
      <div className="grid grid-cols-6 gap-4 h-full">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: column.color }}
              />
              <span>{column.name}</span>
            </div>
            <div className="space-y-2">
              {pipelinesData
                .filter((pipeline) => pipeline.column === column.id)
                .map((pipeline) => (
                  <div
                    key={pipeline.id}
                    className="bg-white border rounded-md p-3 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-1">
                        <p className="m-0 flex-1 -mb-1 text-muted-foreground text-xs font-mono">
                          #{pipeline.id.slice(0, 6).toLocaleUpperCase()}
                        </p>
                        <p className="m-0 flex-1 font-medium text-[13px]">
                          {pipeline.name}
                        </p>
                        <p className="m-0 -mt-1 flex-1 text-muted-foreground text-xs">
                          {pipeline.assignedTo}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge
                            style={{
                              backgroundColor: `${priorityColors[pipeline.priority] || '#6B7280'}20`,
                              color:
                                priorityColors[pipeline.priority] || '#6B7280',
                              borderColor:
                                priorityColors[pipeline.priority] || '#6B7280',
                            }}
                          >
                            {resolvePriority(pipeline.priority as any)}
                          </Badge>
                          <Badge
                            style={{
                              backgroundColor: `${statusColors[pipeline.column] || '#6B7280'}20`,
                              color: statusColors[pipeline.column] || '#6B7280',
                            }}
                          >
                            {resolvePipelineStatus(pipeline.column as any)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const handleUpdateStatus = async (
    values: typeof pipelinesData,
    isDragEnd?: boolean,
  ) => {
    if (!isDragEnd) return

    const changedPipelines: { id: string; column: string }[] = []

    values.forEach((newData) => {
      const originalTask = originalDataRef.current.find(
        (task) => task.id === newData.id,
      )
      if (originalTask && originalTask.column !== newData.column) {
        changedPipelines.push({ id: newData.id, column: newData.column })
        originalTask.column = newData.column
      }
    })

    if (changedPipelines.length > 0) {
      const firstPipeline = changedPipelines[0]!

      // Garantir que o status é um valor válido do enum PipelineStatus
      const validStatuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST', 'CANCELED', 'DISCARDED']
      const statusToUpdate = validStatuses.includes(firstPipeline.column)
        ? firstPipeline.column as PipelineStatus
        : 'NEW' as PipelineStatus

      await pipelineUpdateStatus(firstPipeline.id, statusToUpdate)
        .then(() => {
          console.log('Status da pipeline alterado com sucesso!')
        })
        .catch((error) => {
          console.error(error)
          toast.error('Erro ao alterar o status da pipeline!')
        })
    }
  }

  return (
    <KanbanProvider
      columns={columns}
      data={pipelinesData}
      onDataChange={handleUpdateStatus}
    >
      {(column) => (
        <KanbanBoard id={column.id} key={column.id}>
          <KanbanHeader>
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: column.color }}
              />
              <span>{column.name}</span>
            </div>
          </KanbanHeader>
          <KanbanCards id={column.id}>
            {(task) => (
              <KanbanCard
                column={task.column}
                id={task.id}
                key={task.id}
                name={task.name}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <p className="m-0 flex-1 -mb-1 text-muted-foreground text-xs font-mono">
                      #{task.id.slice(0, 6).toLocaleUpperCase()}
                    </p>
                    <p className="m-0 flex-1 font-medium text-[13px]">
                      {task.name}
                    </p>
                    <p className="m-0 -mt-1 flex-1 text-muted-foreground  text-xs">
                      {task.assignedTo}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        style={{
                          backgroundColor: `${priorityColors[task.priority as string] || '#6B7280'}20`,
                          color:
                            priorityColors[task.priority as string] ||
                            '#6B7280',
                          borderColor:
                            priorityColors[task.priority as string] ||
                            '#6B7280',
                        }}
                      >
                        {resolvePriority(task.priority as any)}
                      </Badge>
                      <Badge
                        style={{
                          backgroundColor: `${statusColors[task.column as string] || '#6B7280'}20`,
                          color:
                            statusColors[task.column as string] || '#6B7280',
                        }}
                      >
                        {resolvePipelineStatus(task.column as any)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </KanbanCard>
            )}
          </KanbanCards>
        </KanbanBoard>
      )}
    </KanbanProvider>
  )
}
