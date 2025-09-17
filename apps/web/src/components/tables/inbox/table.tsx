'use client'

import type { Pipeline } from '@prosspecta/codegen'
import {
  TableBody,
  TableCell,
  TableProvider,
  TableRow,
} from '@/components/data-table'
import { columns } from './columns'

export function InboxTable({ data }: { data: Pipeline[] }) {
  return (
    <TableProvider columns={columns} data={data}>
      <TableBody>
        {({ row }) => (
          <TableRow key={row.id} row={row}>
            {({ cell }) => <TableCell cell={cell} key={cell.id} />}
          </TableRow>
        )}
      </TableBody>
    </TableProvider>
  )
}
