import apiServices from './axiosapi'
import {
  CreateTransactionAPI,
  PageTransactionAPI,
  TransactionAPI,
  UpdateTransactionAPI,
} from './transactionapi'

import { MetadatumAPI, SignIn, TokenUser } from './models'

const API = {
  async userLogIn(user: SignIn): Promise<TokenUser> {
    console.log('entries login')
    const json = JSON.stringify(user)
    const response = await apiServices.post('/login', json, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  },

  async getTranactions(): Promise<PageTransactionAPI> {
    const token = localStorage.getItem('token')
    const response = await apiServices.get('/transactions', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    if (response.status != 200) {
      console.log('not entry status != 200', response.status)
    }
    return response.data
  },

  async getTransactionByID(id: string): Promise<TransactionAPI> {
    const token = localStorage.getItem('token')
    const response = await apiServices.get(`/transactions/${id}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    if (response.status != 200) {
      console.log('not entry status != 200', response.status)
    }
    return response.data
  },

  async createTransaction(transaction: CreateTransactionAPI) {
    const token = localStorage.getItem('token')
    const json = JSON.stringify(transaction)
    await apiServices.post('/transactions', json, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
  },

  async updateTransaction(transaction: UpdateTransactionAPI, id: number) {
    const token = localStorage.getItem('token')
    const json = JSON.stringify(transaction)
    apiServices.put(`/transactions/${id}`, json, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
  },
  async deleteTransactionByID(id: number) {
    const token = localStorage.getItem('token')
    apiServices
      .delete(`/transactions/${id}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(() => {
        console.log('delete transaction id', id)
      })
  },

  // getOffering(): Promise<any> {
  //   return new Promise<any>((resolve) => {
  //     apiServices.get('/offerings').then((response: AxiosResponse) => {
  //       resolve(response.data)
  //     })
  //   })
  // },

  // updateOffering(offering: Offering) {
  //   return new Promise<void>((resolve) => {
  //     setTimeout(() => {
  //       const foundIndex = offerings.findIndex(
  //         (value) => value.ID === offering.ID
  //       )
  //       if (foundIndex !== -1) {
  //         offerings[foundIndex] = offering
  //       }
  //       resolve(console.log('offering update'))
  //     }, 1000)
  //   })
  // },
  async getMetadatum(): Promise<MetadatumAPI> {
    const token = localStorage.getItem('token')
    const response = await apiServices.get('/metadatums', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return response.data
  },
}

export default API
