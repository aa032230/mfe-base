<template>
  <div class="home">
    <v-tree :treeConfig="treeConfig" :treeData="data" :tree-config="defaultProps" tree-width="250px" />
  </div>
</template>

<script>
import { vTree } from 'comm/src/components'
export default {
  name: 'Home',
  components: { vTree },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeConfig: {
        data: [
          {
            label: '一级 1',
            children: [
              {
                label: '二级 1-1',
                children: [
                  {
                    label: '三级 1-1-1',
                    id: 2
                  }
                ]
              }
            ]
          },
          {
            label: '一级 2',
            children: [
              {
                label: '二级 2-1',
                children: [
                  {
                    label: '三级 2-1-1'
                  }
                ]
              },
              {
                label: '二级 2-2',
                children: [
                  {
                    label: '三级 2-2-1'
                  }
                ]
              }
            ]
          },
          {
            label: '一级 3',
            children: [
              {
                label: '二级 3-1',
                children: [
                  {
                    label: '三级 3-1-1'
                  }
                ]
              },
              {
                label: '二级 3-2',
                children: [
                  {
                    label: '三级 3-2-1'
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  created() {
    // console.log(this['__CONTEXT__']);
  }
}
</script>

<style>
.home {
  height: 100%;
}
</style>
