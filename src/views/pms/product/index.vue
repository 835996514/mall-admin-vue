<template>
  <div class="app-container">
    <el-card>
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleSearchList()"
          type="primary"
          size="small"
        >
          查询结果
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
      </div>
      <div>

      </div>
      <el-form
        :inline="true"
        ref="searchForm"
        :model="listQuery"
        size="small"
        label-width="80px"
        class="searchForm"
      >
        <el-form-item label="输入搜索">
          <el-input
            v-model="listQuery.keyword"
            placeholder="商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品货号">
          <el-input
            v-model="listQuery.productSn"
            placeholder="商品货号"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-cascader
            v-model="listQuery.productCategoryId"
            :options="productCategoryOptions"
            placeholder="请选择"
            clearable
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="商品品牌">
          <el-select
            v-model="listQuery.brandId"
            placeholder="请选择品牌"
            clearable
          >
            <el-option
              v-for="item in brandOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上架状态">
          <el-select
            v-model="listQuery.publishStatus"
            placeholder="全部"
          >
            <el-option
              v-for="item in publishStatuOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select
            v-model="listQuery.verifyStatus"
            placeholder="全部"
          >
            <el-option
              v-for="item in verifyStatuOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="operate-container">
      <i class="iconfont icon-a-mobankubeifen2"></i>
      <span>数据列表</span>
      <el-button
        size="mini"
        class="btn-add"
        @click="addProduct()"
      >
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="productList"
        :data="listData"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        v-loading="listLoading"
        border
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          label="编号"
          width="80"
          prop="id"
          align="center"
        ></el-table-column>
        <el-table-column
          label="商品图片"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <img
              style="width: 100%"
              :src="scope.row.pic"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="name"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="价格/货号"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            <p>价格：￥{{scope.row.price}}</p>
            <p>货号：{{scope.row.productSn}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="标签"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            上架：
            <el-switch
              v-model="scope.row.publishStatus"
              :active-value="1"
              :inactive-value="0"
              @change="handlePublishStatuChange(scope.row)"
            ></el-switch>
            新品：
            <el-switch
              v-model="scope.row.newStatus"
              :active-value="1"
              :inactive-value="0"
              @change="handleNewStatuChange(scope.row)"
            ></el-switch>
            推荐：
            <el-switch
              v-model="scope.row.recommandStatus"
              :active-value="1"
              :inactive-value="0"
              @change="handleRecommandStatuChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="排序"
          width="80"
          prop="sort"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="SKU库存"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="skuEdit(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="销量"
          width="100"
          prop="sale"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="审核状态"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <p>{{scope.row.verifyStatus | verifyStatusTransfer}}</p>
            <el-button type="text">审核详情</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="view(scope.row)"
              >
                查看
              </el-button>
              <el-button
                size="mini"
                @click="edit(scope.row)"
              >
                编辑
              </el-button>
            </p>
            <el-button
              size="mini"
              @click="blog(scope.row)"
            >
              日志
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="remove(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-select
      v-model="selectOpration"
      multiple
      collapse-tags
      placeholder="批量操作"
      size="small"
    >
      <el-option
        v-for="item in bulkOperations"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-button
      style="margin-left: 20px"
      size="small"
      type="primary"
      @click="bulkDo"
    >确认</el-button>
    <el-pagination
      style="float: right"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-count="5"
      :page-sizes="[5,10,15]"
      :page-size="5"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :total="total"
    ></el-pagination>
    <!-- sku库存编辑 -->
    <el-dialog
      title="编辑货品信息"
      :visible.sync="editSkuInfo.dialogVisible"
      width="40%;"
    >
      <span>商品货号：</span>
      <span>{{editSkuInfo.productSn}}</span>
      <el-input
        size="small"
        placeholder="请输入内容"
        v-model="editSkuInfo.keyword"
        style="width: 50%; margin-left: 20px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearchEditSku"
        ></el-button>
      </el-input>
      <el-table
        :data="editSkuInfo.stockList"
        style="width:100%;margin: 20px 0"
        border
      >
        <el-table-column
          label="SKU编号"
          width="130"
          align="center"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.skuCode"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-for="item in editSkuInfo.productAttr"
          :key="item.id"
          :label="item.name"
          align="center"
        >
          <template slot-scope="scope">
            {{getProductSkuSp(scope.row,item.name)}}
          </template>
        </el-table-column>
        <el-table-column
          label="销售价格"
          align="center"
          width="85"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="商品库存"
          align="center"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="库存预警值"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.lowStock"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        @click="cancelSkuEdit"
        style="float: right"
      >取消</el-button>
      <el-button
        @click="saveSkuEdit"
        type="primary"
        style="float: right;margin-right: 20px"
      >确认</el-button>
      <div class="clearfix"></div>
    </el-dialog>
  </div>
</template>

<script>
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  publishStatus: null,
  verifyStatus: null,
  keyword: "",
  productSn: "",
  productCategoryId: null,
  brandId: null,
};
const editSkuData = {
        dialogVisible: false,
        productId: null,
        productSn: "",
        keyword: null,
        productAttributeCategoryId: null,
        stockList: [],
        productAttr: [],
      }

