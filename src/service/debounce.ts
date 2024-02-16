export function debounce(callback: any, delay: number) {
  let timeout: NodeJS.Timeout

  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback && callback()
    }, delay)
  }
}
