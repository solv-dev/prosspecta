'use client'

import { IconFilter, IconX } from '@tabler/icons-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export interface LeadFilters {
  startDate?: Date
  endDate?: Date
  areaCode?: string
  emailDomain?: string
}

interface LeadsFilterDialogProps {
  filters: LeadFilters
  onFiltersChange: (filters: LeadFilters) => void
  onClearFilters: () => void
}

export function LeadsFilterDialog({
  filters,
  onFiltersChange,
  onClearFilters,
}: LeadsFilterDialogProps) {
  const [open, setOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState<LeadFilters>(filters)

  const handleApplyFilters = () => {
    onFiltersChange(localFilters)
    setOpen(false)
  }

  const handleClearFilters = () => {
    setLocalFilters({})
    onClearFilters()
    setOpen(false)
  }

  const hasActiveFilters =
    filters.startDate ||
    filters.endDate ||
    filters.areaCode ||
    filters.emailDomain

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            'gap-2',
            hasActiveFilters && 'border-primary bg-primary/10',
          )}
        >
          <IconFilter className="size-4" />
          {hasActiveFilters && (
            <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
              {Object.values(filters).filter(Boolean).length}
            </span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Filtrar Leads</DialogTitle>
          <DialogDescription>
            Configure os filtros para refinar a lista de leads
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Filtro por Período */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Período de Criação</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label
                  htmlFor="start-date"
                  className="text-xs text-muted-foreground"
                >
                  Data Inicial
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !localFilters.startDate && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {localFilters.startDate
                        ? format(localFilters.startDate, 'dd/MM/yyyy', {
                            locale: ptBR,
                          })
                        : 'Selecionar data'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={localFilters.startDate}
                      onSelect={(date) =>
                        setLocalFilters({ ...localFilters, startDate: date })
                      }
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="end-date"
                  className="text-xs text-muted-foreground"
                >
                  Data Final
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !localFilters.endDate && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {localFilters.endDate
                        ? format(localFilters.endDate, 'dd/MM/yyyy', {
                            locale: ptBR,
                          })
                        : 'Selecionar data'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={localFilters.endDate}
                      onSelect={(date) =>
                        setLocalFilters({ ...localFilters, endDate: date })
                      }
                      disabled={(date) =>
                        date > new Date() ||
                        date < new Date('1900-01-01') ||
                        (localFilters.startDate &&
                          date < localFilters.startDate)
                      }
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Filtro por DDD */}
          <div className="space-y-2">
            <Label htmlFor="area-code" className="text-sm font-medium">
              DDD
            </Label>
            <Input
              placeholder="00"
              value={localFilters.areaCode || ''}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, areaCode: e.target.value })
              }
              maxLength={2}
            />
            <p className="text-xs text-muted-foreground">
              Digite apenas os números do DDD (ex: 11 para São Paulo)
            </p>
          </div>

          {/* Filtro por Domínio do Email */}
          <div className="space-y-2">
            <Label htmlFor="email-domain" className="text-sm font-medium">
              Domínio do Email
            </Label>
            <Input
              placeholder="acme.com"
              value={localFilters.emailDomain || ''}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  emailDomain: e.target.value,
                })
              }
            />
            <p className="text-xs text-muted-foreground">
              Digite o domínio sem o @ (ex: gmail.com)
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="gap-2"
          >
            <IconX className="size-4" />
            Limpar Filtros
          </Button>
          <Button onClick={handleApplyFilters}>Aplicar Filtros</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
