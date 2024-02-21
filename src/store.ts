export interface Store {
  user: null | {
    username: string
    token: string
    role: string
    nickName: string
  }
}

export const store: Store = {
  user: null,
}

export const LOCAL_STORAGE_USER_NAME_KEY = 'username'
export const LOCAL_STORAGE_TOKEN_KEY = 'token'
export const LOCAL_STORAGE_ROLE_KEY = 'role'
export const LOCAL_STORAGE_NICKNAME_Key = 'nickName'

const username = localStorage.getItem(LOCAL_STORAGE_USER_NAME_KEY)
const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
const role = localStorage.getItem(LOCAL_STORAGE_ROLE_KEY)
const nickName = localStorage.getItem(LOCAL_STORAGE_NICKNAME_Key)

if (token && username && role && nickName) {
  store.user = {
    username: username,
    token: token,
    role: role,
    nickName: nickName,
  }
}
