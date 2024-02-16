import { useEffect } from 'react'

const useDebouncing = (callback: () => void, delay: number = 500) => {
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      callback && callback()
    }, delay)

    return () => clearTimeout(timeoutID)
  }, [callback, delay])
}

export default useDebouncing
