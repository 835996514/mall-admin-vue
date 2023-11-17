<template>
  <el-form
    :model="data"
    size="mini"
    label-width="120px"
    label-suffix="："
    ref="form"
  >
    <el-form-item label="属性类型">
      <el-select
        v-model="productAttributeCategoryId"
        clearable
        placeholder="请选择属性类型"
        @change="handleCateChange"
      >
        <el-option
          v-for="item in productCateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品规格">
      <el-card shadow="never">

      </el-card>
    </el-form-item>
  </el-form>
</template>

<script>
import { fetchList as attrListFetch } from "@/api/productAttr";
import { fetchList } from "@/api/productCate";
export default {
  data() {
    return {
      data: {},
      productCateOptions: [],
      //选中的商品属性
      selectProductAttr: [],
      //选中的商品参数
      selectProductParam: [],
      //选中的商品属性图片
      selectProductAttrPics: [],
      //可手动添加的商品属性
      addProductAttrValue: "",
      //商品富文本详情激活类型
      activeHtmlName: "pc",
      //----
      //商品属性分类
      productAttributeCategoryId: null,
      //商品属性翔哥{productAttributeId:0, value: ''}
      productAttributeValueList: [],
    };
  },
  created() {
    this.getProductCateOptions();
  },
  methods: {
    getProductCateOptions() {
      fetchList().then((res) => {
        this.productCateOptions = res.data.list.map(({ id, name }) => ({
          value: id,
          label: name,
        }));
      });
    },
    handleCateChange() {},
    getProductAttr(cid, type) {
      attrListFetch(cid, { type, pageSize: 100, pageNum: 1 }).then((res) => {
        let result = res.data.list;
        if (result.length == 0) return;
        if (type == 0) {
          this.selectProductAttr = result;
        } else if (type == 1) {
          this.selectProductParam = result;
        }
      });
    },
  },
};
</script>

<style>
</style>