import { axios } from '../api'
import { UserLoginRequest, UserRegisterRequest } from './request'
import { UserLoginResponse } from './response'

export default {
  login: (userLoginRequest: UserLoginRequest): Promise<UserLoginResponse> => {
    return axios
      .post(`/login`, userLoginRequest)
      .then((response) => response.data)
  },
  logout: () => {
    return axios.delete(`/logout`)
  },
  register: (
    userRegisterRequest: UserRegisterRequest
  ): Promise<UserRegisterRequest> => {
    return axios
      .post(`/register`, userRegisterRequest)
      .then((response) => response.data)
  },
}
