import dayjs from 'dayjs'

export type TransactionForm = {
  id: number
  donorName: string
  amount: string
  transferDate: dayjs.Dayjs
  toBank: string
  fromBank: string
  staffName: string
  department: string
  descriptions: string
  createAt: dayjs.Dayjs
  // image: string
  offerings: TransactionOfferingForm[]
}

export type TransactionOfferingForm = {
  id: number
  staffName: string
  department: string
  kind: string
  amount: string
  projectName: string
  startDate: dayjs.Dayjs
  dueDate: dayjs.Dayjs
  descriptions: string
}

export type ModelOfferingAntd = {
  id: number
  staffName: string
  department: string
  kind: string
  amount: string
  projectName: string
  startDate: string
  dueDate: string
  descriptions: string
  date: dayjs.Dayjs[]
}

export type ProjectOffering = Omit<ModelOfferingAntd, 'id' | 'dueDate' | 'date'>
export type FixOffering = Omit<
  ModelOfferingAntd,
  'projectName' | 'descriptions' | 'startDate' | 'dueDate'
>
export type GiftOffering = Omit<
  ModelOfferingAntd,
  'projectName' | 'descriptions' | 'startDate' | 'dueDate' | 'date'
>
