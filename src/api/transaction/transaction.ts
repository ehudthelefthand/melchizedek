import { axios } from '../api'
import {
  PageTransactionResponse,
  TransactionResponse,
} from './response/transaction'
import {
  TransactionCreateRequest,
  TransactionUpdateRequest,
} from './request/transaction'
import { Store } from '../../store'
import { ImageResponse } from './response/image'

export default {
  getOne: (id: number): Promise<TransactionResponse> => {
    return axios.get(`/transactions/${id}`).then((response) => response.data)
  },
  getAll: (store: Store): Promise<PageTransactionResponse> => {
    return axios
      .get(`${store.user?.role}/transactions`)
      .then((response) => response.data)
  },
  create: (transaction: TransactionCreateRequest) => {
    return axios
      .post(`/transactions`, transaction)
      .then((response) => response.data)
  },
  update: (
    transaction: TransactionUpdateRequest
  ): Promise<TransactionUpdateRequest> => {
    return axios
      .put(`transactions/${transaction.id}`, transaction)
      .then((response) => response.data)
  },
  delete: (id: number): Promise<TransactionUpdateRequest> => {
    return axios.delete(`/transactions/${id}`).then((response) => response.data)
  },
  upload: (form: FormData, id: number) => {
    return axios.post(`/uploads/${id}`, form).then((response) => response.data)
  },
  getImage: (imageName: string): Promise<ImageResponse> => {
    return axios.get(`/${imageName}`).then((response) => response.data)
  },
}
