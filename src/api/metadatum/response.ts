export interface MetadatumsResponse {
  departments: DepartmentResponse[]
  banks: BankResponse[]
  yfcBanks: YFCBankResponse[]
  staffs: StaffResponse[]
  donors: DonorResponse[]
  projects: ProjectResponse[]
}

export interface BankResponse {
  id: number
  code: string
}

export interface YFCBankResponse {
  id: number
  code: string
}

export interface DepartmentResponse {
  id: number
  name: string
}

export interface DonorResponse {
  id: number
  fullName: string
}

export interface StaffResponse {
  id: number
  nickName: string
  firstName: string
}

export interface ProjectResponse {
  id: number
  name: string
}
