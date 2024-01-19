export interface TransactionAPI {
  id: number
  staffId: number
  staffName: string
  donorId: number
  donorName: string
  departmentId: number
  department: string
  fromBankId: number
  fromBank: string
  toBankId: number
  toBank: string
  amount: number
  transferDate: number
  descriptions: string
  createAt: number
  // images: string;
  fixOfferings: TransactionFixOfferingAPI[]
  giftOfferings: TransactionGiftOfferingAPI[]
  projectOfferings: TransactionProjectOfferingAPI[]
}

export interface TransactionFixOfferingAPI {
  id: number
  staffId: number
  staffName: string
  departmentId: number
  department: string
  amount: number
  startMonth: number
  dueMonth: number
}

export interface TransactionGiftOfferingAPI {
  id: number
  staffId: number
  staffName: string
  departmentId: number
  department: string
  amount: number
  transferDate: number
}

export interface TransactionProjectOfferingAPI {
  id: number
  staffId: number
  staffName: string
  departmentId: number
  department: string
  amount: number
  projectId: number
  project: string
  startDate: number
  dueDate: number
  descriptions: string
}

export interface CreateTransactionAPI {
  donorId: number
  staffId: number
  departmentId: number
  fromBankId: number
  toBankId: number
  amount: number
  transferDate: number
  descriptions: string
  // images: string;
  fixOfferings: CreateTransactionFixOfferingAPI[]
  giftOfferings: CreateTransactionGiftOfferingAPI[]
  projectOfferings: CreateTransactionProjectOfferingAPI[]
}

export interface CreateTransactionFixOfferingAPI {
  staffId: number
  departmentId: number
  amount: number
  startMonth: number
  dueMonth: number
}

export interface CreateTransactionGiftOfferingAPI {
  staffId: number
  departmentId: number
  amount: number
  transferDate: number
}

export interface CreateTransactionProjectOfferingAPI {
  staffId: number
  departmentId: number
  amount: number
  projectId: number
  startDate: number
  dueDate: number
  descriptions: string
}

export interface PageTransactionAPI {
  data: TransactionAPI[]
  page: number
  totalPage: number
  totalItems: number
  itemPerPage: number
}

// Edit

export interface UpdateTransactionAPI {
  id: number
  donorId: number
  staffId: number
  departmentId: number
  fromBankId: number
  toBankId: number
  amount: number
  transferDate: number
  descriptions: string
  // images: string;
  fixOfferings: UpdateTransactionFixOfferingAPI[]
  giftOfferings: UpdateTransactionGiftOfferingAPI[]
  projectOfferings: UpdateTransactionProjectOfferingAPI[]
}

export interface UpdateTransactionFixOfferingAPI {
  id: number
  staffId: number
  departmentId: number
  amount: number
  startMonth: number
  dueMonth: number
}

export interface UpdateTransactionGiftOfferingAPI {
  id: number
  staffId: number
  departmentId: number
  amount: number
  transferDate: number
}

export interface UpdateTransactionProjectOfferingAPI {
  id: number
  staffId: number
  departmentId: number
  amount: number
  projectId: number
  startDate: number
  dueDate: number
  descriptions: string
}
