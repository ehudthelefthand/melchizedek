import dayjs from 'dayjs'
import { TransactionFixOfferingForm } from './fixOffering'
import { TransactionGiftOfferingForm } from './giftOffering'
import { TransactionProjectOfferingForm } from './projectOffering'

export type TransactionForm = {
  id: number | null
  donorId: number | null
  staffId: number | null
  departmentId: number | null
  toBankId: number | null
  fromBankId: number | null
  amount: string
  descriptions: string
  transferDate: dayjs.Dayjs | null
  images: File[]
  imagesName: string[]
  newImages?: File[]
  imagesDelete?: string[]
  fixOfferings: TransactionFixOfferingForm[]
  giftOfferings: TransactionGiftOfferingForm[]
  projectOfferings: TransactionProjectOfferingForm[]
}
