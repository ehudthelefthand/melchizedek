import { CreateTransactionRequest } from './request/transaction'
import { LoginRequest } from './request/user'
import { LoginResponse } from './response/user'
import { PageTransactionResponse, TransactionResponse } from './response/transaction'
import { MetadatumsResponse } from './metadatums'
import apiServices from './axiosAPI'

const API = {
  async userLogIn(user: LoginRequest): Promise<LoginResponse> {
    console.log('entries login')
    const json = JSON.stringify(user)
    const response = await apiServices.post('/login', json, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  },

  async getTranactions(): Promise<PageTransactionResponse> {
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

  async getTransactionByID(id: string): Promise<TransactionResponse> {
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

  async createTransaction(transaction: CreateTransactionRequest) {
    const token = localStorage.getItem('token')
    // const json = JSON.stringify(transaction)
    await apiServices.post('/transactions', transaction, {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
  },

  async updateTransaction(transaction: CreateTransactionRequest, id: number) {
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

  async getMetadatum(): Promise<MetadatumsResponse> {
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
