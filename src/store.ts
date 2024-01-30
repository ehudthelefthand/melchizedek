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

export const LOCAL_STORAGE_USER_NAME_KEY = 'username'
export const LOCAL_STORAGE_TOKEN_KEY = 'token'
export const LOCAL_STORAGE_ROLE_KEY = 'role'

const username = localStorage.getItem(LOCAL_STORAGE_USER_NAME_KEY)
const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
const role = localStorage.getItem(LOCAL_STORAGE_ROLE_KEY)

if (token && username && role) {
  store.user = {
    username: username,
    token: token,
    role: role,
  }
}
