export interface TransactionFixOfferingUpdateRequest {
  id: number | null
  staffId: number
  departmentId: number
  amount: number
  startMonth: number
  dueMonth: number
  transactionId: number
}

export type TransactionFixOfferingCreateRequest = Omit<
TransactionFixOfferingUpdateRequest,
  'id' | 'transactionId'
>
