<template>
  <div class="about">
    <!-- <anso-date-picker
      v-model="value"
      :type="'daterange'"
      :picker-options="pickerOptions"
      range-separator="至"
      size="small"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
    ></anso-date-picker>
    <anso-button type="primary" @click="handleChange" size="small" :permission="permission">我是按钮</anso-button> -->
    <anso-table
      :columns="columns"
      :tableData="tableData"
      :operates="operates"
      :span-method="arraySpanMethod"
      @row-click="rowClick"
      @cell-click="cellClick"
      stripe
    />
  </div>
</template>
<script>
export default {
  name: 'about',
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: Date.now(),
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          switch: '112',
          showButton: false,
          disabled: true
        },
        {
          id: 2,
          date: Date.now(),
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }
      ],
      operates: {
        data: [
          {
            label: '编辑',
            type: 'text',
            method: (index, row) => {
              this.visible = true
            }
          },
          {
            label: '详情',
            type: 'text',
            method: (index, row) => {
              this.visible = true
            }
          },
          {
            label: '删除',
            type: 'text',
            method: (index, row) => {},
            disabled(row) {
              return row.disabled
            }
          }
        ]
      },
      columns: [
        {
          type: 'selection',
          width: '55'
        },
        {
          prop: 'date',
          label: '日期11',
          sortable: true,
          format: 'YYYY-MM-DD HH:mm:ss',
          children: [
            {
              prop: 'name',
              label: '姓名',
              width: '50px',
              children: [
                {
                  prop: 'address',
                  label: '地址'
                },
                {
                  prop: 'hh3',
                  label: '地址31111111111312312312'
                }
              ]
            }
          ]
        },
        {
          prop: 'name',
          label: '姓名',
          width: '50px'
        },
        {
          prop: 'address',
          label: '地址'
        },
        {
          prop: 'title',
          label: '地址1',
          render: (scope, prop) => {
            return (
              <el-image
                style="width: 50px;"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              ></el-image>
            )
          }
        },
        {
          prop: 'head',
          label: '地址2',
          render: (scope, prop) => {
            return <el-switch v-model={scope[prop]}></el-switch>
          }
        },
        {
          prop: 'hh3',
          label: '地址3'
        },
        {
          prop: 'operate',
          label: '操作'
        }
      ]
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
    cellClick(){
      alert(1221)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
