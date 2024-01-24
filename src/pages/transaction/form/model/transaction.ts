import {
  DonorResponse,
  StaffResponse,
  DepartmentResponse,
  BankResponse,
} from '../../../../api/metadatum/response'
import dayjs from 'dayjs'
import { TransactionFixOfferingForm } from './fixOffering'
import { TransactionGiftOfferingForm } from './giftOffering'
import { TransactionProjectOfferingForm } from './projectOffering'

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
  // image: string
  fixOfferings: TransactionFixOfferingForm[]
  giftOfferings: TransactionGiftOfferingForm[]
  projectOfferings: TransactionProjectOfferingForm[]
}
