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
    <!-- 商品规格：handAddStatus手动添加使用input，非手动则inputList多选 -->
    <el-form-item label="商品规格">
      <el-card
        shadow="never"
        class="cardBg"
      >
        <div
          v-for="(productAttr,idx) in selectProductAttr"
          :key="productAttr.id"
        >
          {{productAttr.name}}:
          <!-- v-model关联了主体，而不是遍历条目：直接使用遍历对象数据不会反馈给主题吗 -->
          <el-checkbox-group
            v-if="productAttr.handAddStatus==0"
            v-model="selectProductAttr[idx].values"
          >
            <el-checkbox
              v-for="item in getInputListArr(productAttr.inputList)"
              :label="item"
              :key="item"
              class="littleMarginLeft"
            ></el-checkbox>
          </el-checkbox-group>
          <div v-else>
            <el-checkbox-group v-model="selectProductAttr[idx].values">
              <div
                v-for="(item,index) in selectProductAttr[idx].options"
                :key="index"
                style="display: inline-block"
              >
                <el-checkbox
                  :label="item"
                  :key="item"
                  class="littleMarginLeft"
                ></el-checkbox>
                <el-button
                  type="text"
                  @click="handleRemoveProductAttrValue(idx,index)"
                  class="littleMarginLeft"
                >删除</el-button>
              </div>
            </el-checkbox-group>
            <el-input
              v-model="addProductAttrValue"
              style="width: 160px;margin-left: 10px"
              clearable
            ></el-input>
            <el-button
              class="littleMarginLeft"
              @click="handleAddProductAttrValue(idx)"
            >增加</el-button>
          </div>
        </div>
      </el-card>
    </el-form-item>
    <!-- 商品参数：inputType决定手工录入使用Input输入，列表选择使用select(inputList) -->
    <el-form-item label="商品参数">
      <el-card
        shadow="never"
        class="cardBg"
      >
        <div
          v-for="(item,index) in selectProductParam"
          :class="{littleMarginTop:index!==0}"
          :key="item.id"
        >
          <div class="paramInputLabel">{{item.name}}：</div>
          <el-select
            v-if="item.inputType"
            class="paramInput"
            v-model="selectProductParam[index].value"
          >
            <el-option
              v-for="item in getInputListArr(item.inputList)"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-input
            v-else
            class="paramInput"
            v-model="selectProductParam[index].value"
          ></el-input>
        </div>
      </el-card>
    </el-form-item>
    <el-form-item label="商品相册">
      <el-upload
        action="#"
        :show-file-list="true"
        :limit="3"
        :on-exceed="handleExceed"
        :http-request="uploadSuccess"
        :on-change="handleChange"
        :file-list="selectProductAttrPics"
        list-type="picture-card"
        class="avatar-uploader"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="商品详情">
      <el-tabs
        v-model="activeHtmlName"
        type="card"
      >
        <el-tab-pane
          label="电脑端详情"
          name="pc"
        >
          <Editor
            v-model="detailHtml"
            :init="initTinymce"
          />
        </el-tab-pane>
        <el-tab-pane
          label="移动端详情"
          name="mobile"
        >
          <Editor
            v-model="detailMobileHtml"
            :init="initTinymce"
          />
        </el-tab-pane>
      </el-tabs>
    </el-form-item>
    <el-form-item class="footer">
      <el-button
        size="medium"
        @click="prevStep"
      >上一步，填写商品信息</el-button>
      <el-button
        size="medium"
        type="primary"
        @click="nextStep"
      >下一步，填写商品属性</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { fetchList as attrListFetch } from "@/api/productAttr";
import { fetchList } from "@/api/productCate";
import Editor from "@tinymce/tinymce-vue";

const plugins = [
  `advlist anchor autolink autosave code codesample colorpicker colorpicker
  contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime
  legacyoutput link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace
  spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount`,
];
const toolbar = [
  `bold italic underline strikethrough alignleft aligncenter
  alignright outdent indent  blockquote undo redo removeformat code`,
  `hr bullist numlist link image charmap	 preview anchor pagebreak
    fullscreen insertdatetime media table forecolor backcolor`,
];
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
      //PC端详情
      detailHtml: "",
      //移动端详情
      detailMobileHtml: "",
      initTinymce: {
        language: "zh_CN",
        plugins: plugins,
        toolbar: toolbar,
        menubar: false,
      },
    };
  },
  components: {
    Editor,
  },
  created() {
    this.getProductCateOptions();
  },
  methods: {
    getProductCateOptions() {
      fetchList({ pageSize: 100, pageNum: 1 }).then((res) => {
        this.productCateOptions = res.data.list.map(({ id, name }) => ({
          value: id,
          label: name,
        }));
      });
    },
    handleCateChange(value) {
      this.getProductAttr(value, 0);
      this.getProductAttr(value, 1);
    },
    getProductAttr(cid, type) {
      attrListFetch(cid, { type, pageSize: 100, pageNum: 1 }).then((res) => {
        let result = res.data.list;
        if (result.length == 0) return;
        if (type == 0) {
          this.selectProductAttr = [];
          result.forEach((item) => {
            this.selectProductAttr.push({
              id: item.id,
              name: item.name,
              handAddStatus: item.handAddStatus,
              inputList: item.inputList,
              values: [],
              options: [],
            });
          });
        } else {
          this.selectProductParam = [];
          result.forEach((item) => {
            this.selectProductParam.push({
              id: item.id,
              name: item.name,
              value: null,
              inputType: item.inputType,
              inputList: item.inputList,
            });
          });
        }
      });
    },
    //输入可选择转换
    getInputListArr(inputList) {
      // let arr = []
      // if(Boolean(inputList)){
      //   arr = inputList.split(',')
      // }
      // return arr
      return inputList.split(",");
    },
    handleRemoveProductAttrValue(idx, index) {
      this.selectProductAttr[idx].options.splice(index, 1);
    },
    handleAddProductAttrValue(idx) {
      let options = this.selectProductAttr[idx].options;
      if (this.addProductAttrValue == null || this.addProductAttrValue == "") {
        this.$message({
          message: "属性值不能为空",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      if (options.indexOf(this.addProductAttrValue) !== -1) {
        this.$message({
          message: "属性值不能重复",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.selectProductAttr[idx].options.push(this.addProductAttrValue);
      this.addProductAttrValue = null;
    },
    //上传图片
    handleExceed() {
      this.$message.warning("当前限制选择3个文件");
    },
    handleChange(file, fileList) {
      this.selectProductAttrPics = fileList.slice(-3);
    },
    uploadSuccess() {},
    prevStep() {
      this.$emit("prevStep");
    },
    nextStep() {
      this.$emit("nextStep");
    },
  },
};
</script>

<style lang="less" scoped>
.cardBg {
  background: #f8f9fc;
}
.littleMarginLeft {
  margin-left: 10px;
}
.paramInputLabel {
  display: inline-block;
  width: 100px;
  text-align: right;
  padding-right: 10px;
}
.paramInput {
  width: 250px;
}
.avatar-uploader {
  position: relative;
  overflow: hidden;
  .el-upload:hover {
    border-color: #409eff;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>