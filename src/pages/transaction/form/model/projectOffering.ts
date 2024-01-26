import dayjs from 'dayjs'

export interface TransactionProjectOfferingForm {
  id: number | null
  staffId: number
  departmentId: number
  projectId: number
  amount: number
  date: dayjs.Dayjs
  descriptions: string
}

export interface ProjectOfferingFormAntd {
  id: number
  staffId: number
  departmentId: number
  projectId: number
  amount: number
  date: dayjs.Dayjs
  descriptions: string
}
