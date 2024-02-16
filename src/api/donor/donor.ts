import { axios } from '../api'
import { PageRequest } from './../../constants/api'
import { PageDonorResponse } from './response'

export default {
  getAll: (pageRequest: PageRequest): Promise<PageDonorResponse> => {
    const { currentPage, itemsPerPage } = pageRequest
    return axios
      .get(`/donors?currentPage=${currentPage}&itemsPerPage${itemsPerPage}`)
      .then((response) => response.data)
  },
  importFile: (form: FormData) => {
    return axios.post(`donor/import`, form).then((response) => response.data)
  },
  // TODO: Create API

  //   create: (donorCreate : DonorCreateRequest)=>{
  //     return
  //   }
}
