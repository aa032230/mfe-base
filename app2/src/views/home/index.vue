<template>
  <div class="home">
    <anso-tree
      @add="handleAdd"
      @update="handleUpdate"
      @remove="handleRemove"
      :treeConfig="treeConfig"
      tree-width="230px"
    />
  </div>
</template>

<script>
import { ansoTree } from 'comm/src/components'
export default {
  name: 'Home',
  components: { ansoTree },
  data() {
    return {
      treeConfig: {
        draggable: true,
        title: '产品分类',
        data: [
          {
            id: 1,
            menuName: '系统管理',
            children: [
              {
                id: 100,
                menuName: '用户管理',
                children: [
                  {
                    id: 1000,
                    menuName: '用户查询'
                  },
                  {
                    id: 1001,
                    menuName: '用户新增'
                  },
                  {
                    id: 1002,
                    menuName: '用户修改'
                  },
                  {
                    id: 1003,
                    menuName: '用户删除',
                    children: [
                      {
                        id: 1023,
                        menuName: '用户aaa'
                      },
                      {
                        id: 1024,
                        menuName: '用户bbb',
                        children: [
                          {
                            id: 1025,
                            menuName: '用户bbb用户bbb1用户bbb11'
                          },
                          {
                            id: 1026,
                            menuName: '用户bbb2'
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                id: 101,
                menuName: '角色管理',
                children: [
                  {
                    id: 1006,
                    menuName: '角色查询'
                  },
                  {
                    id: 1007,
                    menuName: '角色新增'
                  },
                  {
                    id: 1008,
                    menuName: '角色修改'
                  },
                  {
                    id: 1011,
                    menuName: '删除角色'
                  },
                  {
                    id: 1012,
                    menuName: '角色查询'
                  },
                  {
                    id: 1013,
                    menuName: '角色新增'
                  },
                  {
                    id: 1014,
                    menuName: '角色修改'
                  },
                  {
                    id: 1015,
                    menuName: '删除角色'
                  }
                ]
              }
            ]
          }
        ],
        props: {
          children: 'children',
          label: 'menuName'
        }
      }
    }
  },
  created() {
    // console.log(this['__CONTEXT__']);
  },
  methods: {
    // 新增
    handleAdd() {
      console.log(1213)
    },
    // 编辑
    handleUpdate(node) {
      console.log(node)
    },
    // 删除
    handleRemove(node) {
      console.log(node)
    }
  }
}
</script>

<style>
.home {
  height: 100%;
}
</style>
