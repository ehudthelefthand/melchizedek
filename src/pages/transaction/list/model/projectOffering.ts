import dayjs from 'dayjs'

export interface TransactionProjectOfferingList {
  id: number
  staffName: string
  departmentName: string
  amount: number
  project: string
  date: dayjs.Dayjs
  descriptions: string
}
