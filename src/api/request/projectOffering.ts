export interface TransactionProjectOfferingRequest {
  id: number
  staffId: number
  departmentId: number
  projectId: number
  amount: number
  startDate: number
  dueDate: number
  descriptions: string
}

export type CreateTransactionProjectOfferingRequest = Omit<
  TransactionProjectOfferingRequest,
  'id'
>
