'use client'

import type { Lead } from '@prosspecta/codegen'
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeaderGroup,
  TableProvider,
  TableRow,
} from '@/components/data-table'
import { columns } from './columns'

export const LeadsTable = ({ data }: { data: Lead[] }) => {
  return (
    <div className='grid w-full h-full bg-black/40 overflow-hidden rounded-lg'>
      <TableProvider columns={columns} data={data ?? []}>
        <TableHeader>
          {({ headerGroup }) => (
            <TableHeaderGroup headerGroup={headerGroup} key={headerGroup.id}>
              {({ header }) => <TableHead header={header} key={header.id} />}
            </TableHeaderGroup>
          )}
        </TableHeader>
        <TableBody>
          {({ row }) => (
            <TableRow key={row.id} row={row}>
              {({ cell }) => <TableCell cell={cell} key={cell.id} />}
            </TableRow>
          )}
        </TableBody>
      </TableProvider>
    </div>
  )
}
