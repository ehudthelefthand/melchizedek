export interface Store {
  user: null | {
    username: string
    token: string
    role: string
  }
}

export const store: Store = {
  user: null,
}

const username = localStorage.getItem('userName')
const token = localStorage.getItem('token')
const role = localStorage.getItem('role')

if (token && username && role) {
  store.user = {
    username: username,
    token: token,
    role: role,
  }
}
