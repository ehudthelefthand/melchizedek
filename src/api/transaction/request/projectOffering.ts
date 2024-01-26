export interface TransactionProjectOfferingUpdateRequest {
  id: number | null
  staffId: number
  departmentId: number
  projectId: number
  amount: number
  date: number
  descriptions: string
  transactionId: number
}

export type TransactionProjectOfferingCreateRequest = Omit<
  TransactionProjectOfferingUpdateRequest,
  'id' | 'transactionId'
>
