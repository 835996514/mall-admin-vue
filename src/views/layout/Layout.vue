<template>
  <div class="app-wrapper">
    <scroll-bar>
      <el-menu
        :default-active="this.$route.path"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >
        <nav-list
          :routes="routes"
        />
      </el-menu>
    </scroll-bar>
    <div class="content-container">
      <Top :doActive="doActive" />
      <app-main />
    </div>
  </div>
</template>

<script>
import { NavList, Top } from "@/components";
import AppMain from "./AppMain.vue";
import ScrollBar from "@/components/ScrollBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "layout",
  components: { NavList, Top, AppMain, ScrollBar },
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    ...mapGetters(["routers"]),
    routes() {
      return this.routers;
    },
  },
  methods: {
    doActive(flag) {
      this.isCollapse = flag;
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  height: 100vh;
}

i {
  margin-right: 16px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>