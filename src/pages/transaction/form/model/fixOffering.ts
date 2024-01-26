import dayjs from 'dayjs'

export interface TransactionFixOfferingForm {
  id: number | null
  staffId: number
  departmentId: number
  amount: number
  startMonth: dayjs.Dayjs
  dueMonth: dayjs.Dayjs
}

export interface FixOfferingFormAntd {
  id: number
  staffId: number
  departmentId: number
  amount: number
  months: dayjs.Dayjs[]
}
