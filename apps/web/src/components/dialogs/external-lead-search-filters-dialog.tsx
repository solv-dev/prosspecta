'use client'

import { IconFilter, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export interface ExternalLeadSearchFilters {
  location?: string
  company_size?: string
  industry?: string
  job_title?: string
  experience_level?: string
  technologies?: string
}

interface ExternalLeadSearchFiltersDialogProps {
  filters: ExternalLeadSearchFilters
  onFiltersChange: (filters: ExternalLeadSearchFilters) => void
  onClearFilters: () => void
}

const companySizeOptions = [
  { value: 'startup', label: 'Startup (1-10)' },
  { value: 'small', label: 'Pequena (11-50)' },
  { value: 'medium', label: 'Média (51-200)' },
  { value: 'large', label: 'Grande (201-1000)' },
  { value: 'enterprise', label: 'Enterprise (1000+)' },
]

const industryOptions = [
  { value: 'technology', label: 'Tecnologia' },
  { value: 'finance', label: 'Financeiro' },
  { value: 'healthcare', label: 'Saúde' },
  { value: 'education', label: 'Educação' },
  { value: 'retail', label: 'Varejo' },
  { value: 'manufacturing', label: 'Manufatura' },
  { value: 'consulting', label: 'Consultoria' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'real_estate', label: 'Imobiliário' },
  { value: 'other', label: 'Outros' },
]

const experienceLevelOptions = [
  { value: 'entry', label: 'Júnior (0-2 anos)' },
  { value: 'mid', label: 'Pleno (3-5 anos)' },
  { value: 'senior', label: 'Sênior (6-10 anos)' },
  { value: 'lead', label: 'Lead (10+ anos)' },
  { value: 'executive', label: 'Executivo' },
]

export function ExternalLeadSearchFiltersDialog({
  filters,
  onFiltersChange,
  onClearFilters,
}: ExternalLeadSearchFiltersDialogProps) {
  const [open, setOpen] = useState(false)
  const [localFilters, setLocalFilters] =
    useState<ExternalLeadSearchFilters>(filters)

  const handleApplyFilters = () => {
    onFiltersChange(localFilters)
    setOpen(false)
  }

  const handleClearFilters = () => {
    setLocalFilters({})
    onClearFilters()
    setOpen(false)
  }

  const hasActiveFilters = Object.values(filters).some(Boolean)

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

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Filtros Avançados de Busca</DialogTitle>
          <DialogDescription>
            Configure filtros específicos para buscar leads na base externa
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Localização */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">
              Localização
            </Label>
            <Input
              id="location"
              placeholder="Ex: São Paulo, SP ou Brasil"
              value={localFilters.location || ''}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, location: e.target.value })
              }
            />
            <p className="text-xs text-muted-foreground">
              Cidade, estado ou país para filtrar leads por localização
            </p>
          </div>

          {/* Tamanho da Empresa */}
          <div className="space-y-2">
            <Label htmlFor="company-size" className="text-sm font-medium">
              Tamanho da Empresa
            </Label>
            <Select
              value={localFilters.company_size || ''}
              onValueChange={(value) =>
                setLocalFilters({ ...localFilters, company_size: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar tamanho da empresa" />
              </SelectTrigger>
              <SelectContent>
                {companySizeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Setor */}
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-sm font-medium">
              Setor/Indústria
            </Label>
            <Select
              value={localFilters.industry || ''}
              onValueChange={(value) =>
                setLocalFilters({ ...localFilters, industry: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar setor" />
              </SelectTrigger>
              <SelectContent>
                {industryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Cargo/Função */}
            <div className="space-y-2">
              <Label htmlFor="job-title" className="text-sm font-medium">
                Cargo/Função
              </Label>
              <Input
                id="job-title"
                placeholder="Ex: Desenvolvedor, Gerente..."
                value={localFilters.job_title || ''}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    job_title: e.target.value,
                  })
                }
              />
            </div>

            {/* Nível de Experiência */}
            <div className="space-y-2">
              <Label htmlFor="experience-level" className="text-sm font-medium">
                Nível de Experiência
              </Label>
              <Select
                value={localFilters.experience_level || ''}
                onValueChange={(value) =>
                  setLocalFilters({ ...localFilters, experience_level: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar nível" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevelOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tecnologias/Habilidades */}
          <div className="space-y-2">
            <Label htmlFor="technologies" className="text-sm font-medium">
              Tecnologias/Habilidades
            </Label>
            <Input
              id="technologies"
              placeholder="Ex: React, Node.js, Python..."
              value={localFilters.technologies || ''}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  technologies: e.target.value,
                })
              }
            />
            <p className="text-xs text-muted-foreground">
              Separar múltiplas tecnologias por vírgula
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
