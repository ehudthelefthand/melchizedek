import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import createTransactionAPI from '../api/transaction'
import axios, { AxiosInstance } from 'axios'

export interface Store {
  user: {
    username: string
    token: string
  } | null
}

// const baseURL = import.meta.env.VITE_REACT_PUBLIC_CORE_API
// console.log(import.meta.env)
const baseURL = 'http://192.168.1.125:8080'
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
})

export function useCreateService() {
  const [store, setStore] = useState<Store>({
    user: null,
  })

  const api = useMemo(() => {
    return { transaction: createTransactionAPI(store, axiosInstance) }
  }, [store])

  useEffect(() => {
    if (store.user) {
      localStorage.setItem('token', store.user.token)
    } else {
      localStorage.removeItem('token')
    }

    const interceptorId = axiosInstance.interceptors.request.use((config) => {
        if(store.user) {
            config.headers['Authorization'] = 'Bearer' + store.user.token
        }
      return config
    })

    return () => {
        axiosInstance.interceptors.request.eject(interceptorId)
    }
    
  }, [store])

  return {
    store: {
      data: store,
      set: setStore,
    },
    api: api,
  }
}

export const ServiceContext = createContext<ReturnType<typeof useCreateService>>(null as any)

// Use
export function useService() {
  return useContext(ServiceContext)
}
