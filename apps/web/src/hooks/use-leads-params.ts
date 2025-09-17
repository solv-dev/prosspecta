import { parseAsBoolean, parseAsString, useQueryStates } from 'nuqs'

export function useLeadsParams() {
  const [params, setParams] = useQueryStates({
    leadId: parseAsString,
    createLead: parseAsBoolean,
    updateLead: parseAsString,
    deleteLead: parseAsString,
  })

  return {
    ...params,
    setParams,
  }
}
