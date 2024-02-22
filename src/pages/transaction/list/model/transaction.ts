import dayjs from 'dayjs'
import { TransactionFixOfferingList } from './fixOffering'
import { TransactionGiftOfferingList } from './giftOffering'
import { TransactionProjectOfferingList } from './projectOffering'

export interface TransactionList {
  id: number
  donorName: string
  amount: string
  transferDate: dayjs.Dayjs
  yfcBankCode: string
  bankCode: string
  staffName: string
  departmentName: string
  descriptions: string
  createAt: dayjs.Dayjs
  images: string[]
  fixOfferings: TransactionFixOfferingList[]
  giftOfferings: TransactionGiftOfferingList[]
  projectOfferings: TransactionProjectOfferingList[]
  totalOfferings: TotalOfferingsList
}

export interface TotalOfferingsList {
  sumFixOfferings: number
  sumGiftOfferings: number
  sumProjectOfferings: number
}
