<template>
  <div class="navList">
      <!-- 遍历路由：非隐藏且含嵌套路由（layout -> 做菜单导航路由） -->
      <template
        v-for="item in routes"
        v-if="!item.hidden&&item.children"
      >
      <!-- 1.只有一个子路由,且子路由没有再嵌套，直接menu-item -->
        <router-link
          v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow"
          :to="item.path+'/'+item.children[0].path"
          :key="item.children[0].name"
        >
          <el-menu-item :index="item.path+'/'+item.children[0].path">
            <i v-if="item.children[0].meta&&item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
            <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
          </el-menu-item>
        </router-link>

        <!-- 2.有多个子路由,使用submenu->menu-item层结构 -->
        <el-submenu v-else :index="item.name || item.path" :key="item.name">
          <template slot="title">
            <i v-if="item.meta&&item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
          </template>

          <template v-for="child in item.children" v-if="!child.hidden">
            <!-- 2.1 若该子路由还嵌套了路由，且非隐藏，则走一个完整的递归嵌套，继续赋值给当前组件 -->
            <nav-list :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path">
            </nav-list>

            <!-- 2.2 没有再嵌套子路由，直接走menu-item -->
            <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
              <el-menu-item :index="item.path+'/'+child.path">
                <i v-if="child.meta&&child.meta.icon" :class="child.meta.icon"></i>
                <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </template>
  </div>
</template>

<script>
export default {
  name: "NavList",
  props: {
    isNest: {
      type: Boolean,
      default: false
    },
    routes: {
      type: Array
    }
  },
  methods: {
    hasOneShowingChildren(child) {
      const showChildren = child.filter((item) => !item.hidden);
      if(showChildren.length === 1){
        return true
      }
      return false
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu{
  height: 100vh;
}

i{
  margin-right: 16px;
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>