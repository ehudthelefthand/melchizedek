export interface UserLoginRequest {
  userName: string
  password: string
  role: string
}

export interface UserLogoutRequest {
  token: string
}
