<template>
  <div class="about">
    <anso-date-picker
      v-model="value"
      :type="'datetimerange'"
      :picker-options="pickerOptions"
      range-separator="至"
      size="small"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></anso-date-picker>
  </div>
</template>
<script>
export default {
  name: 'about',
  data() {
    return {
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
      },
      value: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
