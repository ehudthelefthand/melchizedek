import {
  StaffResponse,
  DepartmentResponse,
  ProjectResponse,
} from '../../../../api/metadatum/response'
import dayjs from 'dayjs'

export interface TransactionProjectOfferingForm {
  id: number | null
  staff: StaffResponse
  department: DepartmentResponse
  project: ProjectResponse
  amount: number
  startDate: dayjs.Dayjs
  dueDate: dayjs.Dayjs
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
