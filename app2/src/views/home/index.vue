<template>
  <div class="home">
    <v-table :form-list="formList" title="用户管理列表"></v-table>
  </div>
</template>

<script>
import { vTable } from 'comm/src/components'
export default {
  name: 'Home',
  components: { vTable },
  data() {
    return {
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
      ]
    }
  }
}
</script>

<style></style>