import {
  productList,
  productSimpleList,
  updateVerifyStatys,
  updatePublishStatus,
  updateRecommendStatus,
  updateNewStatus,
  updateDeleteStatus,
} from "@/api/product";
import { fetchList,update as skuUpdate } from "@/api/skuStock";
import { fetchList as getProductAttrList } from "@/api/productAttr";
import { getList as listBrand } from "@/api/brand";
import { listWithChildren } from "@/api/productCate";
export default {
  name: "index",
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listData: [],
      listLoading: true,
      multipleSelection: [],
      productCategoryOptions: [],
      brandOptions: [],
      publishStatuOptions: [
        { value: 0, name: "下架" },
        { value: 1, name: "上架" },
      ],
      verifyStatuOptions: [
        { value: 0, name: "未审核" },
        { value: 1, name: "审核通过" },
      ],
      //SKU库存编辑
      editSkuInfo: Object.assign({},editSkuData),
      //分页
      total: 0,
      bulkOperations: [
        { label: '商品上架', value: 1 },
        { label: '商品下架', value: 2 },
        { label: '设为推荐', value: 3 },
        { label: '取消推荐', value: 4 },
        { label: '设为新品', value: 5 },
        { label: '取消新品', value: 6 },
        { label: '转移到分类', value: 7 },
        { label: '移入回收站', value: 8 },
      ],
      selectOpration: []
    };
  },
  methods: {
    //添加
    addProduct() {
      this.$router.push({path: '/pms/addProduct'})
    },
    //搜索框
    handleSearchList() {
      this.listLoading = true;
      if (this.listQuery.productCategoryId) {
        this.listQuery.productCategoryId = this.listQuery.productCategoryId[1];
      }
      this.getList();
    },
    handleResetSearch() {
      this.listQuery = defaultListQuery;
    },
    //表格
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //标签状态
    handlePublishStatuChange(row) {
      let arr = [];
      arr.push(row.id);
      this.publishStatuChange(arr,row.publishStatus)
    },
    handleNewStatuChange(row) {
      let arr = [];
      arr.push(row.id);
      this.newStatuChange(arr,row.newStatus)
    },
    handleRecommandStatuChange(row) {
      let arr = [];
      arr.push(row.id);
      this.recommandStatuChange(arr,row.recommandStatus)
    },
    publishStatuChange(arr,state){
      let params = new URLSearchParams();
      params.append("ids", arr);
      params.append("publishStatus", state);
      updatePublishStatus(params).then((res) => {
        if (res.data > 0) {
          this.$message({
            message: "操作成功!",
            type: "success",
          });
        }
      });
    },
    newStatuChange(arr,state){
      let params = new URLSearchParams();
      params.append("ids", arr);
      params.append("newStatus", state);
      updateNewStatus(params).then((res) => {
        if (res.data > 0) {
          this.$message({
            message: "操作成功!",
            type: "success",
          });
        }
      });
    },
    recommandStatuChange(arr,state){
      let params = new URLSearchParams();
      params.append("ids", arr);
      params.append("recommendStatus", state);
      updateRecommendStatus(params).then((res) => {
        if (res.data > 0) {
          this.$message({
            message: "操作成功!",
            type: "success",
          });
        }
      });
    },
    deleteStatus(arr){
      let params = new URLSearchParams();
      params.append("ids",arr)
      params.append("deleteStatus",1)
      updateDeleteStatus(params).then(res=>{
        if (res.data > 0) {
          this.$message({
            message: "操作成功!",
            type: "success",
          });
        }
      })
    },
    skuEdit(row) {
      this.editSkuInfo.dialogVisible = true;
      this.editSkuInfo.productId = row.id;
      this.editSkuInfo.productAttributeCategoryId =
        row.productAttributeCategoryId;
      this.editSkuInfo.productSn = row.productSn;
      this.editSkuInfo.keyword = null;
      fetchList(row.id, { keyword: this.editSkuInfo.keyword }).then((res) => {
        this.editSkuInfo.stockList = res.data;
        getProductAttrList(row.productAttributeCategoryId, { type: 0 }).then(
          (res) => {
            this.editSkuInfo.productAttr = res.data.list;
          }
        );
      });
    },
    getProductSkuSp(row, name) {
      let json = JSON.parse(row.spData);
      return json.find((item) => (item.key = name)).value;
    },
    handleSearchEditSku(){
      fetchList(this.editSkuInfo.productId, { keyword: this.editSkuInfo.keyword }).then(res=>{
        this.editSkuInfo.stockList = res.data;
      })
    },
    cancelSkuEdit() {
      this.editSkuInfo = Object.assign({},editSkuData)
    },
    saveSkuEdit() {
      let pid = this.editSkuInfo.productId
      let stockList = this.editSkuInfo.stockList
      skuUpdate(pid,stockList).then(res=>{
        this.editSkuInfo = Object.assign({},editSkuData)
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
      })
    },
    getList() {
      productList(this.listQuery).then((res) => {
        this.listData = res.data.list;
        this.total = res.data.total
        this.listLoading = false;
      });
    },
    getBrandList() {
      listBrand().then((res) => (this.brandOptions = res.data));
    },
    getProductCateList() {
      listWithChildren().then((res) => {
        this.productCategoryOptions = res.data;
        this.copyTransFun(this.productCategoryOptions);
      });
    },
    //操作
    view(row) {},
    edit(row) {},
    blog(row) {},
    remove(row) {
      let ids = []
      ids.push(row.id)
      this.deleteStatus(ids)
      this.getList()
    },
    transferFlag(num) {},
    copyTransFun(arr) {
      arr.forEach((item) => {
        if (item.id) {
          item.value = item.id;
          delete item.id;
        }
        if (item.name) {
          item.label = item.name;
          delete item.name;
        }
        if (item.children && item.children.length > 0) {
          this.copyTransFun(item.children);
        }
      });
    },
    //批量操作
    bulkDo(){
      let select = this.selectOpration
      if(select == null || select.length==0){
        this.$message({
          message: '请先选择操作',
          type: 'warning',
        })
        return
      }
      this.$confirm('是否进行批量操作','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        let ids = this.multipleSelection.map(item=>item.id)
        if(ids.length<1){
          this.$message({
            message: '请选择操作项',
            type: 'warning'
          })
          return
        }
        select = this.handlerOperation(select,[1,2],[3,4],[5,6])
        if(select.includes(1)){
          this.publishStatuChange(ids,1)
        }
        if(select.includes(2)){
          this.publishStatuChange(ids,0)
        }
        if(select.includes(3)){
          this.recommandStatuChange(ids,1)
        }
        if(select.includes(4)){
          this.recommandStatuChange(ids,0)
        }
        if(select.includes(5)){
          this.newStatuChange(ids,1)
        }
        if(select.includes(6)){
          this.newStatuChange(ids,0)
        }
        if(select.includes(7)){
          console.log(this.listQuery.productCategoryId)
        }
        if(select.includes(8)){
          this.deleteStatus(ids)
        }
        this.getList()
      })
    },
    handlerOperation(arr,...args){
      for(let arg of args){
        let a = arg[0]
        let b = arg[1]
        if(arr.includes(a) && arr.includes(b))
        arr = arr.filter(this.operationFilter(a,b))
      }
      return arr;
    },
    operationFilter(a,b){
      return function(item){
        return item !== a && item !== b
      }
    },
    //分页处理
    handleSizeChange(val){
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val){
      this.listQuery.pageNum = val
      this.getList()
    }
  },
  filters: {
    verifyStatusTransfer(num) {
      if (num == 0) {
        return "未审核";
      } else {
        return "审核通过";
      }
    },
  },
  created() {
    this.getList();
    this.getBrandList();
    this.getProductCateList();
  },
};
</script>

<style lang="less" scoped>
.searchForm {
  padding: 20px;
  margin-left: 20px;
  .el-form-item {
    margin-left: 20px;
  }
}
</style>