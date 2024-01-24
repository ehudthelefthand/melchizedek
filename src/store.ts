export interface Store {
  user: null | {
    username: string
    token: string
  }
}

export const store: Store = {
  user: null,
}

const token = localStorage.getItem('token')
if (token) {
  store.user = {
    username: '',
    token: token,
  }
}
