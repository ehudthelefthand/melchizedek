import axios, { AxiosInstance } from 'axios'

// const baseURL = import.meta.env.VITE_REACT_PUBLIC_CORE_API
// console.log(import.meta.env)
const baseURL = 'http://192.168.1.102:8080'
const apiServices: AxiosInstance = axios.create({
  baseURL,
})

export default apiServices
