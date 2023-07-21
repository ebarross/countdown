function formatNumber(num: number) {
  return num.toLocaleString('en-US', { minimumIntegerDigits: 2 })
}

type Props = {
  time: number
}

function Clock({ time }: Props) {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = (time % 3600) - (minutes * 60)

  return (
    <h1>{formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}</h1>
  )
}

export default Clock