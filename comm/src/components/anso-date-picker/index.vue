<script>
import DatePicker from '../date-picker'
import { PICKER_OPTIONS } from './date-picker.conf'
export default {
  name: 'AnsoDatePicker',
  data() {
    return {
      pickValue: '',
      pickerOptions: PICKER_OPTIONS
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
    const { isCycleAlive, pickerOptions } = this.$attrs
    if (isCycleAlive && pickerOptions) {
      Object.assign(this.pickerOptions, pickerOptions)
    }
    return (
      <DatePicker
        v-model={this.pickValue}
        picker-options={isCycleAlive ? this.pickerOptions : this.$attrs.pickerOptions}
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
