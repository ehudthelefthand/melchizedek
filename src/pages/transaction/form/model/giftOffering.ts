import dayjs from 'dayjs'

export interface TransactionGiftOfferingForm {
  id: number | null
  staffId: number
  departmentId: number
  amount: number
  transferDate: dayjs.Dayjs
}

export interface GiftOfferingFormAntd {
  id: number
  staffId: number
  departmentId: number
  amount: number
  transferDate: dayjs.Dayjs
}
