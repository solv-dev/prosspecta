import { PipelineStatus } from '@prosspecta/codegen'

export function resolvePipelineStatus(status: PipelineStatus) {
  switch (status) {
    case PipelineStatus.New:
      return 'Novo'
    case PipelineStatus.Contacted:
      return 'Contatado'
    case PipelineStatus.Qualified:
      return 'Qualificado'
    case PipelineStatus.Proposal:
      return 'Proposta'
    case PipelineStatus.Canceled:
      return 'Cancelado'
    default:
      return 'Desconhecido'
  }
}
