import dayjs from 'dayjs'
import { DepartmentResponse, StaffResponse } from '../../../api/metadatums'

export interface TransactionGiftOfferingForm {
  id: number
  staff: StaffResponse
  department: DepartmentResponse
  amount: number
  transferDate: dayjs.Dayjs
}

export interface GiftOfferingFormAntd {
  id: number
  staffId: number
  departmentId: number
  amount: string
  transferDate: dayjs.Dayjs
}



