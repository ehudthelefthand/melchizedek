import { PageRequest } from './../../constants/api'
import { axios } from '../api'
import { UserCreateRequest, UserLoginRequest } from './request'
import { PageUserResponse, UserLoginResponse } from './response'

export default {
  login: (userLoginRequest: UserLoginRequest): Promise<UserLoginResponse> => {
    return axios
      .post(`/login`, userLoginRequest)
      .then((response) => response.data)
  },
  logout: () => {
    return axios.delete(`/logout`)
  },
  getAll: (pageRequest: PageRequest): Promise<PageUserResponse> => {
    return axios
      .get(
        `/users?currentPage=${pageRequest.currentPage}&itemsPerPage=${pageRequest.itemsPerPage}`
      )
      .then((response) => response.data)
  },
  validate: (username: string) => {
    return axios
      .post(`/validate/username`, username)
      .then((response) => response.data)
  },
  create: (
    userCreateRequest: UserCreateRequest
  ): Promise<UserCreateRequest> => {
    return axios
      .post(`/createUser`, userCreateRequest)
      .then((response) => response.data)
  },
  importFile: (form: FormData) => {
    return axios.post(`/user/import`, form).then((response) => response.data)
  },
}
