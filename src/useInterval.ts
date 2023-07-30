import { useEffect, useRef } from 'react'

type Callback = () => void

export default function useInterval(callback: Callback, delay: number | null) {
  const callbackRef = useRef<Callback>()

  useEffect(() => {
    callbackRef.current = callback
  })

  useEffect(() => {
    if (!delay) {
      return () => {}
    }

    const interval = setInterval(() => {
      callbackRef.current && callbackRef.current()
    }, delay)

    return () => clearInterval(interval)
  }, [delay])
}
