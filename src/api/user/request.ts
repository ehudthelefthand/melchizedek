export interface UserLoginRequest {
  username: string
  password: string
}

export interface UserLogoutRequest {
  token: string
}

export interface UserValidate {
  username: string
}

export interface UserCreateRequest {
  username: string
  password: string
  prefix: string
  firstName: string
  lastName: string
  fullNameEN: string
  nickName: string
  department: string
  role: string
}
