import dayjs from 'dayjs'
import { TransactionFixOfferingForm } from './fixOffering'
import {
  TransactionGiftOfferingForm,
} from './giftOffering'
import {
  TransactionProjectOfferingForm,
} from './projectOffering'
import {
  BankResponse,
  DepartmentResponse,
  DonorResponse,
  StaffResponse,
} from '../../../api/metadatums'

export interface TransactionLists {
  id: number
  donorName: string
  amount: string
  transferDate: string | dayjs.Dayjs
  toBank: string
  fromBank: string
  staffName: string
  department: string
  descriptions: string
  createAt: string | dayjs.Dayjs
  // image: string
  fixOfferings: TransactionFixOfferingForm[]
  giftOfferings: TransactionGiftOfferingForm[]
  projectOfferings: TransactionProjectOfferingForm[]
}

export type TransactionForm = {
  id: number | null
  donor: DonorResponse | null
  staff: StaffResponse | null
  department: DepartmentResponse | null
  toBank: BankResponse | null
  fromBank: BankResponse | null
  amount: string
  descriptions: string
  transferDate: dayjs.Dayjs | null
  createAt: dayjs.Dayjs | null
  // image: string
  fixOfferings: TransactionFixOfferingForm[]
  giftOfferings: TransactionGiftOfferingForm[]
  projectOfferings: TransactionProjectOfferingForm[]
}
