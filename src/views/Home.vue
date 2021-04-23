<template>
  <el-container class="container">
    <el-header class="header">
      <span class="header_title">图书管理系统</span>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="route.path" router>
          <el-menu-item v-for="(item, index) in nav" :key="index" :index="item.path">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: 'Home',
  setup () {
    const route = useRoute()
    const nav = [{
      title: '我的图书馆',
      icon: 'el-icon-user',
      path: '/my'
    },
    {
      title: '书籍查询',
      icon: 'el-icon-search',
      path: '/search'
    },
    {
      title: '借阅记录',
      icon: 'el-icon-tickets',
      path: '/borrow'
    },
    {
      title: '书籍管理',
      icon: 'el-icon-collection',
      path: '/manage'
    }]

    return { route, nav }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}

.header {
  position: relative;
  border-bottom: 1px solid #000;
  display: flex;
  align-items: center;
  &_title {
  }
}

.el-aside {
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
}

.el-main {
  position: absolute;
  top: 60px;
  left: 200px;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
}

.el-menu {
  height: 100%;
}
</style>
