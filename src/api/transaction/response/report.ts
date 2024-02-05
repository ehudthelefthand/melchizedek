export interface TransactionReportResponse {
  id: number
  fileName: string
  status: string
}

export interface PageTransactionReportResponse {
  data: TransactionReportResponse[]
  page: number
  totalPage: number
  totalItems: number
  itemPerPage: number
}
