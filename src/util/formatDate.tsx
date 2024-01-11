import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

function formatDate(date: string) {
  dayjs.extend(customParseFormat)
  return dayjs(date, 'YYYY-MM-DD')
}

function formatTwoDate(startDate: string, dueDate: string) {
  dayjs.extend(customParseFormat)
  const formated = [
    dayjs(startDate, 'YYYY-MM-DD'),
    dayjs(dueDate, 'YYYY-MM-DD'),
  ]
  return formated
}

function formatStringToDayJs(date: string) {
  dayjs.extend(customParseFormat)
  return dayjs(date, 'YYYY-MM-DD HH:mm:ss')
}

function formatDayJs(date: string) {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss')
}

export default {
  formatDate,
  formatStringToDayJs,
  formatTwoDate,
  formatDayJs,
}
