import { LeadStatus } from '@prosspecta/codegen'

export function resolveLeadStatus(status: LeadStatus) {
  switch (status) {
    case LeadStatus.New:
      return 'Novo'
    case LeadStatus.Contacted:
      return 'Contatado'
    case LeadStatus.Qualified:
      return 'Qualificado'
    case LeadStatus.Won:
      return 'Fechado'
    case LeadStatus.Lost:
      return 'Perdido'
    case LeadStatus.Discarded:
      return 'Descartado'
    default:
      return 'Desconhecido'
  }
}
