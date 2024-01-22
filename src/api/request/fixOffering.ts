export interface TransactionFixOfferingRequest {
  id: number
  staffId: number
  departmentId: number
  amount: number
  startMonth: number
  dueMonth: number
}

export type CreateTransactionFixOfferingRequest = Omit<
  TransactionFixOfferingRequest,
  'id'
>
