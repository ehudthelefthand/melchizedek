import dayjs from 'dayjs'

export interface TransactionProjectOfferingList {
  id: number
  staffName: string
  department: string
  amount: number
  project: string
  startDate: dayjs.Dayjs
  dueDate: dayjs.Dayjs
  descriptions: string
}

export interface TransactionProjectOfferingForm {
    id: number
    staffId: number
    departmentId: number
    amount: number
    projectId: number
    startDate: dayjs.Dayjs
    dueDate: dayjs.Dayjs
    descriptions: string
  }

export interface ProjectOfferingFormAntd {
  id: number
  staffId: number
  departmentId: number
  amount: number
  project: string
  date: dayjs.Dayjs
  descriptions: string
}
