<template>
  <div class="profile">
    <div class="left">
      <div
        class="hamburger-container"
        @click="active=!active"
      >
        <svg
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          class="hamburger"
          :class="isActive"
          p-id="1691"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="64"
          height="64"
        >
          <path
            d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"
            p-id="1692"
          ></path>
          <path
            d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"
            p-id="1693"
          ></path>
          <path
            d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"
            p-id="1694"
          ></path>
        </svg>
      </div>
      <div class="navTitle">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="route in listLevel" :key="route.path" :to="{path: route.path}">
            {{route.meta.title}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <el-dropdown trigger="click">
      <div class="avatar">
        <img
          src=""
          alt=""
          width="40"
          height="40"
          loading="lazy"
        >
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          divided
          @click.native="check(menu)"
          v-for="(menu,index) in dropMenu"
          :key="index"
        >
          {{menu}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: ["doActive"],
  data() {
    return {
      dropMenu: ["首页", "退出"],
      active: false,
      listLevel: null
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  computed: {
    isActive() {
      return this.active ? "is-active" : "";
    },
  },
  watch: {
    active() {
      this.doActive(this.active);
      this.getCrumb()
    },
    $route(){
      this.getCrumb()
    }
  },
  methods: {
    getCrumb(){
      this.listLevel = this.$route.matched.filter(item=>item.name)
    },
    check(menu){
      if('首页' == menu){
        this.$router.push('/home')
      }
      if('退出' == menu){
        this.$store.dispatch('FedLogOut')
        this.$router.push('/login')
      }
    },
    handleResize() {
      if (window.innerWidth <= 940) {
        this.active = true;
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped lang="less">
.profile {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  padding-right: 10px;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 1px 5px 20px rgb(192, 187, 187);
  .left {
    padding-left: 10px;
    display: flex;
    align-items: center;
    .navTitle {
      padding-left: 20px;
    }
  }
  .hamburger {
    width: 40px;
    height: 40px;
    transition: transform 0.5s;
  }
  .is-active {
    transform: rotate(90deg);
  }
}
</style>