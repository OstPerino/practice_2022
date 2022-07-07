export default function dateFilter (value, format = 'date') {
  const options = {
    weekday: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Intl.DateTimeFormat('en-US', options).format(new Date())
}
