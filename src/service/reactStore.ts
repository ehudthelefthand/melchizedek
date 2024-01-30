import { useEffect, useState } from 'react'
import {
  LOCAL_STORAGE_ROLE_KEY,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USER_NAME_KEY,
  Store,
  store,
} from '../store'

export function useCreateReactStoreService() {
  const [reactStore, setReactStore] = useState<Store>(store)

  const refresh = () => {
    setReactStore({ ...store })
  }

  const update = (process: (store: Store) => void) => {
    process(store)
    refresh()
  }

  useEffect(() => {
    if (store.user !== null) {
      localStorage.setItem(LOCAL_STORAGE_USER_NAME_KEY, store.user.username)
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, store.user.token)
      localStorage.setItem(LOCAL_STORAGE_ROLE_KEY, store.user.role)
    } else {
      localStorage.clear()
    }
  }, [reactStore])

  return {
    store,
    refresh,
    update,
  }
}
