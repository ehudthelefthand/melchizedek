export interface UserLoginRequest {
  userName: string
  password: string
  role: string
}

export interface UserLogoutRequest {
  token: string
}

export interface UserRegisterRequest {
  userName: string
  password: string
  department: string
  role: string
}
