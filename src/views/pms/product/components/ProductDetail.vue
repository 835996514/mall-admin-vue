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
      v-model="productParam"
      @nextStep="nextStep"
    ></product-info-detail>
    <product-sale-detail
      v-show="active==1"
      v-model="productParam"
      @nextStep="nextStep"
      @prevStep="prevStep"
    ></product-sale-detail>
    <product-attr-detail
      v-show="active==2"
      v-model="productParam"
      @nextStep="nextStep"
      @prevStep="prevStep"
    ></product-attr-detail>
    <product-relation-detail
      v-show="active==3"
      v-model="productParam"
      @prevStep="prevStep"
      @finishCommit="finishCommit"
    ></product-relation-detail>
  </el-card>
</template>

<script>
import productInfoDetail from "./ProductInfoDetail";
import productSaleDetail from "./ProductSaleDetail";
import productAttrDetail from "./ProductAttrDetail";
import productRelationDetail from "./ProductRelationDetail";


  const defaultProductParam = {
    albumPics: '',
    brandId: null,
    brandName: '',
    deleteStatus: 0,
    description: '',
    detailDesc: '',
    detailHtml: '',
    detailMobileHtml: '',
    detailTitle: '',
    feightTemplateId: 0,
    flashPromotionCount: 0,
    flashPromotionId: 0,
    flashPromotionPrice: 0,
    flashPromotionSort: 0,
    giftPoint: 0,
    giftGrowth: 0,
    keywords: '',
    lowStock: 0,
    name: '',
    newStatus: 0,
    note: '',
    originalPrice: 0,
    pic: '',
    //会员价格{memberLevelId: 0,memberPrice: 0,memberLevelName: null}
    memberPriceList: [],
    //商品满减
    productFullReductionList: [{fullPrice: 0, reducePrice: 0}],
    //商品阶梯价格
    productLadderList: [{count: 0,discount: 0,price: 0}],
    previewStatus: 0,
    price: 0,
    productAttributeCategoryId: null,
    //商品属性相关{productAttributeId: 0, value: ''}
    productAttributeValueList: [],
    //商品sku库存信息{lowStock: 0, pic: '', price: 0, sale: 0, skuCode: '', spData: '', stock: 0}
    skuStockList: [],
    //商品相关专题{subjectId: 0}
    subjectProductRelationList: [],
    //商品相关优选{prefrenceAreaId: 0}
    prefrenceAreaProductRelationList: [],
    productCategoryId: null,
    productCategoryName: '',
    productSn: '',
    promotionEndTime: '',
    promotionPerLimit: 0,
    promotionPrice: null,
    promotionStartTime: '',
    promotionType: 0,
    publishStatus: 0,
    recommandStatus: 0,
    sale: 0,
    serviceIds: '',
    sort: 0,
    stock: 0,
    subTitle: '',
    unit: '',
    usePointLimit: 0,
    verifyStatus: 0,
    weight: 0
  };
export default {
  props: {
    isEdit: {
      type: Boolean
    }
  },
  data() {
    return {
      active: 0,
      productParam: Object.assign({},defaultProductParam)
    };
  },
  methods: {
    nextStep() {
      this.active++;
    },
    prevStep(){
      this.active--;
    },
    finishCommit(){

    }
  },
  created() {
  },
  components: {
    productInfoDetail,productSaleDetail,productAttrDetail,productRelationDetail
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