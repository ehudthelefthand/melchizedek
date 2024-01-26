import { useEffect, useState } from 'react'
import { Store, store } from '../store'

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
      localStorage.setItem('username', store.user.username)
      localStorage.setItem('token', store.user.token)
      localStorage.setItem('role', store.user.role)
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
