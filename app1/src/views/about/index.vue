<template>
  <div class="about">
    <aSelect v-model="value" :options="options" labelKey="label" valueKey="value"></aSelect>
  </div>
</template>
<script>
import aSelect from '@/components/aSelect/index.vue'
export default {
  name: 'about',
  components: {
    aSelect
  },
  data() {
    return {
      value: [],
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
    }
  },
  methods: {
    handleChange() {
      console.log(121321312)
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 1) {
          return [1, 2] // 0跨列 1跨行
        } else if (columnIndex === 2) {
          return [0, 0]
        }
      }
    },
    rowClick(row) {
      alert(1211112)
    },
    cellClick() {
      alert(1221)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
