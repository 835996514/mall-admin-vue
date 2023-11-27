<template>
  <div style="width: 670px; margin: 0 auto;">
    关联专题：
    <el-transfer
      filterable
      filter-placeholder="请输入专题名称"
      v-model="subjectList"
      :data="subjectData"
      :titles="['待选择','已选择']"
      style="display: inline-block; vertical-align: top; margin-bottom: 30px"
    >
    </el-transfer>
    关联优选：
    <el-transfer
      filterable
      filter-placeholder="请输入优选名称"
      v-model="preferenceList"
      :data="preferenceData"
      :titles="['待选择','已选择']"
      style="display: inline-block; vertical-align: top;"
    >
    </el-transfer>
    <div class="footer">
        <el-button size="medium" @click="prevStep">上一步，填写商品属性</el-button>
        <el-button size="medium" type="primary" @click="finish">完成，提交商品</el-button>
    </div>
  </div>
</template>

<script>
import { fetchList } from "@/api/preferenceArea";
import { fetchListAll } from "@/api/subject";

export default {
  data() {
    return {
      subjectList: [],
      preferenceList: [],
      subjectData: [],
      preferenceData: [],
    };
  },
  created() {
    this.getSubjectList();
    this.getPreferenceList();
  },
  methods: {
    getSubjectList() {
      fetchListAll().then((res) => {
        this.subjectData = res.data.map((item) => {
          return { key: item.id, label: item.title };
        });
      });
    },
    getPreferenceList() {
      fetchList().then((res) => {
        this.preferenceData = res.data.map((item) => {
          return { key: item.id, label: item.name };
        });
      });
    },
    prevStep() {
      this.$emit('prevStep');
    },
    finish(){

    }
  },
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>