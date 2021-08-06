<template>
  <el-container class="head-wrap">
    <el-header class="head">
      <el-row class="head-row">
        <el-col :span="3">
          <div class="head-row-left">
            <div class="head-row-left-logo">
              Logo
            </div>
            <div class="head-row-left-line"></div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="head-row-center">
            <el-menu class="el-menu-demo" mode="horizontal" :default-active="currentMenu" router background-color="#001529" text-color="#fff" @select="select">
              <template v-for="(item, index) in navbarMenus">
                <el-menu-item :key="index" :index="`/${item.activeRule}`">
                  {{ item.menuName }}
                </el-menu-item>
              </template>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="head-row-right">
            <div class="head-row-right-user">
              <!-- 消息中心 -->
              <!-- <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div> -->
              <!-- 用户头像 -->
              <!-- <div class="user-avator">
                    <img src="../assets/img/img.jpg" />
                </div> -->
              <!-- 用户名下拉菜单 -->
              <div class="head-row-right-user-avatar">
                <el-avatar :size="35" :src="circleUrl"></el-avatar>
              </div>
              <el-dropdown class="head-row-right-user-name" trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  {{ username }}
                  <i class="el-icon-arrow-down"></i>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="user">
                      个人中心
                    </el-dropdown-item>
                    <el-dropdown-item divided command="loginout">
                      退出登录
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-header>
  </el-container>
</template>

<script>
import { redirectApp } from 'comm/src/utils'
export default {
  name: 'AnsoHeader',
  props: {
    navbarMenus: {
      type: Array,
      default: () => []
    },
    currentMenu: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      username: '张三',
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  methods: {
    handleCommand (command) {
      switch (command) {
      case 'user':
        alert('功能正在开发中...')
        break
      case 'loginout':
        this.loginout()
        break
      default:
        break
      }
    },
    loginout () {
      sessionStorage.removeItem('token')
      localStorage.removeItem('vuexLocal')
      redirectApp('/login')
    },
    select (index, indexPath) {
      this.$emit('select', index)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index';
</style>