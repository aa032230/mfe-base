<template>
  <div class="about">
    <!-- <aSelect v-model="value" :options="options" labelKey="label" valueKey="value"></aSelect> -->
    1212121
    <!-- <aTree :data="data1" nodeKey="key" :props="defaultProps" default-expand-all :height="300" show-checkbox /> -->
    <!-- <transfer1></transfer1> -->
  </div>
</template>
<script>
import transfer1 from '@/components/transfer'
export default {
  name: 'about',
  // components: {
  //   transfer1
  // },
  data() {
    function dig(path = '0', level = 3) {
      const list = []
      for (let i = 0; i < 10; i += 1) {
        const key = `${path}-${i}`
        const treeNode = {
          title: key,
          key
        }

        if (level > 0) {
          treeNode.children = dig(key, level - 1)
        }

        list.push(treeNode)
      }
      return list
    }
    return {
      data1: dig(),
      defaultProps: {
        children: 'children',
        label: 'title'
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
