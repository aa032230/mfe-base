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

/**
 *
 * @param {Number} stamp  获取指定日期时间戳
 * @param {String} format
 * @returns {String}
 */
export function getMonthDate(dateType, datenum, handleType) {
  dateType = dateType ? dateType : 'month'
  handleType = handleType ? handleType : 'start'
  datenum = datenum ? datenum : 0
  const d = dayjs().subtract(datenum, dateType).valueOf()
  return handleType === 'start' ? dayjs(d).startOf(dateType).valueOf() : dayjs(d).endOf(dateType).valueOf()
}

/**
 * 获取指定范围的时间戳
 * 适用范围本日,最近一月,最近三月,最近半年,最近一年等
 * 调用示例:getTimestampType(6,'month','start','before')距现在半年之前的时间戳
 * @param {Number} time1
 * @param {Number} time2
 * @return {String}
 */
export function getTimestampType(datenum, dateType, handleType, add) {
  // @dateNum     Number 天数或月数或年数
  // @dateType    String ['year','month','day']
  // @handleType  String ['start','end'],start 00:00:00;end 23:59:59
  // @add         String ['before','after'],before:往前,after:往后

  // 字段拦截
  let dateTypeArr = ['year', 'month', 'day']
  let dateTypeStt = dateTypeArr.includes(dateType)
  if (!dateTypeStt) {
    console.error('dateType: Type is error')
    return
  }
  let handleTypeArr = ['start', 'end']
  let handleTypeArrStt = handleTypeArr.includes(handleType)
  if (!handleTypeArrStt) {
    console.error('handleType: Type is error')
    return
  }
  let addArr = ['before', 'after']
  let addArrStt = addArr.includes(add)
  if (!addArrStt) {
    console.error('add: Type is error')
    return
  }
  let dateNum = parseInt(datenum)
  if (dateNum < 0) {
    // 如果dateNum小于0,则往前的变为往后,反之亦然
    if (add == 'after') {
      add = 'before'
    }
    if (add == 'before') {
      add = 'after'
    }
  }

  if (dateNum == 0) {
    // 如果datenum为0,就是当前条件下的开始或结束(当年第一天或当月第一天或当前天)
    if (handleType === 'start') {
      return dayjs().startOf(dateType).valueOf()
    } else if (handleType == 'end') {
      return dayjs().endOf(dateType).valueOf()
    }
  } else {
    if (add === 'after') {
      // 计算往后的
      // 大于0时,返回的是符合条件的值
      if (handleType === 'start') {
        return dayjs().add(Math.abs(dateNum), dateType).startOf('date').valueOf()
      } else if (handleType == 'end') {
        return dayjs().add(Math.abs(dateNum), dateType).endOf('date').valueOf()
      }
    } else if (add === 'before') {
      // 计算往前的
      if (handleType === 'start') {
        return dayjs().subtract(Math.abs(dateNum), dateType).startOf('date').valueOf()
      } else if (handleType == 'end') {
        return dayjs().subtract(Math.abs(dateNum), dateType).endOf('date').valueOf()
      }
    }
  }
}
