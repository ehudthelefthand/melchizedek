export enum STATUS {
  success = 'success',
  processing = 'processing',
  error = 'error',
}

export interface PageTransactionRequest {
  currentPage: number
  itemsPerPage: number
}

export const initialPagination = {
  currentPage: 1,
  itemsPerPage: 20,
  totalItems: 0,
}
