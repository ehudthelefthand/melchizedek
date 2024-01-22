export interface MetadatumsResponse {
  departments: DepartmentResponse[]
  banks: BankResponse[]
  staffs: StaffResponse[]
  donors: DonorResponse[]
  projects: ProjectResponse[]
}

export interface BankResponse {
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
  fullName: string
}

export interface ProjectResponse {
  id: number
  name: string
}
