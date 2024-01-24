import { TransactionFixOfferingCreateRequest, TransactionFixOfferingUpdateRequest } from './fixOffering'
import { TransactionGiftOfferingCreateRequest, TransactionGiftOfferingUpdateRequest } from './giftOffering'
import { TransactionProjectOfferingCreateRequest, TransactionProjectOfferingUpdateRequest } from './projectOffering'

export interface TransactionUpdateRequest {
  id: number
  donorId: number
  staffId: number
  departmentId: number
  fromBankId: number
  toBankId: number
  amount: number
  transferDate: number
  descriptions: string
  // images: string;
  fixOfferings: TransactionFixOfferingUpdateRequest[]
  giftOfferings: TransactionGiftOfferingUpdateRequest[]
  projectOfferings: TransactionProjectOfferingUpdateRequest[]
}

export type TransactionCreateRequest = Omit<
TransactionUpdateRequest, 
'id' | 'fixOfferings' | 'giftOfferings' | 'projectOfferings'> & {
  fixOfferings: TransactionFixOfferingCreateRequest[]
  giftOfferings: TransactionGiftOfferingCreateRequest[]
  projectOfferings: TransactionProjectOfferingCreateRequest[]
}
