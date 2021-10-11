<script>
import DatePicker from '../date-picker'
import { useIntervalDays, useIntervalPeriod } from './picker'
export default {
  name: 'AnsoDatePicker',
  data() {
    return {
      pickValue: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '本周',
            onClick(picker) {
              useIntervalPeriod(picker,0, 'week')
            }
          },
          {
            text: '上周',
            onClick(picker) {
              useIntervalPeriod(picker,1, 'week')
            }
          },
          {
            text: '本月',
            onClick(picker) {
              useIntervalPeriod(picker,0, 'month')
            }
          },
          {
            text: '上月',
            onClick(picker) {
              useIntervalPeriod(picker,1, 'month')
            }
          },
          {
            text: '本年',
            onClick(picker) {
              useIntervalPeriod(picker,0, 'year')
            }
          },
          {
            text: '上年',
            onClick(picker) {
              useIntervalPeriod(picker,1, 'year')
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
    }
  },
  watch: {
    pickValue: {
      handler(val) {
        this.$emit('input', val)
      }
    }
  },
  render(h) {
    const { isCycleAlive } = this.$attrs
    return (
      <DatePicker
        v-model={this.pickValue}
        picker-options={isCycleAlive ? this.pickerOptions : {}}
        attrs={{
          size: 'small',
          placeholder: '选择日期',
          'start-placeholder': '开始日期',
          'end-placeholder': '结束日期',
          ...this.$attrs
        }}
        on={{ ...this.$listeners }}
      ></DatePicker>
    )
  }
}
</script>
<style lang="scss" scoped>
@import './index';
</style>
