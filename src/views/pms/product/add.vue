<template>
  <div class="app-container">
    <product-detail :is-edit="false"/>
  </div>
</template>

<script>
import productDetail from "./components/ProductDetail.vue"

export default {
  name: "Add",
  data() {
    return {
      active: 0,
      productCategoryId: null,
      brandId: null,
      productCategoryOptions: [],
      brandOptions: []
    };
  },
  created(){

  },
  methods: {
    handleChange(){

    }
  },
  components: {productDetail}
};
</script>

<style lang="less" scoped>
</style>