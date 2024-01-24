import dayjs from 'dayjs'

export interface TransactionGiftOfferingList {
  id: number
  staffName: string
  departmentName: string
  amount: number
  transferDate: dayjs.Dayjs
}
