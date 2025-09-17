'use client'

import { type Pipeline, PipelinePriority } from '@prosspecta/codegen'
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons-react'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { TableColumnHeader } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePipelinesParams } from '@/hooks/use-pipelines-params'

export const columns: ColumnDef<Pipeline>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Title" className="ml-3" />
    ),
    cell: ({ row }) => {
      const { setParams } = usePipelinesParams()

      return (
        <button
          type="button"
          className="-mb-3 ml-2 cursor-pointer"
          onClick={() => setParams({ updatePipeline: row.original.id })}
        >
          {row.original.title}
        </button>
      )
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <span className="max-w-[200px] truncate">
        {row.original.description || '-'}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge>,
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.priority === PipelinePriority.High ||
          row.original.priority === PipelinePriority.Urgent
            ? 'destructive'
            : 'secondary'
        }
      >
        {row.original.priority}
      </Badge>
    ),
  },
  {
    accessorKey: 'assignedUser',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Assigned User" />
    ),
    cell: ({ row }) => <span>{row.original.assignedUser?.name || '-'}</span>,
  },
  {
    accessorKey: 'contact',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Contact" />
    ),
    cell: ({ row }) => <span>{row.original.contact?.name || '-'}</span>,
  },
  {
    accessorKey: 'lead',
    header: ({ column }) => <TableColumnHeader column={column} title="Lead" />,
    cell: ({ row }) => <span>{row.original.lead?.name || '-'}</span>,
  },
  {
    accessorKey: 'createdAt',
    cell: ({ row }) => (
      <span>
        {row.original.createdAt
          ? format(row.original.createdAt, 'dd/MM/yyyy')
          : '-'}
      </span>
    ),
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Created At" />
    ),
  },
  {
    accessorKey: 'id',
    header: () => null,
    cell: ({ row }) => {
      const { setParams } = usePipelinesParams()

      return (
        <div className="flex items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                onClick={() => console.log(row.original.id)}
                className="bg-transparent hover:bg-primary/10 hover:text-primary text-white [&_svg]:size-4 size-8 rounded-full flex items-center justify-center cursor-pointer"
              >
                <IconDotsVertical />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setParams({ updatePipeline: row.original.id })}
              >
                <IconPencil />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setParams({ deletePipeline: row.original.id })}
              >
                <IconTrash className="h-4 w-4" />
                Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
