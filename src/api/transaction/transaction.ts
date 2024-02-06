import { axios } from '../api'
import {
  PageTransactionResponse,
  TransactionResponse,
} from './response/transaction'
import {
  TransactionCreateRequest,
  TransactionPageRequest,
  TransactionUpdateRequest,
} from './request/transaction'
import { Store } from '../../store'
import { EvidenceDeleteRequest } from './request/image'
import { PageTransactionReportResponse } from './response/report'
import { TransactionReportRequest } from './request/report'

export default {
  getOne: (id: number): Promise<TransactionResponse> => {
    return axios.get(`/transactions/${id}`).then((response) => response.data)
  },
  getAll: (
    store: Store,
    pageRequest: TransactionPageRequest
  ): Promise<PageTransactionResponse> => {
    const { currentPage, itemsPerPage } = pageRequest
    return axios
      .get(
        `${store.user?.role}/transactions?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
      )
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
  deleteImages: (evidences: EvidenceDeleteRequest) => {
    return axios
      .post(`/deleteImages`, evidences)
      .then((response) => response.data)
  },
  requestReport: (month: TransactionReportRequest) => {
    return axios.post(`/report/downloads`, month)
  },
  getReports: (store: Store): Promise<PageTransactionReportResponse> => {
    return axios
      .get(`${store.user?.role}/reports`)
      .then((response) => response.data)
  },
  // TODO: API DownloadLink
  // getLinkReport: (store: Store, url: string): Promise<string> => {
  //   return axios.get(`${store.user?.role}/report/${url}`)
  // },
}
