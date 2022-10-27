import {DealInfo} from '@src/components/type';
import {mockBeginDate, weekDayBegin} from '@src/config';

/**
 * 计算指定日期在当年的第几周
 * @param date 当前的日期，默认为当天
 */
export function calculateWeekIndex(date = new Date()) {
  const year = date.getFullYear();
  // 获取年所在的第一天
  const firstDayDate = new Date(year, 0, 1);
  // 计算当前日期距离第一天的天数差
  const dayGap = Math.round(
    (date.valueOf() - firstDayDate.valueOf()) / 86400000,
  );

  const weekIndex = Math.ceil((dayGap + (firstDayDate.getDay() + 1 - 1)) / 7);

  return {
    year,
    weekIndex,
    weekStr: `${year}${
      weekIndex < 10 ? '0' + weekIndex.toString() : weekIndex.toString()
    }`,
  };
}

/**
 * 计算是否为一周开始的天
 * @param timespan
 * @returns
 */
export function isWeekBeginDate(timespan: number) {
  const time = new Date(timespan);
  const day = time.getDay();
  return day === weekDayBegin;
}

/**
 * 比较是否同一天
 * @param dateString '2022-03-04'
 * @param compareTimespan timespan
 */
export function isSameDay(dateString: string, compareTimespan = Date.now()) {
  const date = new Date(dateString);
  const compareDate = new Date(compareTimespan);

  return (
    date.getFullYear() === compareDate.getFullYear() &&
    date.getMonth() === compareDate.getMonth() &&
    date.getDate() === compareDate.getDate()
  );
}

/**
 * 判断时间是否在deal区间
 * @param dealInfo
 * @param timespan
 */
export function isInDealDay(dealInfo: DealInfo, timespan: number) {
  const startDateTimespan = new Date(dealInfo.startDate).getTime();
  const endTimespan = startDateTimespan + 24 * 60 * 60000 * dealInfo.holdDays;

  return timespan >= startDateTimespan && timespan <= endTimespan;
}

/**
 * 转化时间格式
 * @param time
 * @returns
 */
export function getLocaleDateString(time: number) {
  if (!time || typeof time !== 'number') {
    return time as unknown as string;
  }
  const arr = new Date(time).toLocaleDateString().split('/');
  return arr
    .map((item) => {
      if (parseInt(item) < 10) {
        item = '0' + item.toString();
      }
      return item;
    })
    .join('-');
}

/**
 * 判断某个日期是否为过去（查询的起点以前）
 * @param dateStr '2022-08-22'
 */
export function isOverDate(dateStr: string) {
  const searchStartDate = getSearchStartDateStr();
  return new Date(dateStr).getTime() < new Date(searchStartDate).getTime();
}

/**
 * 获取查询的其实日期
 * @returns mock日期或者当天
 */
export function getSearchStartDateStr() {
  return mockBeginDate || getLocaleDateString(new Date().getTime());
}
