export interface TransactionGiftOfferingUpdateRequest {
  id: number | null
  staffId: number
  departmentId: number
  amount: number
  transferDate: number
  transactionId: number
}

export type TransactionGiftOfferingCreateRequest = Omit<
  TransactionGiftOfferingUpdateRequest,
  'id' | 'transactionId'
>
