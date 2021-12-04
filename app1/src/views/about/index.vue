<template>
  <div class="about">
    <transferPlain></transferPlain>
  </div>
</template>
<script>
import transferPlain from '@/components/transfer/src/transfer-plain'
export default {
  name: 'about',
  components: {
    transferPlain
  },
  data() {
    const generateData = (_) => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      data: generateData(),
      value: [1],
      value4: [1],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        )
      }
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
