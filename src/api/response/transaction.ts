import { TransactionFixOfferingResponse } from './fixOffering'
import { TransactionGiftOfferingResponse } from './giftOffering'
import { TransactionProjectOfferingResponse } from './projectOffering'

export interface TransactionResponse {
  id: number
  staffId: number
  donorId: number
  departmentId: number
  fromBankId: number
  toBankId: number
  amount: number
  transferDate: number
  descriptions: string
  createAt: number
  // images: string;
  fixOfferings: TransactionFixOfferingResponse[]
  giftOfferings: TransactionGiftOfferingResponse[]
  projectOfferings: TransactionProjectOfferingResponse[]
}

export interface PageTransactionResponse {
  data: TransactionResponse[]
  page: number
  totalPage: number
  totalItems: number
  itemPerPage: number
}
