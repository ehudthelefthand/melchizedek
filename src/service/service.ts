import { createContext, useContext, useMemo } from 'react'
import { useCreateReactStoreService } from './reactStore'
import { useCreateMetadatumsService } from './metadatums'
import { api } from '../api/api'

export function useCreateService() {
  const reactStore = useCreateReactStoreService()
  const metadatums = useCreateMetadatumsService()

  const isLoading = useMemo(() => {
    return metadatums.isLoading
  }, [metadatums.isLoading])

  return {
    api,
    reactStore,
    metadatums,
    isLoading,
  }
}

export const ServiceContext = createContext<
  ReturnType<typeof useCreateService>
>(null as any)

// Use
export function useService() {
  return useContext(ServiceContext)
}
