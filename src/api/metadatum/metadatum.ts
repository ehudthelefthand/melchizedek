import { axios } from '../api'
import { MetadatumsResponse } from './response'

export default {
    get: async (): Promise<MetadatumsResponse> => {
      return axios
        .get(`metadatums`)
        .then((response) => response.data)
        .catch((err) => {
          console.error(err)
        })  
    },
  }
