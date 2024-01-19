export interface Users {
  id: number
  fullName: string
  userName: string
  password: string
  department: string
  role: string
}

export interface TokenUser {
  token: string
  user: {
    department: string
    fullname: string
    role: string
  }
}

export type SignIn = Omit<Users, 'id' | 'fullName' | 'department' | 'role'>
export type UserInfo = Omit<Users, 'id' | 'password' | 'username' | 'userName'>

export interface BankAPI {
  id: number
  code: string
}

export interface DepartmentAPI {
  id: number
  name: string
}

export interface DonorAPI {
  id: number
  fullName: string
}

export interface StaffAPI {
  id: number
  fullName: string
}

export interface ProjectAPI {
  id: number
  name: string
}

export interface MetadatumAPI {
  departments: DepartmentAPI[]
  banks: BankAPI[]
  staffs: StaffAPI[]
  donors: DonorAPI[]
  projects: ProjectAPI[]
}
