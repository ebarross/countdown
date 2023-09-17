import { useCallback, useState } from 'react'
import Clock from './Clock'
import useInterval from '../useInterval'

function getRemainingSeconds(expiry: Date) {
  const now = new Date().getTime()
  const milliSecondsDistance = expiry.getTime() - now

  if (milliSecondsDistance > 0) {
    return milliSecondsDistance / 1000
  }

  return 0
}

function calculateDelay(expiry: Date) {
  const isValid = new Date(expiry).getTime() > 0
  if (!isValid) {
    return null
  }

  const seconds = getRemainingSeconds(expiry)
  const extraMilliSeconds = Math.floor((seconds - Math.floor(seconds)) * 1000)
  return extraMilliSeconds > 0 ? extraMilliSeconds : DEFAULT_DELAY
}

function getTimeParams() {
  const params = new URLSearchParams(window.location.search)
  const hours = Number(params.get('hours'))
  const minutes = Number(params.get('minutes'))
  return { hours, minutes }
}

function getInitialExpiry() {
  const time = new Date()
  const defaultHours = 8
  const defaultMinutes = 0
  const { hours, minutes } = getTimeParams()

  time.setHours(time.getHours() + (hours || defaultHours))
  time.setMinutes(time.getMinutes() + (minutes || defaultMinutes))

  return time
}

const DEFAULT_DELAY = 1000

function Countdown() {
  const [expiryTimestamp, setExpiryTimestamp] = useState<Date>(
    getInitialExpiry()
  )
  const [seconds, setSeconds] = useState(getRemainingSeconds(expiryTimestamp))
  const [isRunning, setIsRunning] = useState(false)
  const [delay, setDelay] = useState(calculateDelay(expiryTimestamp))

  useInterval(
    () => {
      if (delay !== DEFAULT_DELAY) {
        setDelay(DEFAULT_DELAY)
      }

      const secondsValue = getRemainingSeconds(expiryTimestamp)
      setSeconds(secondsValue)

      if (secondsValue <= 0) {
        handleExpire()
      }
    },
    isRunning ? delay : null
  )

  const handleExpire = useCallback(() => {
    console.log('Finished: ', new Date())
    setIsRunning(false)
    setDelay(null)
  }, [])

  const restart = useCallback((newExpiry: Date, autoStart = true) => {
    setDelay(calculateDelay(newExpiry))
    setIsRunning(autoStart)
    setExpiryTimestamp(newExpiry)
    setSeconds(getRemainingSeconds(newExpiry))
  }, [])

  const resume = useCallback(() => {
    const time = new Date()
    console.log('Started: ', time)
    time.setMilliseconds(time.getMilliseconds() + seconds * 1000)
    restart(time)
  }, [seconds, restart])

  const pause = useCallback(() => {
    console.log('Paused: ', new Date())
    setIsRunning(false)
  }, [])

  return (
    <>
      <Clock timeInSeconds={seconds} />
      {isRunning ? (
        <button onClick={pause}>Pause</button>
      ) : (
        <button onClick={resume}>Start</button>
      )}
      <button onClick={() => restart(getInitialExpiry(), false)}>Reset</button>
    </>
  )
}

export default Countdown
