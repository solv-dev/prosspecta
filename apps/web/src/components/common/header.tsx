'use client'

import {
  IconHome,
  IconMenu,
  IconTarget,
  IconUserSearch,
  IconUsers,
} from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { UserMenu } from '../user-menu'
import { Logo } from './logo'

const navigationLinks = [
  { href: '/', label: 'Início', icon: IconHome },
  { href: '/pipelines', label: 'Pipelines', icon: IconTarget },
  { href: '/leads', label: 'Leads', icon: IconUserSearch },
  { href: '/contacts', label: 'Contatos', icon: IconUsers },
]

function isLinkActive(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/'
  }
  return pathname.startsWith(href)
}

export function Header() {
  const pathname = usePathname()

  const _user = {
    name: 'Cristian Freitas',
    email: 'cristian@solvs.dev',
  }

  return (
    <header className='px-4 md:px-6'>
      <div className='h-18 flex items-center justify-between gap-4'>
        <div className='flex flex-1 items-center gap-2'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className='group size-8 md:hidden'
                variant='ghost'
                size='icon'
              >
                <IconMenu />
              </Button>
            </PopoverTrigger>
            <PopoverContent align='start' className='w-36 p-1 md:hidden'>
              <NavigationMenu className='max-w-none *:w-full'>
                <NavigationMenuList className='flex-col items-start gap-0 md:gap-2'>
                  {navigationLinks.map((link, index) => {
                    const Icon = link.icon
                    return (
                      <NavigationMenuItem key={index} className='w-full'>
                        <NavigationMenuLink
                          href={link.href}
                          className='flex-row items-center gap-2 py-1.5'
                          active={isLinkActive(pathname, link.href)}
                        >
                          <Icon
                            size={16}
                            className='text-muted-foreground/80'
                            aria-hidden='true'
                          />
                          <span>{link.label}</span>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          <div className='flex items-center gap-4'>
            <Logo className='size-8' />
            <div className='w-[1px] bg-white/5 h-10 mr-2' />
          </div>
          <NavigationMenu className='max-md:hidden'>
            <NavigationMenuList className='gap-2'>
              {navigationLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      active={isLinkActive(pathname, link.href)}
                      href={link.href}
                    >
                      <Icon size={16} aria-hidden='true' />
                      <span>{link.label}</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <UserMenu />
      </div>
    </header>
  )
}
