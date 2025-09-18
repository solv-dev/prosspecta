'use client'

import type { Contact } from '@prosspecta/codegen'
import { IconDotsVertical, IconPencil, IconTrash } from '@tabler/icons-react'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { TableColumnHeader } from '@/components/data-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useContactsParams } from '@/hooks/use-contacts-params'
import { formatPhoneNumber } from '@/utils/format-phone-number'

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Nome" className="ml-3" />
    ),
    cell: ({ row }) => {
      const { setParams } = useContactsParams()

      return (
        <button
          type="button"
          className="-mb-3 ml-2 cursor-pointer"
          onClick={() => setParams({ updateContact: row.original.id })}
        >
          {row.original.name}
        </button>
      )
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: 'phone',
    cell: ({ row }) => (
      <span>
        {row.original.phone ? formatPhoneNumber(row.original.phone) : '-'}
      </span>
    ),
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Telefone" />
    ),
  },
  {
    accessorKey: 'company',
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Empresa" />
    ),
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
      <TableColumnHeader column={column} title="Criado em" />
    ),
  },
  {
    accessorKey: 'id',
    header: () => null,
    cell: ({ row }) => {
      const { setParams } = useContactsParams()

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
                onClick={() => setParams({ updateContact: row.original.id })}
              >
                <IconPencil />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setParams({ deleteContact: row.original.id })}
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
