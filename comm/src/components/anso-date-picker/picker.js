import { getTimestampType, getMonthDate } from '../../utils'
import dayjs from 'dayjs'
/**
 * @description: 天数间隔
 * @param {*} picker 日期实例
 * @param {*} interval 间隔时间
 * @param {*} dateType 间隔类型 day|month|year|week
 * @return {*}
 */
export function useIntervalDays(picker, interval, dateType) {
  const end = dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  // const end = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
  const start = new Date()
  const date = getTimestampType(interval, dateType, 'start', 'before')
  start.setTime(date)
  picker.$emit('pick', [start, end]) 
}
/**
 * @description: 日期间隔
 * @param {*} picker 日期实例
 * @param {*} interval 间隔时间
 * @param {*} dateType 间隔类型 day|month|year|week
 * @return {*}
 */
export function useIntervalPeriod(picker, interval, dateType) {
  const end = new Date(getMonthDate(dateType, interval, 'end'))
  const start = new Date()
  const date = getMonthDate(dateType, interval, 'start')
  start.setTime(date)
  picker.$emit('pick', [start, end])
}
