import { axios } from '../api'
import {
  PageTransactionResponse,
  TransactionResponse,
} from './response/transaction'
import {
  TransactionCreateRequest,
  TransactionUpdateRequest,
} from './request/transaction'

export default {
  getOne: (id: number): Promise<TransactionResponse> => {
    return axios
      .get(`/transactions/${id}`)
      .then((response) => response.data)
      .catch((err) => console.error(err))
  },
  getAll: (): Promise<PageTransactionResponse> => {
    return axios
      .get(`/transactions`)
      .then((response) => response.data)
      .catch((err) => console.error(err))
  },
  create: (transaction: TransactionCreateRequest) => {
    return axios
      .post(`/transactions`, transaction)
      .then((response) => response.data)
      .catch((err) => console.error(err))
  },
  update: (
    transaction: TransactionUpdateRequest
  ): Promise<TransactionUpdateRequest> => {
    return axios
      .put(`transactions/${transaction.id}`, transaction)
      .then((response) => response.data)
      .catch((err) => console.error(err))
  },
  delete: (id: number): Promise<TransactionUpdateRequest> => {
    return axios
      .delete(`/transactions/${id}`)
      .then((response) => response.data)
      .catch((err) => console.error(err))
  },
}
