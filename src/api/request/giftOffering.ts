export interface TransactionGiftOfferingRequest {
  id: number
  staffId: number
  departmentId: number
  amount: number
  transferDate: number
}

export type CreateTransactionGiftOfferingRequest = Omit<
  TransactionGiftOfferingRequest,
  'id'
>
