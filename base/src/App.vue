<template>
  <div id="main-root">
    <!-- 头部 -->
    <v-header :navbar-menus="navbarMenus" />
    <router-view />
    <!-- 子应用盒子 -->
    <div class="subapp">
      <div class="sidebar">
        <anso-sidebar :menu-list="sidebarMenu" />
      </div>
      <div class="app-view-warp">
        <tag-views></tag-views>
        <div id="root-view" class="app-view-box" />
      </div>
    </div>
  </div>
</template>

<script>
import { NAVBAR_MENUS } from 'config'
import { ansoSidebar } from 'comm/src/components'
import { mf } from 'utils'
import { vHeader, tagViews } from 'components'
const _subAppContainer = '#root-view'
export default {
  name: 'App',
  components: {
    vHeader,
    ansoSidebar,
    tagViews
  },
  data() {
    return {
      navbarMenus: NAVBAR_MENUS,
      sidebarMenu: []
    }
  },
  mounted() {
    console.log(location.pathname)
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
    width: 100%;
    height: 100%;
    min-width: 700px;
    .subapp {
      width: 100%;
      height: calc(100% - 60px);
      display: flex;
      .app-view-warp {
        flex: 1;
        overflow: hidden;
        .app-view-box {
          background-color: #eee;
          height: calc(100% - 35px);
          padding: 10px;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>