<template>
  <div
    class="scroll-container"
    ref="scrollContainer"
    @wheel.prevent="handleScroll"
  >
    <div
      class="scroll-wrapper"
      ref="scrollWrapper"
      :style="{top: top + 'px'}"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
const delta = 15;

export default {
  name: "scrollBar",
  data() {
    return {
      top: 0,
    };
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3;
      console.log(eventDelta, Math.min(0, this.top + eventDelta));
      const $container = this.$refs.scrollContainer;
      let containerHeight = $container.offsetHeight;
      const $wrapper = this.$refs.scrollWrapper;
      let wrapperHeight = $wrapper.offsetHeight;
      if (eventDelta > 0) {
        this.top = Math.min(0, this.top + eventDelta);
      } else {
        if (containerHeight - delta < wrapperHeight) {
          if (this.top < -(wrapperHeight - containerHeight + delta)) {
            this.top = this.top;
          } else {
            this.top = Math.max(
              this.top + eventDelta,
              containerHeight - wrapperHeight - delta
            );
          }
        } else {
          this.top = 0;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
// .scroll-container {
//   position: relative;
//   width: 200px;
//   height: 100vh;
//   background-color: rgb(84, 92, 100);
//   .scroll-wrapper {
//     position: absolute;
//     width: 100% !important;
//   }
// }
</style>