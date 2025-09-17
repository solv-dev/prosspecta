import {
  parseAsBoolean,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs'

export function usePipelinesParams() {
  const [params, setParams] = useQueryStates({
    pipelineId: parseAsString,
    pipelineView: parseAsStringEnum(['default', 'table']),
    createPipeline: parseAsBoolean,
    updatePipeline: parseAsString,
    deletePipeline: parseAsString,
  })

  return {
    ...params,
    setParams,
  }
}
