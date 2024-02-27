import {
  TransactionFixOfferingCreateRequest,
  TransactionFixOfferingUpdateRequest,
} from './fixOffering'
import {
  TransactionGiftOfferingCreateRequest,
  TransactionGiftOfferingUpdateRequest,
} from './giftOffering'
import {
  TransactionProjectOfferingCreateRequest,
  TransactionProjectOfferingUpdateRequest,
} from './projectOffering'

export interface TransactionUpdateRequest {
  id: number
  donorId: number
  staffId: number
  departmentId: number
  bankId: number
  yfcBankId: number
  amount: number
  transferDate: number
  descriptions: string
  images: File[]
  fixOfferings: TransactionFixOfferingUpdateRequest[]
  giftOfferings: TransactionGiftOfferingUpdateRequest[]
  projectOfferings: TransactionProjectOfferingUpdateRequest[]
}

export interface TransactionsDeleteRequest {
  id: number[]
}

export type TransactionCreateRequest = Omit<
  TransactionUpdateRequest,
  'id' | 'fixOfferings' | 'giftOfferings' | 'projectOfferings'
> & {
  fixOfferings: TransactionFixOfferingCreateRequest[]
  giftOfferings: TransactionGiftOfferingCreateRequest[]
  projectOfferings: TransactionProjectOfferingCreateRequest[]
}
