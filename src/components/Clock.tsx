function formatNumber(num: number) {
  return String(num).padStart(2, '0')
}

type Props = {
  timeInSeconds: number
}

function Clock({ timeInSeconds }: Props) {
  const totalSeconds = Math.ceil(timeInSeconds)
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
  const seconds = Math.floor(totalSeconds % 60)

  return (
    <h1>{formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}</h1>
  )
}

export default Clock