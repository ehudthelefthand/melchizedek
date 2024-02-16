import apiAxios, { AxiosInstance } from 'axios'
import { store } from '../store'
import transaction from './transaction/transaction'
import metadatum from './metadatum/metadatum'
import user from './user/user'
import donor from './donor/donor'

// const baseURL = import.meta.env.VITE_REACT_PUBLIC_CORE_API
// console.log(import.meta.env)
const baseURL = 'http://192.168.1.106:8080'

export const axios: AxiosInstance = apiAxios.create({
  baseURL,
})

axios.interceptors.request.use((config) => {
  if (store.user) {
    config.headers['Authorization'] = 'Bearer ' + store.user.token
  }
  return config
})

export const api = {
  transaction,
  metadatum,
  user,
  donor,
}
