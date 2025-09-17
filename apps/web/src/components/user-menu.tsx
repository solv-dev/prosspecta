'use client'

import { IconLogout, IconUser } from '@tabler/icons-react'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'
import { logout } from '@/actions/logout'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function UserMenu() {
  const handleLogout = async () => {
    const response = await logout()

    if (!response.data.logout) {
      toast.error('Erro ao sair da sessão')
    }

    redirect('/')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="cursor-pointer flex items-center justify-center size-12 text-primary bg-primary/5 rounded-full hover:bg-primary/10 hover:border-primary/50 border border-transparent transition ease-in"
        >
          <IconUser size={18} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer [&_svg]:text-muted-foreground hover:bg-primary/5 hover:[&_svg]:text-primary text-muted-foreground hover:text-primary transition ease-in"
        >
          <IconLogout size={16} />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
