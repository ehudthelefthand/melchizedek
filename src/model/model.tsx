import dayjs from 'dayjs'

export type TransactionForm = {
  id: number | null
  donorId: number | null
  amount: string
  transferDate: dayjs.Dayjs | null
  toBankId: number | null
  fromBankId: number | null
  staffId: number | null
  departmentId: number | null
  descriptions: string
  createAt: dayjs.Dayjs | null
  // image: string
  fixOfferings: TransactionFixOfferingForm[]
  giftOfferings: TransactionGiftOfferingForm[]
  projectOfferings: TransactionProjectOfferingForm[]
}

export interface TransactionFixOfferingForm {
  id: number
  staffId: number
  departmentId: number
  amount: number
  startMonth: dayjs.Dayjs
  dueMonth: dayjs.Dayjs
}

export interface TransactionGiftOfferingForm {
  id: number
  staffId: number
  departmentId: number
  amount: number
  transferDate: dayjs.Dayjs
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

// For List

export interface TransactionFixOfferingList {
  id: number
  staffName: string
  department: string
  amount: number
  startMonth: dayjs.Dayjs
  dueMonth: dayjs.Dayjs
}

export interface TransactionGiftOfferingList {
  id: number
  staffName: string
  department: string
  amount: number
  transferDate: dayjs.Dayjs
}

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

// For Antd

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
  fixOfferings: TransactionFixOfferingList[]
  giftOfferings: TransactionGiftOfferingList[]
  projectOfferings: TransactionProjectOfferingList[]
}

export interface FixOfferingFormAntd {
  id: number
  staffId: number
  departmentId: number
  amount: string
  months: dayjs.Dayjs[]
}
export interface GiftOfferingFormAntd {
  id: number
  staffId: number
  departmentId: number
  amount: string
  transferDate: dayjs.Dayjs
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
