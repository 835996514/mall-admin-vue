<template>
  <el-form
    ref="form"
    :model="data"
    label-width="80px"
    :rules="rules"
    size="mini"
    class="infoForm"
  >
    <el-form-item
      label="商品分类"
      prop="productCategoryId"
    >
      <el-cascader
        v-model="productCategoryId"
        :options="productCategoryOptions"
        @change="handleCateChange"
        placeholder="请选择"
      ></el-cascader>
    </el-form-item>
    <el-form-item
      label="商品名称"
      prop="name"
    >
      <el-input v-model="name"></el-input>
    </el-form-item>
    <el-form-item
      label="副标题"
      prop="subTitle"
    >
      <el-input v-model="subTitle"></el-input>
    </el-form-item>
    <el-form-item
      label="商品品牌"
      prop="brandId"
    >
      <el-select
        v-model="brandId"
        placeholder="请选择品牌"
        clearable
      >
        <el-option
          v-for="item in brandOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品介绍">
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="description"
      ></el-input>
    </el-form-item>
    <el-form-item label="商品货号">
      <el-input v-model="productSn"></el-input>
    </el-form-item>
    <el-form-item label="商品售价">
      <el-input v-model="price"></el-input>
    </el-form-item>
    <el-form-item label="市场价">
      <el-input v-model="originalPrice"></el-input>
    </el-form-item>
    <el-form-item label="库存">
      <el-input v-model="stock"></el-input>
    </el-form-item>
    <el-form-item label="计量单位">
      <el-input
        v-model="unit"
        style="width: 280px"
      ></el-input><span style="margin-left: 10px">克</span>
    </el-form-item>
    <el-form-item label="商品重量">
      <el-input v-model="weight"></el-input>
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="sort"></el-input>
    </el-form-item>
    <el-form-item style="display: flex; justify-content: center; padding: 30px 0;">
      <el-button
        type="primary"
        @click="submitForm"
        size="medium"
      >下一步，填写商品促销</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      data: {},
      name: "",
      subTitle: "",
      productCategoryId: null,
      productCategoryOptions: [],
      brandId: null,
      brandOptions: [],
      description: "",
      productSn: "",
      price: 0,
      originalPrice: 0,
      stock: 0,
      unit: "",
      weight: 0,
      sort: 0,
      rules: {
        productCategoryId: [{ required: true, message: "请选择商品分类" }],
        name: [
          { required: true, message: "请输入商品名称" },
          { min: 2, max: 140, message: "长度在2到140个字符" },
        ],
        subTitle: [{ required: true, message: "请输入副标题" }],
        brandId: [{ required: true, message: "请选择商品品牌" }],
      },
    };
  },
  methods: {
    handleCateChange() {},
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          console.log("submit");
          this.$emit("nextStep");
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.infoForm {
  width: 800px;
  margin: 0 auto;
}
</style>