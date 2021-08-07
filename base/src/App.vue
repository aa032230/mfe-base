<template>
  <div id="main-root">
    <!-- 头部 -->
    <v-header :navbar-menus="navbarMenus" :current-menu="currentMenu" @select="selectMenu" />
    <router-view />
    <!-- 子应用盒子 -->
    <div class="subapp">
      <v-sidebar :menu-list="sidebarMenu" :default-active="subActive" />
      <div id="root-view" class="app-view-box" />
    </div>
  </div>
</template>

<script>
import { NAVBAR_MENUS } from 'config'
import { vSidebar } from 'comm/src/components'
import { mf } from 'utils'
import { vHeader } from 'components'
const _subAppContainer = '#root-view'
export default {
  name: 'App',
  components: {
    vHeader,
    vSidebar
  },
  data() {
    return {
      currentMenu: '',
      navbarMenus: NAVBAR_MENUS,
      sidebarMenu: [],
      subActive: ''
    }
  },
  mounted() {
    this.setMenus()
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
      this.getCurrentMenu(apps[0])
      this.sidebarMenu = apps[0].children
    },
    getCurrentMenu(current) {
      // 获取当前页面 菜单刷新后能自动选中
      const currentUrl = window.location.href
      const currentPage = currentUrl.split('/')
      const currentActive = currentPage[3]
      const _defaultActive = current.activeRule
      this.currentMenu = currentActive ? '/' + currentActive : '/' + _defaultActive
      this.subActive = currentPage[4] ? `${this.currentMenu}/${currentPage[4]}` : current.children[0].index
    },
    // 选中激活
    selectMenu(index, indexPath) {
      const parentMenu = this.navbarMenus.filter((item) => `/${item.activeRule}` === index)[0]
      this.currentMenu = index
      this.sidebarMenu = parentMenu.children
      this.subActive = parentMenu.children[0].index
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
  #main-root {
    height: 100%;
    .subapp {
      height: 100%;
      display: flex;
      .app-view-box {
        flex: 1;
      }
    }
  }
}
</style>