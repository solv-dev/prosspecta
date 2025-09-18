'use client'

import {
  IconArrowLeft,
  IconDownload,
  IconSearch,
  IconUsersPlus,
} from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { bulkImportLeads } from '@/app/(dashboard)/leads/actions'
import {
  type ExternalLeadSearchFilters,
  ExternalLeadSearchFiltersDialog,
} from '@/components/dialogs/external-lead-search-filters-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

interface ExternalLead {
  id: string
  name: string
  email: string
  company: string
  job_title: string
  location: string
  industry: string
  company_size: string
  experience_level: string
  technologies: string[]
  linkedin_url?: string
  phone?: string
}

const mockExternalLeads: ExternalLead[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@techcorp.com',
    company: 'TechCorp Brasil',
    job_title: 'Desenvolvedor Full Stack',
    location: 'São Paulo, SP',
    industry: 'Tecnologia',
    company_size: 'Média (51-200)',
    experience_level: 'Pleno (3-5 anos)',
    technologies: ['React', 'Node.js', 'TypeScript'],
    linkedin_url: 'https://linkedin.com/in/joaosilva',
    phone: '+55 11 99999-9999',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@financeplus.com',
    company: 'FinancePlus',
    job_title: 'Gerente de Produto',
    location: 'Rio de Janeiro, RJ',
    industry: 'Financeiro',
    company_size: 'Grande (201-1000)',
    experience_level: 'Sênior (6-10 anos)',
    technologies: ['Fintech', 'Analytics', 'SQL'],
    linkedin_url: 'https://linkedin.com/in/mariasantos',
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro.costa@healthtech.com',
    company: 'HealthTech Solutions',
    job_title: 'CTO',
    location: 'Belo Horizonte, MG',
    industry: 'Saúde',
    company_size: 'Startup (1-10)',
    experience_level: 'Executivo',
    technologies: ['Python', 'AI/ML', 'Healthcare'],
    linkedin_url: 'https://linkedin.com/in/pedrocosta',
    phone: '+55 31 88888-8888',
  },
]

