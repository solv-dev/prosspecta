import { parseAsBoolean, parseAsString, useQueryStates } from 'nuqs'

export function useContactsParams() {
  const [params, setParams] = useQueryStates({
    contactId: parseAsString,
    createContact: parseAsBoolean,
    updateContact: parseAsString,
    deleteContact: parseAsString,
  })

  return {
    ...params,
    setParams,
  }
}
