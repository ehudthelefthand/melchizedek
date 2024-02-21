import { PageRequest } from './../../constants/api'
import { axios } from '../api'
import { UserCreateRequest, UserLoginRequest, UserValidate } from './request'
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
  getAll: (
    pageRequest: PageRequest,
    search?: string | undefined
  ): Promise<PageUserResponse> => {
    return axios
      .get(
        `/users?search=${search ? search : ''}&currentPage=${
          pageRequest.currentPage
        }&itemsPerPage=${pageRequest.itemsPerPage}`
      )
      .then((response) => response.data)
  },
  validate: (username: UserValidate) => {
    return axios
      .post(`/validate/username`, username)
      .then((response) => response.data)
  },
  create: (
    userCreateRequest: UserCreateRequest
  ): Promise<UserCreateRequest> => {
    return axios
      .post(`/user/create`, userCreateRequest)
      .then((response) => response.data)
  },
  delete: (id: string) => {
    return axios.delete(`user/delete/${id}`).then((response) => response.data)
  },

  importFile: (form: FormData) => {
    return axios.post(`/user/import`, form).then((response) => response.data)
  },
}
