export interface TransactionProjectOfferingUpdateRequest {
  id: number | null
  staffId: number
  departmentId: number
  projectId: number
  amount: number
  startDate: number
  dueDate: number
  descriptions: string
}

export type TransactionProjectOfferingCreateRequest = Omit<
  TransactionProjectOfferingUpdateRequest,
  'id'
>
