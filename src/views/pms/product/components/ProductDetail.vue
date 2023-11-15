<template>
  <div>
    <el-card>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="填写商品信息"></el-step>
        <el-step title="填写商品促销"></el-step>
        <el-step title="填写商品属性"></el-step>
        <el-step title="选择商品关联"></el-step>
      </el-steps>
      <product-info-detail
        v-show="active==1"
        @nextStep="nextStep"
      ></product-info-detail>
    </el-card>
  </div>
</template>

<script>
import productInfoDetail from "./ProductInfoDetail.vue"

export default {
    data(){
        return {
            active: 0
        }
    },
    methods: {
        nextStep(){
            this.active++;
        }
    },
    created(){
        console.log(this.$route.query)
    },
    components: {
        productInfoDetail
    }
}
</script>

<style>

</style>