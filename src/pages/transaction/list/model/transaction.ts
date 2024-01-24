import dayjs from 'dayjs'
import { TransactionFixOfferingList } from './fixOffering'
import { TransactionGiftOfferingList } from './giftOffering'
import { TransactionProjectOfferingList } from './projectOffering'

export interface TransactionList {
  id: number
  donorName: string
  amount: string
  transferDate: dayjs.Dayjs
  toBankCode: string
  fromBankCode: string
  staffName: string
  departmentName: string
  descriptions: string
  createAt: dayjs.Dayjs
  // image: string
  fixOfferings: TransactionFixOfferingList[]
  giftOfferings: TransactionGiftOfferingList[]
  projectOfferings: TransactionProjectOfferingList[]
}
