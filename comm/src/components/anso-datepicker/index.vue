<script>
/**
 * 平台日期组件
 */
import dayjs from 'dayjs'
export default {
  name: 'anso-datepicker',
  props: {},
  data() {
    const _that = this
    return {
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      type: 'datetimerange',
      isActive: false,
      prefixText: '',
      pickerOptions: ''
    }
  },
  methods: {
    handleFocus() {
      this.isActive = true
      this.$emit('focus')
    },
    handleBlur() {
      this.isActive = false
      this.$emit('blur')
    }
  },
  mounted() {
    
  },
  render() {
    return (
      <div class={['anso-date-picker', { 'is-active': this.isActive }]}>
        {this.prefixText ? (
          <span class="anso-date-picker-prefix-text">
            {this.prefixText}
            <span class="anso-date-picker-prefix-text-line">|</span>
          </span>
        ) : (
          ''
        )}

        <el-date-picker
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          class="anso-date-picker-box "
          v-model={this.value1}
          type={this.type}
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          picker-options={this.pickerOptions}
        ></el-date-picker>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>
