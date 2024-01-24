import dayjs from 'dayjs'

export interface TransactionProjectOfferingList {
  id: number
  staffName: string
  departmentName: string
  amount: number
  project: string
  startDate: dayjs.Dayjs
  dueDate: dayjs.Dayjs
  descriptions: string
}
