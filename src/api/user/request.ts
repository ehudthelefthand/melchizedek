export interface UserLoginRequest {
    userName: string
    password: string
  }

export interface UserLogoutRequest {
    token: string
}