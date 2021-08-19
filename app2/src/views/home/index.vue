<template>
  <div class="home">
    <table-page :tableEvent="tableEvent" :tableConfig="tableConfig" :form-list="formList" title="用户管理列表" :columns="columns" :tableData="tableData"></table-page>
  </div>
</template>

<script>
import { tablePage } from 'comm/src/components'
export default {
  name: 'Home',
  components: { tablePage },
  data() {
    return {
      tableEvent:{
        'selection-change': this.selectionChange,
      },
      tableConfig: {
        border: true
      },
      formList: [
        {
          name: '系统模块',
          field: 'a1'
        },
        {
          name: '系统模块系统模块',
          field: 'a2',
          width: 220,
          type: 'select',
          options: [
            {
              value: 0,
              label: '小籠包'
            },
            {
              value: 1,
              label: '叉烧包'
            }
          ]
        },
        {
          name: '系统模块2',
          field: 'a3',
          width: 220,
          type: 'switch'
        },
        {
          name: '系统模块3',
          field: 'a4'
        },
        {
          name: '系统模块4',
          field: 'a5'
        }
      ],
      columns: [
        {
          prop: 'date',
          label: '日期',
          checked: true,
          sortable: true,
          // 'sort-method': () => console.log('sort')
          // children: [
          //   {
          //     prop: 'name',
          //     label: '姓名',
          //     checked: true,
          //     children: [
          //       {
          //         prop: 'name',
          //         label: '姓名',
          //         checked: true
          //       },
          //       {
          //         prop: 'address',
          //         label: '地址',
          //         checked: true
          //       }
          //     ]
          //   },
          //   {
          //     prop: 'address',
          //     label: '地址',
          //     checked: true
          //   }
          // ]
        },
        {
          prop: 'name',
          label: '姓名',
          checked: true,
          render(val) {
            return val
          }
        },
        {
          prop: 'address',
          label: '地址',
          checked: true
        },
        {
          prop: 'title',
          label: '地址1'
        },
        {
          prop: 'head',
          label: '地址2',
          checked: true
        },
        {
          prop: 'hh3',
          label: '地址3',
          checked: true
        }
      ],
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    selectionChange(tableList) {
      console.log(tableList)
    }
  }
}
</script>

<style></style>
