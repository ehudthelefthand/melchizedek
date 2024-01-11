import apiServices from './axiosapi'
import {
  CreateTransactions,
  PageTransaction,
  TransactionAPI,
} from './transactionapi'

import { CreateOffering, Metadatum, SignIn, TokenUser } from './models'

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

  async getTranactions(): Promise<PageTransaction> {
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

  async getTransactionByID(id: string): Promise<{ data: TransactionAPI }> {
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
  async createTransaction(transaction: CreateTransactions) {
    const token = localStorage.getItem('token')
    const json = JSON.stringify(transaction)
    await apiServices.post('/transactions', json, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
  },
  updateTransaction(transaction: CreateTransactions, id: number) {
    const token = localStorage.getItem('token')
    const json = JSON.stringify(transaction)
    apiServices.put(`/transactions/${id}`, json, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
  },
  deleteTransactionByID(id: number) {
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
  createOffering(offering: CreateOffering[]) {
    const token = localStorage.getItem('token')
    const json = JSON.stringify(offering)
    apiServices.post('/offerings', json, {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
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
  async getMetadatum(): Promise<Metadatum> {
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
