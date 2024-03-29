export interface UserLoginResponse {
  token: string
  nickName: string
  username: string
  department: string
  role: string
}

export interface UserResponse {
  id: number
  prefix: string
  firstName: string
  lastName: string
  fullNameEN: string
  nickName: string
  username: string
  password: string
  departmentId: number
  role: string
}

export interface PageUserResponse {
  data: UserResponse[]
  page: number
  totalPage: number
  totalItems: number
  itemPerPage: number
}
