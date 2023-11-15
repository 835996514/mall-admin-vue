<template>
  <div class="app-container">
    <card
      :shadow="shadow"
      :scale="scale"
      :operate="operate"
      :title="title"
    />
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "home",
  components: { Card },
  data() {
    return {
      title: {
        backgroundColor: "#f2f6fc",
        name: "标题",
        position: "space-between",
      },
      operate: [
        {
          id: 1,
          label: "操作1",
          icon: "iconfont icon-yingxiaohuodong",
          event: "sendMsg1",
        },
        { id: 2, label: "操作2", icon: "", event: "sendMsg2" },
      ],
      shadow: true,
      scale: false,
    };
  },
  mounted(){
    
  }
};
</script>

<style>
</style>