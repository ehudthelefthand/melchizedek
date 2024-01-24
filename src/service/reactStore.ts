import { useEffect, useState } from 'react'
import { Store, store } from '../store'

export function useCreateReactStoreService() {
  const [_reactStore, setReactStore] = useState<Store>(store)

  const refresh = () => {
    setReactStore({ ...store })
  }

  const update = (process: (store: Store) => void) => {
    process(store)
    refresh()
  }

  useEffect(() => {
    if (store.user !== null) {
      localStorage.setItem('token', store.user.token)
    } else {
      localStorage.removeItem('token')
    }
  }, [store])

  return {
    store,
    refresh,
    update,
  }
}
