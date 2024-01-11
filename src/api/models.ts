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

export interface Banks {
  id: number
  code: string
}

export interface Department {
  id: number
  name: string
}

export interface Donor {
  id: number
  fullname: string
}

export interface Staff {
  id: number
  fullname: string
}

export interface ProjectName {
  id: number
  name: string
}

export interface Metadatum {
  data: {
    Department: Department[]
    Bank: Banks[]
    Staff: Staff[]
    Donor: Donor[]
    ProjectName: ProjectName[]
  }
}

export interface Offering {
  id: number
  staffName: string
  department: string
  kind: string
  amount: number
  projectName: string
  startDate: string
  dueDate: string
  descriptions: string
  // transactionid: number
}

export type CreateOffering = Omit<Offering, 'id'>
