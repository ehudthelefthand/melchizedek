import { 
    StaffResponse,
    DepartmentResponse
 } from "../../../../api/metadatum/response"

import dayjs from "dayjs"

export interface TransactionGiftOfferingForm {
    id: number | null
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