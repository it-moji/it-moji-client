import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('ko')

export const formatDateFromNow = (date: dayjs.ConfigType) => dayjs(date).fromNow()

export const formatDateTimeDetail = (date: string) => {
  const target = new Date(date)

  const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const timeFormatter = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  const [{ value: hour }, , { value: minute }] = timeFormatter.formatToParts(target)
  const [{ value: year }, , { value: month }, , { value: day }] =
    dateFormatter.formatToParts(target)

  return `${year}-${month}-${day} ${hour}:${minute}`
}

export const formatDateDetail = (date: string) => {
  const target = new Date(date)

  const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const [{ value: year }, , { value: month }, , { value: day }] =
    dateFormatter.formatToParts(target)

  return `${year}. ${month}. ${day}.`
}
