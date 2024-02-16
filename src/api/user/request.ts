export interface UserLoginRequest {
  username: string
  password: string
}

export interface UserLogoutRequest {
  token: string
}

export interface UserCreateRequest {
  username: string
  password: string
  fullNameTH: string
  fullNameEN: string
  nickName: string
  department: string
  role: string
}