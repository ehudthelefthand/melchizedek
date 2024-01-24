export interface TransactionGiftOfferingUpdateRequest {
  id: number | null
  staffId: number
  departmentId: number
  amount: number
  transferDate: number
}

export type TransactionGiftOfferingCreateRequest = Omit<
TransactionGiftOfferingUpdateRequest,
  'id'
>
