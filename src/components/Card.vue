<template>
  <div
    class="card"
    :class="cardStyle"
  >
    <div
      class="title"
      v-show="isTitle"
      :style="{justifyContent: title.position,backgroundColor: title.backgroundColor}"
    >
      <div class="name">{{title.name}}</div>
      <div class="operation">
        <div
          class="item"
          v-for="o in operate"
          :key="o.id"
          @click="executeEvent(o.event)"
        >
          <span>{{o.label}}</span><span
            :class="o.icon"
            style="padding-left: 3px"
          ></span>
        </div>
      </div>
    </div>
    <div class="content">
      <slot>暂无数据!</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ['title','operate','shadow','scale'],
  computed: {
    isTitle() {
      return Object.keys(this.title).length;
    },
    cardStyle() {
      let card = "";
      if (this.shadow) card.concat("shadow");
      if (this.scale) card.concat(" scale");
      return card;
    },
  },
  methods: {
    executeEvent(e) {
      this.$emit(e);
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.card {
  width: 400px;
  height: 280px;
  border: 1px solid silver;
  .title {
    font-weight: bold;
    height: 20%;
    display: flex;
    align-items: center;
    & > div {
      padding: 10px;
    }
    .operation {
      color: DeepSkyBlue;
      display: flex;
      .item {
        padding: 5px;
      }
    }
  }
  .content {
    display: flex;
    height: 80%;
    flex-direction: column;
    padding: 10px 0 0 10px;
  }
}
.scale {
  &:hover {
    transform: scale(1.1);
  }
}
.shadow {
  box-shadow: 1px 1px 10px 5px gainsboro;
}
</style>