import { axios } from '../api'
import { PageRequest } from './../../constants/api'
import { DonorCreateRequest, DonorSearchRequest } from './request'
import { DonorSearchRespones, FilterName, PageDonorResponse } from './response'

export default {
  getAll: async (
    pageRequest: PageRequest,
    search?: string | undefined
  ): Promise<PageDonorResponse> => {
    const { currentPage, itemsPerPage } = pageRequest
    return axios
      .get(
        `/donors?search=${
          search ? search : ''
        }&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
      )
      .then((response) => response.data)
  },
  importFile: (form: FormData) => {
    return axios.post(`donor/import`, form).then((response) => response.data)
  },
  create: (donorCreate: DonorCreateRequest) => {
    return axios
      .post(`donor/create`, donorCreate)
      .then((response) => response.data)
  },
  delete: (id: string) => {
    return axios.delete(`donor/delete/${id}`).then((response) => response.data)
  },
  search: async (
    fullName: DonorSearchRequest
  ): Promise<DonorSearchRespones[]> => {
    return axios
      .post(`donor/filter`, fullName)
      .then((response) => response.data)
  },
  getDonorFilter: (filterName: FilterName): Promise<DonorSearchRespones[]> => {
    return axios
      .post(`/donor/filter`, filterName)
      .then((response) => response.data)
  },
}
