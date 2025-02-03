import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('ko')

export const formatDateFromNow = (date: dayjs.ConfigType) => dayjs(date).fromNow()
