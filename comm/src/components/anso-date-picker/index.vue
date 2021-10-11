<script>
import DatePicker from '../date-picker'
export default {
  name: 'AnsoDatePicker',
  data() {
    return {
      pickValue: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
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
