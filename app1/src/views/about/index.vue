<template>
  <div class="about">
    <table-form :form-list="formList"></table-form>
    <div class="table-warp">
      <vxe-grid v-bind="gridOptions" class="table">
        <template #name_edit="{ row }">
          <vxe-input v-model="row.name"></vxe-input>
        </template>
        <template #size_edit="{ row }">
          <vxe-input v-model="row.size"></vxe-input>
        </template>
        <template #createtime_edit="{ row }">
          <vxe-input v-model="row.createTime" type="date" labelFormat="yyyy-MM-dd HH:mm:ss" transfer></vxe-input>
        </template>
        <template #updatetime_edit="{ row }">
          <vxe-input v-model="row.updateTime" type="date" labelFormat="yyyy-MM-dd HH:mm:ss" transfer></vxe-input>
        </template>
        <template #pager>
          <vxe-pager
            :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
            :current-page.sync="tablePage.currentPage"
            :page-size.sync="tablePage.pageSize"
            :total="tablePage.total"
          />
        </template>
      </vxe-grid>
    </div>
  </div>
</template>
<script>
import XEUtils from 'xe-utils'
export default {
  name: 'about',
  // components: {
  //   transfer1
  // },
  data() {
    return {
      formList: [
        {
          name: '系统模块11',
          field: 'a13',
          model: '',
          enter(val) {
            console.log(val)
          }
        },
        {
          name: '系统模块12',
          field: 'a14',
          model: '',
          enter(val) {
            console.log(val)
          }
        },
        {
          name: '系统模块13',
          field: 'a15',
          model: '',
          enter(val) {
            console.log(val)
          }
        }
      ],
      formData: {
        name: ''
      },
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      gridOptions: {
        showOverflow: true,
        keepSource: true,
        rowId: 'id',
        rowConfig: {
          isHover: true
        },
        columnConfig: {
          resizable: true
        },
        treeConfig: {
          transform: true,
          rowField: 'id',
          parentField: 'parentId'
        },
        exportConfig: {},
        toolbarConfig: {
          buttons: [
            { code: 'reload', name: 'Refresh' },
            { code: 'mark_cancel', name: 'MarkCancel' },
            { code: 'save', name: 'Save' }
          ],
          export: true,
          zoom: true,
          custom: true
        },
        checkboxConfig: {
          labelField: 'id'
        },
        editConfig: {
          trigger: 'click',
          mode: 'row',
          showStatus: true
        },
        data: [
                  { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '1', age: 28, address: 'Shenzhen' },
                  { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '0', age: 22, address: 'Guangzhou' },
                  { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
                  { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', age: 23, address: 'Shenzhen' },
                  { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
                  { id: 10006, name: 'Test6', nickname: 'T6', role: 'Develop', sex: '0', age: 27, address: 'Shanghai' },
                  { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '1', age: 29, address: 'Shenzhen' },
                  { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
                  { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: '1', age: 30, address: 'Shenzhen' },
                  { id: 10010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shanghai' },
                  { id: 10010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shanghai' },
                  { id: 10010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shanghai' },
                  { id: 10010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shanghai' },
                  { id: 10010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shanghai' },
                  { id: 10010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shanghai' },
                  { id: 10010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shanghai' },
                  { id: 10010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shanghai' },
                ],
        columns: [
          { type: 'checkbox', title: '全选', width: 120 },
          { field: 'name', title: '名称', width: 220, treeNode: true, editRender: {}, slots: { edit: 'name_edit' } },
          { field: 'size', title: '大小', editRender: {}, slots: { edit: 'size_edit' } },
          { field: 'createTime', title: 'CreateTime', editRender: {}, slots: { edit: 'createtime_edit' } },
          { field: 'updateTime', title: 'UpdateTime', editRender: {}, slots: { edit: 'updatetime_edit' } }
        ]
      }
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
