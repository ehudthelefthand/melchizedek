export interface UserLoginResponse {
  token: string
  username: string
  department: string
  role: string
}

export interface UserResponse {
  id: number
  fullNameTH: string
  fullNameEN: string
  nickName: string
  username: string
  password: string
  role: string
}

export interface PageUserResponse {
  data: UserResponse[]
  page: number
  totalPage: number
  totalItems: number
  itemPerPage: number
}
