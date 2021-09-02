import dayjs from 'dayjs'
/**
 *
 * @param {Number} stamp  时间戳
 * @param {String} format  转换格式： 'YYYY-MM-DD HH:mm:ss'
 * @returns {String}
 */
export function willStampToDate(stamp, format) {
  if (!stamp) return
  stamp = String(stamp).length === 13 ? Number(stamp) : stamp * 1000
  format = format ? format : 'YYYY-MM-DD HH:mm:ss'
  return dayjs(stamp).format(format)
}
