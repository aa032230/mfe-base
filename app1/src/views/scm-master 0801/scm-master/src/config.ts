/**
 * 黄色预警天数
 */
export const yellowRemainDays = 21

/**
 * 每周开始的日期：0-星期天，1-星期一，一次类推
 */
export const weekDayBegin = 0

/**
 * 单页条数
 */
export const pageSize = 10

/**
 * 固定开始日期，如配置了，则使用这个数据开始绘制红绿线，否则使用系统时间
 */
export const mockBeginDate = '2022-07-20'

/**
 * 搜索框的是否选项
 */
export const trueOrFalse = [
  {
    id: 1,
    text: '是'
  },
  {
    id: 0,
    text: '否'
  }
]

/**
 * 明细里面的运输方式配置
 */
export const shippingTypeArr = {
  1: {
    text: '空运',
    name: 'air'
  },
  2: {
    text: '海运',
    name: 'sea'
  },
  3: {
    text: '铁运',
    name: 'tran'
  }
}
