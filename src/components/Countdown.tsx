import { useEffect, useState } from 'react'
import Clock from './Clock'

const totalHours = 8
const initialTimeInSeconds = 3600 * totalHours

function Countdown() {
  const [running, setRunning] = useState(false)
  const [time, setTime] = useState<number>(initialTimeInSeconds)

  useEffect(() => {
    if (!running || time === 0) {
      return
    }

    const interval = setInterval(() => {
      setTime(time => time - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [time, running])

  function reset() {
    setTime(initialTimeInSeconds)
    setRunning(false)
  }

  return (
    <>
      <Clock time={time} />
      <button onClick={() => setRunning(!running)} disabled={time === 0}>
        {running && time > 0 ? 'Stop' : 'Start'}
      </button>
      <button onClick={reset}>Reset</button>
    </>
  )
}

export default Countdown