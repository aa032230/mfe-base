<template>
  <div class="home">
    <v-form :form-list="formList"></v-form>
  </div>
</template>

<script>
import { vForm } from 'comm/src/components'
export default {
  name: 'Home',
  components: { vForm },
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
          width: 220
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
