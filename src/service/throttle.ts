export function throttle(callback: any, delay: number) {
  let isWaiting = false
  return () => {
    if (!isWaiting) {
      isWaiting = true
      callback && callback()
      setTimeout(() => {
        isWaiting = false
      }, delay)
    }
  }
}
