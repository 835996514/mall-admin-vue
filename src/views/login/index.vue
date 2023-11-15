<template>
  <div class="login">
    <Transition
      mode="out-in"
      appear
      name="animate__animated animate__lightSpeed"
      enter-active-class="animate__animated animate__lightSpeedInLeft"
      leave-active-class="animate__animated animate__lightSpeedOutRight"
    >
      <component
        :is="active"
        @select="swith"
      ></component>
    </Transition>
  </div>
</template>

<script>
import { login, register } from "./component/index";

export default {
  name: "index",
  data() {
    return {
      active: "login",
    };
  },
  computed: {
  },
  methods: {
    swith(active) {
      this.active = active;
    },
  },
  mounted(){
    this.active = this.$route.fullPath.slice(1)
  },
  components: { login, register },
};
</script>

<style type="text/css" scoped>
.login {
  height: 100vh;
  background: url("@/assets/images/back_login.jpg") no-repeat center;
  background-attachment: fixed;
  background-size: cover;
  overflow: hidden;
  overflow-y: auto;
}
</style>