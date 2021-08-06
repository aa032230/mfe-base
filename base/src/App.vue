<template>
  <div id="main-root">
    <!-- 头部 -->
    <v-header
      :navbar-menus="navbarMenus"
      :current-menu="currentMenu"
    />
    <router-view />
    <!-- 子应用盒子 -->
    <div
      id="root-view"
      class="app-view-box"
    />
  </div>
</template>

<script>
import { NAVBAR_MENUS } from 'config'
import { mf } from 'utils'
import { vHeader } from 'components'
const _subAppContainer = '#root-view'
export default {
  name: 'App',
  components: {
    vHeader
  },
  data () {
    return {
      currentMenu: '',
      navbarMenus: NAVBAR_MENUS
    }
  },
  mounted () {
    this.setMenus()
  },

  methods: {
    // 菜单获取
    setMenus () {
      const apps = []
      this.navbarMenus.forEach((m) => {
        m.container = _subAppContainer
        apps.push(Object.assign(mf.createDefaultAppConfig(this), m))
      })
      // 注册子应用并启动微服务
      mf.registerAndStart(apps)
      this.getCurrentMenu(apps[0])
    },
    getCurrentMenu (current) {
      // 获取当前页面 菜单刷新后能自动选中
      let currentUrl = window.location.href
      let currentPage = currentUrl.split('/')[3].replace('#', '')
      const _defaultActive = current.activeRule
      this.currentMenu = currentPage ? '/' + currentPage : '/' + _defaultActive
      console.log(this.currentMenu)
    },
    // 选中激活
    selectMenu (index, indexPath) {
      this.currentMenu = index
    }
  }
}
</script>
