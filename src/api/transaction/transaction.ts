import { PageTransactionRequest } from './../../constants/api'
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
import { EvidenceDeleteRequest } from './request/image'
import { PageTransactionReportResponse } from './response/report'
import { TransactionReportRequest } from './request/report'

export default {
  getOne: (id: number): Promise<TransactionResponse> => {
    return axios.get(`/transactions/${id}`).then((response) => response.data)
  },
  getAll: (
    store: Store,
    pageRequest: PageTransactionRequest
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
    return axios.post(`/report/create`, month)
  },
  getReports: (
    store: Store,
    pageRequest: PageTransactionRequest
  ): Promise<PageTransactionReportResponse> => {
    const { currentPage, itemsPerPage } = pageRequest
    return axios
      .get(
        `${store.user?.role}/reports?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
      )
      .then((response) => response.data)
  },
  getLinkReport: (fileName: string): Promise<string> => {
    return axios
      .get(`/report/${fileName}`, {
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${fileName}.xlsx`)
        document.body.appendChild(link)
        link.click()
        link.removeChild(link)

        return response.data
      })
  },
}
