<template>
  <div class="home">
    <table-form :form-list="formList"></table-form>
  </div>
</template>

<script>
import { tableForm } from 'comm/src/components'
export default {
  name: 'Home',
  components: { tableForm },
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
          name: '系统模块系统模块1112',
          field: 'a8',
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
          name: '系统模块系统模块11312',
          field: 'a7',
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
          name: '系统模块系统模块312',
          field: 'a6',
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
