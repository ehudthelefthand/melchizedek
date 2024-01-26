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
}
