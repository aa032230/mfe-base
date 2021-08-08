<template>
  <div id="main-root">
    <!-- 头部 -->
    <v-header :navbar-menus="navbarMenus" @select="selectMenu" />
    <router-view />
    <!-- 子应用盒子 -->
    <div class="subapp">
      <v-sidebar :menu-list="sidebarMenu" />
      <div class="app-view-warp">
        <tag-views></tag-views>
        <div id="root-view" class="app-view-box" />
      </div>
    </div>
  </div>
</template>

<script>
import { NAVBAR_MENUS } from 'config'
import { vSidebar } from 'comm/src/components'
import { mf } from 'utils'
import { vHeader, tagViews } from 'components'
const _subAppContainer = '#root-view'
export default {
  name: 'App',
  components: {
    vHeader,
    vSidebar,
    tagViews
  },
  data() {
    return {
      navbarMenus: NAVBAR_MENUS,
      sidebarMenu: []
    }
  },
  mounted() {
    this.setMenus()
  },
  watch: {
    $route: 'getSubMenu'
  },
  methods: {
    // 菜单获取
    setMenus() {
      const apps = []
      this.navbarMenus.forEach((m) => {
        m.container = _subAppContainer
        apps.push(Object.assign(mf.createDefaultAppConfig(this), m))
      })
      // 注册子应用并启动微服务
      mf.registerAndStart(apps)
      this.getSubMenu()
    },

    getSubMenu() {
      const currentPath = this.$route.path.split('/')[1]
      this.navbarMenus.forEach((m) => {
        if (m.activeRule === currentPath) {
          this.sidebarMenu = m.children
        }
      })
    },
    // 选中激活
    selectMenu(index, indexPath) {
      const parentMenu = this.navbarMenus.filter((item) => `/${item.activeRule}` === index)[0]
      this.sidebarMenu = parentMenu.children
    }
  }
}
</script>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  a {
    text-decoration: none;
  }
  #main-root {
    height: 100%;
    .subapp {
      height: calc(100% - 60px);
      display: flex;
      .app-view-warp {
        flex: 1;
      }
    }
  }
}
</style>