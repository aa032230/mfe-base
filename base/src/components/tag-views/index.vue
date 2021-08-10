<template>
  <div class="tags-view-container">
    <div class="tags-view-wrapper" ref="scrollPane">
      <router-link ref="tag" class="tags-view-item" :class="isActive(tag) ? 'active' : ''" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path"
        @contextmenu.prevent.native="openMenu(tag,$event)">
        {{ tag.title }}
        <span class="el-icon-close" v-show="visitedViews.length > 1" @click.prevent.stop="closeSelectedTag(tag.path)"></span>
      </router-link>
      <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
        <li @click="closeSelectedTag(selectedTag.path)">关闭</li>
        <li @click="closeOthersTags">关闭其它</li>
        <!-- <li @click="openWindow">浮动窗口</li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import { NAVBAR_MENUS } from 'config'
import { redirectApp } from 'comm/src/utils'
export default {
  name: 'TagViews',
  data() {
    return {
      visitedViews: [],
      navbar_menus: NAVBAR_MENUS,
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  watch: {
    $route: 'addViewTags',
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addViewTags()
  },
  methods: {
    // 高亮
    isActive(route) {
      return route.path === this.$route.path // || route.name === this.$route.name
    },

    // 添加标签
    addViewTags() {
      const { path } = this.$route
      this.navbar_menus.forEach((item) => {
        item.children.forEach((n) => {
          if (n.index === path) {
            const _index = this.visitedViews.findIndex((item) => item.path === path)
            if (_index !== -1) {
              return
            }
            this.visitedViews.push({
              path,
              title: n.name
            })
          }
        })
      })
    },
    // 关闭标签
    closeSelectedTag(view) {
      this.visitedViews = this.visitedViews.filter((item) => item.path !== view)
      if (this.visitedViews.length >= 1) {
        const _view = this.visitedViews[this.visitedViews.length - 1]
        redirectApp(_view.path)
      }
    },

    // 关闭其他
    closeOthersTags() {
      const { selectedTag } = this
      this.visitedViews = this.visitedViews.filter(item => item.path === selectedTag.path)
      this.$router.push(selectedTag.path)
    },

    // 鼠标右键打开选项
    openMenu(tag, e) {
      this.visible = true
      this.selectedTag = tag
      this.left = e.clientX
      this.top = e.clientY
    },
    // 关闭
    closeMenu() {
      this.visible = false
    },
    openWindow() {
      // window.open (this.selectedTag.path, 'newwindow', 'height=460, width=700, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no') 
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
