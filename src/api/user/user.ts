import { axios } from "../api"
import { UserLoginRequest, UserLogoutRequest } from './request'
import { UserLoginResponse } from './response'

export default {
    login: (userLoginRequest: UserLoginRequest): Promise<UserLoginResponse> => {
      return axios
        .post(`/login`, userLoginRequest)
        .then((response) => response.data)
    },
    logout: (userLogoutRequest: UserLogoutRequest) => {
      return axios.post(`/logout`, userLogoutRequest)
    },
  }
