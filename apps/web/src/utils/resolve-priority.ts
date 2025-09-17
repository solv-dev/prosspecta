import { PipelinePriority as Priority } from '@prosspecta/codegen'

export function resolvePriority(priority: Priority) {
  switch (priority) {
    case Priority.Low:
      return 'Baixa'
    case Priority.Medium:
      return 'Média'
    case Priority.High:
      return 'Alta'
    default:
      return 'Baixa'
  }
}
