import dayjs from 'dayjs'
import {
  DepartmentResponse,
  StaffResponse,
} from '../../../../api/metadatum/response'

export interface TransactionFixOfferingForm {
  id: number | null
  staff: StaffResponse
  department: DepartmentResponse
  amount: number
  startMonth: dayjs.Dayjs
  dueMonth: dayjs.Dayjs
}

export interface FixOfferingFormAntd {
  id: number
  staffId: number
  departmentId: number
  amount: string
  months: dayjs.Dayjs[]
}