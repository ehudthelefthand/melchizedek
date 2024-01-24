import dayjs from 'dayjs'

export interface TransactionFixOfferingList {
  id: number
  staffName: string
  departmentName: string
  amount: number
  startMonth: dayjs.Dayjs
  dueMonth: dayjs.Dayjs
}
