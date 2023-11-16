<template>
  <el-form
    :model="data"
    size="mini"
    label-width="120px"
    label-suffix="："
    style="width: 800px;margin: 0 auto;"
  >
    <el-form-item label="赠送积分">
      <el-input v-model="giftPoint"></el-input>
    </el-form-item>
    <el-form-item label="赠送成长值">
      <el-input v-model="giftGrowth"></el-input>
    </el-form-item>
    <el-form-item label="积分购买限制">
      <el-input v-model="usePointLimit"></el-input>
    </el-form-item>
    <el-form-item label="预告商品">
      <el-switch
        v-model="previewStatus"
        :active-value="1"
        :inactive-value="0"
      ></el-switch>
    </el-form-item>
    <el-form-item label="商品上架">
      <el-switch
        v-model="publishStatus"
        :active-value="1"
        :inactive-value="0"
      ></el-switch>
    </el-form-item>
    <el-form-item label="商品推荐">
      新品&nbsp;
      <el-switch
        v-model="newStatus"
        :active-value="1"
        :inactive-value="0"
      ></el-switch>
      <span style="margin-left: 10px">推荐&nbsp;&nbsp;</span>
      <el-switch
        v-model="recommandStatus"
        :active-value="1"
        :inactive-value="0"
      ></el-switch>
    </el-form-item>
    <el-form-item label="服务保证">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="1"></el-checkbox>
        <el-checkbox label="2"></el-checkbox>
        <el-checkbox label="3"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="详细页标题">
      <el-input v-model="detailTitle"></el-input>
    </el-form-item>
    <el-form-item label="详细页描述">
      <el-input v-model="detailDesc"></el-input>
    </el-form-item>
    <el-form-item label="商品关键字">
      <el-input v-model="keywords"></el-input>
    </el-form-item>
    <el-form-item label="商品备注">
      <el-input
        v-model="note"
        type="textarea"
        :autosize="{minRows: 2, maxRows: 5}"
      ></el-input>
    </el-form-item>
    <el-form-item label="选择优惠方式">
      <el-radio-group v-model="promotionType">
        <el-radio-button :label="0">无优惠</el-radio-button>
        <el-radio-button :label="1">特惠促销</el-radio-button>
        <el-radio-button :label="2">会员价格</el-radio-button>
        <el-radio-button :label="3">阶梯价格</el-radio-button>
        <el-radio-button :label="4">满减价格</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      v-show="promotionType==1"
      class="promotion"
    >
      <div>
        开始时间：
        <el-date-picker
          v-model="promotionStartTime"
          type="datetime"
          placeholder="选择开始时间"
        ></el-date-picker>
      </div>
      <div>
        结束时间：
        <el-date-picker
          v-model="promotionEndTime"
          type="datetime"
          placeholder="选择结束时间"
        ></el-date-picker>
      </div>
      <div>
        促销价格：
        <el-input
          v-model="promotionPrice"
          placeholder="输入促销价格"
          style="width: 220px"
        ></el-input>
      </div>
    </el-form-item>
    <el-form-item
      v-show="promotionType==2"
      class="promotion"
    >
      <div
        v-for="item in memberPriceList"
        :key="item.memberLevelId"
      >
        {{item.memberLevelName}}：
        <el-input
          v-model="item.memberPrice"
          style="width: 220px"
        ></el-input>
      </div>
    </el-form-item>
    <el-form-item
      v-show="promotionType==3"
      class="promotion"
    >
      <el-table
        :data="productLadderList"
        border
        style="width: 80%;"
      >
        <el-table-column
          label="数量"
          align="center"
          width="120px"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.count"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="折扣"
          align="center"
          width="120px"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.discount"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="removeLadder(scope.$index,scope)"
            >删除</el-button>
            <el-button
              type="text"
              @click="addLadder"
            >添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
  </el-form>
</template>

<script>
import { fetchList } from "@/api/memberLevel";

export default {
  data() {
    return {
      data: {},
      giftPoint: 0,
      giftGrowth: 0,
      usePointLimit: 0,
      previewStatus: 0,
      publishStatus: 0,
      newStatus: 0,
      recommandStatus: 0,
      serviceIds: "",
      detailTitle: "",
      detailDesc: "",
      keywords: "",
      note: "",
      promotionType: 0,
      promotionStartTime: "",
      promotionEndTime: "",
      promotionPrice: null,
      //会员价格{memberLevelId: 0, memberPrice: 0, memberLevelName: null}
      memberPriceList: [],
      //商品阶梯价格
      productLadderList: [{ count: 0, discount: 0, price: 0 }],
      //商品满减
      productFullReductionList: [{ fullPrice: 0, reducePrice: 0 }],
      //商品属性相关{productAttributeId: 0, value: ''}
      productAttributeValueList: [],
      //商品sku库存信息{lowStock: 0, pic: '', price: 0, sale: 0, skuCode: '', spData: '', stock: 0}
      skuStockList: [],
      //商品相关专题{subjectId: 0}
      subjectProductRelationList: [],
      //商品相关优选{prefrenceAreaId: 0}
      prefrenceAreaProductRelationList: [],
    };
  },
  computed: {
    checkList: {
      get() {
        if (Boolean(this.serviceIds)) {
          let list = this.serviceIds.split(",");
          return list;
        } else {
          return [];
        }
      },
      set(value) {
        if (value != null && value.length > 0) {
          this.serviceIds = value.join(",");
        } else {
          this.serviceIds = null;
        }
      },
    },
  },
  methods: {
    addLadder(){
        if(this.productLadderList.length == 3){
            this.$message({
                message: '最顶只能添加3条',
                type: 'warning'
            })
            return;
        }
        this.productLadderList.push({ count: 0, discount: 0, price: 0 })
    },
    removeLadder(index,row){
        debugger
        if(this.productLadderList.length==1) {
            this.productLadderList = [{ count: 0, discount: 0, price: 0 }]
        }else{
            this.productLadderList.splice(index,1)
        }
    }
  },
  created() {
    fetchList({ defaultStatus: 0 }).then((res) => {
      let serviceIds = [];
      for (let i = 0; i < res.data.length; i++) {
        serviceIds.push({
          memberLevelId: res.data[i].id,
          memberLevelName: res.data[i].name,
        });
      }
      this.memberPriceList = serviceIds;
    });
  },
};
</script>

<style lang="less" scoped>
.promotion div {
  margin: 5px 0;
}
</style>