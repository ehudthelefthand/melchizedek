export interface Store {
  user: null | {
    username: string
    token: string
  }
}

export const store: Store = {
  user: null,
}

const username = localStorage.getItem('userName')
const token = localStorage.getItem('token')

if (token && username) {
  store.user = {
    username: username,
    token: token,
  }
}
