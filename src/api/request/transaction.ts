import { CreateTransactionFixOfferingRequest } from './fixOffering'
import { CreateTransactionGiftOfferingRequest } from './giftOffering'
import { CreateTransactionProjectOfferingRequest } from './projectOffering'

export interface TransactionRequest {
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
  fixOfferings: CreateTransactionFixOfferingRequest[]
  giftOfferings: CreateTransactionGiftOfferingRequest[]
  projectOfferings: CreateTransactionProjectOfferingRequest[]
}

export type CreateTransactionRequest = Omit<TransactionRequest, 'id'>
