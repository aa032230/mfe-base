<template>
  <div class="home">
    <table-page
      :operates="operates"
      :toolsConfig="toolsConfig"
      :tableEvent="tableEvent"
      :tableConfig="tableConfig"
      :form-list="formList"
      title="用户管理列表"
      :columns="columns"
      :tableData="tableData"
      :pageIndex.sync="ruleForm.pageIndex"
      :pageSize.sync="ruleForm.pageSize"
      :total="tableData.length"
      @pagination="getList"
      @query="handleQuery"
      :headerConfig="headerConfig"
    >
      <anso-modal
        @cancel="handleCancel"
        @open="handleOpen"
        @submit="handleSubmit"
        :visible.sync="visible"
        :modalConfig="modalConfig"
      >
        <anso-form
          label-position="top"
          :model="ruleForm"
          :rules="rules"
          v-model="ruleForm"
          :form-list="formList"
          :item-row="2"
        ></anso-form>
      </anso-modal>
      <template v-slot:custom="scoped">
        <el-input v-model="scoped.row[scoped.prop]"></el-input>
      </template>
    </table-page>
  </div>
</template>

<script>
import { tablePage, ansoModal, ansoForm } from 'comm/src/components'
export default {
  name: 'user',
  components: { tablePage, ansoModal, ansoForm },
  data() {
    const tData = [
      {
        id: 1,
        date: Date.now(),
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        switch: '112'
      },
      {
        id: 2,
        date: Date.now(),
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }
    ]
    return {
      tableConfig: {},
      rules: {
        a1: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        a2: [{ required: true, message: '请输入活动名称', trigger: 'change' }]
      },
      headerConfig: {
        title: '表格头部标题',
        buttons: [
          {
            name: '新增',
            type: 'primary',
            methods() {
              console.log(111111111)
            }
          },
          {
            name: '批量导入',
            methods() {
              console.log('批量导入')
            }
          }
        ]
      },
      ruleForm: {
        pageIndex: 1,
        pageSize: 1
      },
      visible: false,
      modalConfig: {
        title: '标题',
        width: '30%'
      },
      tableEvent: {
        selectionChange: this.selectionChange
      },
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
            label: '编辑1',
            type: 'text',
            method: (index, row) => {
              this.visible = true
            }
          },
          {
            label: '编辑2',
            type: 'text',
            method: (index, row) => {
              this.visible = true
            }
          },
          {
            label: '编辑3',
            type: 'text',
            method: (index, row) => {
              this.visible = true
            }
          },
          {
            label: '删除',
            type: 'text',
            method: this.handleDelete
          }
        ]
      },
      toolsConfig: ['refresh', 'print', 'export', 'space', 'setting'],
      formList: [
        {
          name: '系统模块',
          field: 'a1',
          model: '',
          width: '150px',
          input(val) {
            console.log(val)
          }
        },
        {
          name: '系统模块11',
          field: 'a13',
          model: '',
          enter(val) {
            console.log(val)
          }
        },
        {
          name: '系统模块',
          field: 'check',
          model: [1],
          type: 'checkboxs',
          change: (val) => {
            console.log(val)
          },
          options: [
            {
              label: 1
            },
            {
              label: 2
            }
          ]
        },
        {
          name: '系统模块系统模块',
          field: 'a2',
          type: 'treeSelect',
          data: tData,
          props: {
            value: 'id', // ID字段名
            label: 'name', // 显示名称
            children: 'children'
          }
        },
        {
          name: '系统模块2',
          field: 'a3',
          width: '100%',
          type: 'switch'
        },
        {
          name: '系统模块',
          field: 'a4',
          model: 1,
          type: 'radios',
          options: [
            {
              label: 1,
              text: 'radio1'
            },
            {
              label: 2,
              text: 'radio2'
            }
          ]
        },
        {
          name: '系统模块4',
          field: 'a5'
        },
        {
          name: '系统模块2',
          field: 'a6',
          type: 'switch'
        },
        {
          name: '系统模块3',
          field: 'a7'
        },
        {
          name: '系统模块4',
          field: 'a8'
        },
        {
          name: '系统模块系统模块',
          field: 'a9',
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
        }
      ],
      columns: [
        {
          prop: 'date',
          label: '日期',
          sortable: true,
          format: 'YYYY-MM-DD HH:mm:ss'
        },
        {
          prop: 'name',
          label: '姓名',
          width: '50px',
          'show-overflow-tooltip': true
        },
        {
          prop: 'address',
          label: '地址',
          custom: true
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
        }
      ],
      tableData: tData
    }
  },
  methods: {
    getList() {
      // console.log(this.ruleForm)
      // console.log('list',1111111111222333)
    },
    selectionChange(tableList) {
      console.log(tableList)
    },
    handleDelete(index, row) {
      console.log(row)
    },
    handleSubmit() {
      console.log(this.ruleForm)
    },
    handleCancel() {
      console.log('cancel')
    },
    handleOpen() {
      console.log('dialog open')
    },
    handleQuery(form) {
      console.log(form)
    }
  }
}
</script>

<style>
.home {
  height: 100%;
}
</style>
