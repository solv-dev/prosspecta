'use client'

import type { Pipeline } from '@prosspecta/codegen'
import type { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<Pipeline>[] = [
  {
    accessorKey: 'lead',
    header: () => null,
    cell: ({ row }) => <span>{row.original.lead?.name || '-'}</span>,
  },
  {
    accessorKey: 'assignedUser',
    header: () => null,
    cell: ({ row }) => <span>{row.original.assignedUser?.name || '-'}</span>,
  },
  {
    accessorKey: 'status',
    header: () => null,
    cell: ({ row }) => <Badge variant="outline">{row.original.status}</Badge>,
  },
]