export function ExternalLeadSearchClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<ExternalLeadSearchFilters>({})
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<ExternalLead[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    setHasSearched(true)

    await new Promise(resolve => setTimeout(resolve, 1500))

    let results = mockExternalLeads.filter(
      lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.technologies.some(tech =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )

    if (filters.location) {
      results = results.filter(lead =>
        lead.location.toLowerCase().includes(filters.location!.toLowerCase())
      )
    }

    if (filters.industry) {
      results = results.filter(
        lead => lead.industry.toLowerCase() === filters.industry!.toLowerCase()
      )
    }

    if (filters.company_size) {
      results = results.filter(
        lead => lead.company_size === filters.company_size
      )
    }

    if (filters.job_title) {
      results = results.filter(lead =>
        lead.job_title.toLowerCase().includes(filters.job_title!.toLowerCase())
      )
    }

    if (filters.technologies) {
      const searchTechs = filters.technologies
        .split(',')
        .map(t => t.trim().toLowerCase())
      results = results.filter(lead =>
        searchTechs.some(searchTech =>
          lead.technologies.some(leadTech =>
            leadTech.toLowerCase().includes(searchTech)
          )
        )
      )
    }

    setSearchResults(results)
    setIsSearching(false)
    setSelectedLeads([])
  }

  const handleSelectLead = (leadId: string) => {
    setSelectedLeads(prev =>
      prev.includes(leadId)
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    )
  }

  const handleSelectAll = () => {
    if (selectedLeads.length === searchResults.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(searchResults.map(lead => lead.id))
    }
  }

  const handleImportSelected = async () => {
    const selectedLeadsData = searchResults.filter(lead =>
      selectedLeads.includes(lead.id)
    )

    if (selectedLeadsData.length === 0) {
      toast.error('Nenhum lead selecionado para importação')
      return
    }

    setIsImporting(true)

    try {
      const results = await bulkImportLeads(selectedLeadsData)

      const successCount = results.filter(r => r.success).length
      const errorCount = results.filter(r => !r.success).length

      if (errorCount === 0) {
        toast.success(`${successCount} leads importados com sucesso!`)
      } else if (successCount === 0) {
        toast.error(`Erro ao importar leads. ${errorCount} falhas.`)
      } else {
        toast.warning(
          `${successCount} leads importados com sucesso. ${errorCount} falhas.`
        )
      }

      setSelectedLeads([])
    } catch (error) {
      console.error('Erro na importação:', error)
      toast.error('Erro inesperado ao importar leads')
    } finally {
      setIsImporting(false)
    }
  }

  const clearFilters = () => {
    setFilters({})
  }

  const hasActiveFilters = Object.values(filters).some(Boolean)

  return (
    <div className='flex flex-col w-full h-full gap-6'>
      <div className='flex items-center gap-4'>
        <Link href='/leads'>
          <Button variant='ghost' size='sm' className='gap-2'>
            <IconArrowLeft className='size-4' />
            Voltar
          </Button>
        </Link>
        <div className='flex flex-col'>
          <Label className='text-[22px] font-semibold'>
            Buscar Leads Externos
          </Label>
          <Label className='text-sm font-light text-muted-foreground'>
            Encontre novos leads em bases de dados externas
          </Label>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Busca por Palavras-chave</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex gap-2'>
            <div className='flex-1'>
              <Input
                placeholder='Digite palavras-chave: nome, empresa, cargo, tecnologias...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className='text-base'
              />
            </div>
            <ExternalLeadSearchFiltersDialog
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
            >
              <IconSearch className='size-4' />
              {isSearching ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>

          {hasActiveFilters && (
            <div className='flex items-center gap-2 text-sm'>
              <span className='text-muted-foreground'>Filtros ativos:</span>
              {Object.entries(filters).map(
                ([key, value]) =>
                  value && (
                    <Badge key={key} variant='secondary' className='text-xs'>
                      {key}: {value}
                    </Badge>
                  )
              )}
              <Button
                variant='ghost'
                size='sm'
                onClick={clearFilters}
                className='h-auto p-1 text-primary hover:text-primary'
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {hasSearched && (
        <Card className='flex-1'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle className='text-lg'>Resultados da Busca</CardTitle>
                <p className='text-sm text-muted-foreground mt-1'>
                  {searchResults.length} leads encontrados
                </p>
              </div>

              {searchResults.length > 0 && (
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={handleSelectAll}
                    className='gap-2'
                  >
                    <Checkbox
                      checked={selectedLeads.length === searchResults.length}
                      className='data-[state=checked]:bg-primary'
                    />
                    Selecionar Todos
                  </Button>

                  {selectedLeads.length > 0 && (
                    <>
                      <Button variant='outline' size='sm' className='gap-2'>
                        <IconDownload className='size-4' />
                        Exportar ({selectedLeads.length})
                      </Button>
                      <Button
                        size='sm'
                        onClick={handleImportSelected}
                        disabled={isImporting}
                        className='gap-2'
                      >
                        <IconUsersPlus className='size-4' />
                        {isImporting
                          ? 'Importando...'
                          : `Importar (${selectedLeads.length})`}
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent>
            {isSearching ? (
              <div className='flex items-center justify-center py-12'>
                <div className='flex items-center gap-3'>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-primary'></div>
                  <span>Buscando leads na base externa...</span>
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className='text-center py-12'>
                <p className='text-muted-foreground'>
                  Nenhum lead encontrado com os critérios especificados.
                </p>
                <p className='text-sm text-muted-foreground mt-2'>
                  Tente ajustar sua busca ou filtros.
                </p>
              </div>
            ) : (
              <div className='space-y-4'>
                {searchResults.map(lead => (
                  <Card key={lead.id} className='border border-border/50'>
                    <CardContent className='p-4'>
                      <div className='flex items-start gap-4'>
                        <Checkbox
                          checked={selectedLeads.includes(lead.id)}
                          onCheckedChange={() => handleSelectLead(lead.id)}
                          className='mt-1'
                        />

                        <div className='flex-1 space-y-3'>
                          <div className='flex items-start justify-between'>
                            <div>
                              <h3 className='font-semibold text-lg'>
                                {lead.name}
                              </h3>
                              <p className='text-sm text-muted-foreground'>
                                {lead.job_title} • {lead.company}
                              </p>
                            </div>
                            <div className='text-right text-sm text-muted-foreground'>
                              <p>{lead.location}</p>
                              <p>{lead.industry}</p>
                            </div>
                          </div>

                          <Separator />

                          <div className='grid grid-cols-2 gap-4 text-sm'>
                            <div>
                              <Label className='text-xs text-muted-foreground'>
                                Contato
                              </Label>
                              <p>{lead.email}</p>
                              {lead.phone && <p>{lead.phone}</p>}
                            </div>
                            <div>
                              <Label className='text-xs text-muted-foreground'>
                                Experiência
                              </Label>
                              <p>{lead.experience_level}</p>
                              <p className='text-muted-foreground'>
                                {lead.company_size}
                              </p>
                            </div>
                          </div>

                          <div>
                            <Label className='text-xs text-muted-foreground'>
                              Tecnologias/Habilidades
                            </Label>
                            <div className='flex flex-wrap gap-1 mt-1'>
                              {lead.technologies.map(tech => (
                                <Badge
                                  key={tech}
                                  variant='outline'
                                  className='text-xs'
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {lead.linkedin_url && (
                            <div>
                              <a
                                href={lead.linkedin_url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-sm text-primary hover:underline'
                              >
                                Ver perfil no LinkedIn →
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
