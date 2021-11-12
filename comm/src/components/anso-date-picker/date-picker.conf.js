import { useIntervalDays, useIntervalPeriod } from './picker'
/**
 * @description: 日期组件配置项
 * @param {*}
 * @return {*}
 */
export const PICKER_OPTIONS = {
  shortcuts: [
    {
      text: '今日',
      onClick(picker) {
        useIntervalPeriod(picker, 0, 'day')
      }
    },
    {
      text: '昨日',
      onClick(picker) {
        useIntervalPeriod(picker, 1, 'day')
      }
    },
    {
      text: '本周',
      onClick(picker) {
        useIntervalPeriod(picker, 0, 'week')
      }
    },
    {
      text: '上周',
      onClick(picker) {
        useIntervalPeriod(picker, 1, 'week')
      }
    },
    {
      text: '本月',
      onClick(picker) {
        useIntervalPeriod(picker, 0, 'month')
      }
    },
    {
      text: '上月',
      onClick(picker) {
        useIntervalPeriod(picker, 1, 'month')
      }
    },
    {
      text: '本年',
      onClick(picker) {
        useIntervalPeriod(picker, 0, 'year')
      }
    },
    {
      text: '上年',
      onClick(picker) {
        useIntervalPeriod(picker, 1, 'year')
      }
    },
    {
      text: '过去7天',
      onClick(picker) {
        useIntervalDays(picker, 7, 'day')
      }
    },
    {
      text: '过去14天',
      onClick(picker) {
        useIntervalDays(picker, 14, 'day')
      }
    },
    {
      text: '过去30天',
      onClick(picker) {
        useIntervalDays(picker, 30, 'day')
      }
    },
    {
      text: '过去60天',
      onClick(picker) {
        useIntervalDays(picker, 60, 'day')
      }
    },
    {
      text: '过去90天',
      onClick(picker) {
        useIntervalDays(picker, 90, 'day')
      }
    },
    {
      text: '过去180天',
      onClick(picker) {
        useIntervalDays(picker, 180, 'day')
      }
    }
  ]
}
