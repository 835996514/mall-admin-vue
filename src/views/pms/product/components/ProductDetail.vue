<template>
  <el-card>
    <el-steps
      :active="active"
      finish-status="success"
      align-center
      :space="200"
      style="width: 700px;margin: 50px auto;"
    >
      <el-step title="填写商品信息"></el-step>
      <el-step title="填写商品促销"></el-step>
      <el-step title="填写商品属性"></el-step>
      <el-step title="选择商品关联"></el-step>
    </el-steps>
    <product-info-detail
      v-show="active==0"
      @nextStep="nextStep"
    ></product-info-detail>
    <product-sale-detail
      v-show="active==1"
      @nextStep="nextStep"
      @prevStep="prevStep"
    ></product-sale-detail>
    <product-attr-detail
      v-show="active==2"
      @nextSte="nextStep"
      @prevStep="prevStep"
    ></product-attr-detail>
  </el-card>
</template>

<script>
import productInfoDetail from "./ProductInfoDetail.vue";
import productSaleDetail from "./ProductSaleDetail";
import productAttrDetail from "./ProductAttrDetail";

export default {
  props: {
    isEdit: {
      type: Boolean
    }
  },
  data() {
    return {
      active: 2,
    };
  },
  methods: {
    nextStep() {
      this.active++;
    },
    prevStep(){
      this.active--;
    }
  },
  created() {
  },
  components: {
    productInfoDetail,productSaleDetail,productAttrDetail
  },
};
</script>

<style lang="less" scoped>
.el-card {
  width: 1000px;
  height: calc(100% + 30px);
  margin: 0 auto;
  margin-top: 20px;
}
</style>