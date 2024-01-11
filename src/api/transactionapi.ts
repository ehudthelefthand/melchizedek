export interface TransactionAPI {
  id: number
  donorName: string
  staffName: string
  department: string
  fromBank: string
  toBank: string
  amount: number
  transferDate: string
  descriptions: string
  createAt: string
  // images: string;
  offerings: OfferingAPI[]
}
export interface ToStringTransaction {
  id: number
  donorName: string
  staffName: string
  department: string
  fromBank: string
  toBank: string
  amount: string
  transferDate: string
  descriptions: string
  createAt: string
  // images: string;
  offerings: OfferingAPI[]
}

// TODO: เปลี่ยนชื่อ ทุกอย่าง OfferingAPI
export type OfferingAPI = {
  id: number
  staffName: string
  department: string
  kind: string
  amount: number
  projectName: string
  startDate: string
  dueDate: string
  descriptions: string
}

export type CreateTransactions = Omit<
  TransactionAPI,
  'id' | 'createAt' | 'offering'
>

export interface PageTransaction {
  data: {
    data: TransactionAPI[]
    page: number
    totalPage: number
    totalItems: number
    itemPerPage: number
  }
}
