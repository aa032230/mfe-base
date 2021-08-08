<template>
  <div class="tags-view-container">
    <div class="tags-view-wrapper" ref="scrollPane">
      <router-link
        ref="tag"
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        v-for="tag in Array.from(visitedViews)"
        :to="tag.path"
        :key="tag.path"
      >
        {{ tag.title }}
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag.path)"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
// import ScrollPane from './scroll-pane'
import { NAVBAR_MENUS } from 'config'
import { redirectApp } from 'comm/src/utils'
export default {
  // components: { ScrollPane },
  data() {
    return {
      visitedViews: [],
      navbar_menus: NAVBAR_MENUS
    }
  },
  watch: {
    $route() {
      this.addViewTags()
      // this.moveToCurrentTag()
    }
  },
  mounted() {
    this.addViewTags()
  },
  methods: {
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
      } else {
        redirectApp('/app1')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
