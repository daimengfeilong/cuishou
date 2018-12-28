<style lang="less">
  .rateTable{
    .el-radio__label{
      display: none;
    }
  }
  .voucherImg{
    display: inline-block;
    width: 30%;
    height: 200px;
    margin-right: 3%;
    overflow-y: hidden;
    cursor: pointer;
    border: 1px solid #e5e5e5;
    img{
      width: 100%;
    }
  }
  .bigImg{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 5000;
    width: 100%;
    text-align: center;
    img{
      max-width: 70%;
    }
  }
</style>
<template>
    <div>
      <el-form :inline="true" label-width="80px" class="mt15">
        <el-form-item label="贷款编号">
          <el-input v-model="searchJson.loanNo" clearable size="small"></el-input>
        </el-form-item>


        <el-form-item label="审核状态">
          <el-select v-model="searchJson.auditStatus" size="small" placeholder="请选择">
            <el-option v-for="item in statusArr" :label="item.value" :value="item.code" :key="item.code"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" @click="goSearch()">查询</el-button>
          <el-button size="small" @click="resetSearch()">重置</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-top: -10px;margin-bottom: 10px;" >
        <el-button  size="small" @click="openModel(true)">详情</el-button>
        <el-button  size="small" @click="openModel(false)">审核</el-button>
      </div>

      <el-row>
        <el-table class="rateTable" :data="list" highlight-current-row style="width: 100%">
          <el-table-column width="55" align="center">
            <template slot-scope="scope">
              <el-radio v-model="caseId" :label="scope.row.caseId + scope.row.id" @click.native.prevent="clickItem(scope.row)">01</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="loanNo" label="贷款编号" show-overflow-tooltip min-width="200"></el-table-column>
          <el-table-column prop="auditStatus" label="审核状态" width="100" align="center"></el-table-column>
          <el-table-column prop="period" label="期数" align="center"></el-table-column>
          <el-table-column prop="repayDate" label="账单日" width="120" align="center"></el-table-column>
          <el-table-column prop="custName" label="客户姓名" show-overflow-tooltip width="130" align="center"></el-table-column>
          <el-table-column prop="devideType" label="减免类型" width="100" align="center"></el-table-column>
          <el-table-column prop="devideAmount" label="减免金额" width="80" align="center"></el-table-column>
          <el-table-column prop="auditUserId" label="录入人" show-overflow-tooltip min-width="130" align="center"></el-table-column>
          <el-table-column prop="insertDate" label="录入时间" width="180" align="center"></el-table-column>
        </el-table>
      </el-row>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.pageNo"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </div>

      <el-dialog
        :title="modelTitle"
        :visible.sync="dialogVisible"
        width="60%" @close="closeBigImg">
        <div class="modelFormContainer">
            <table>
              <tr>
                <td>贷款编号</td>
                <td>
                 {{creditInfo.loanNo}}
                </td>
                <td>客户名称</td>
                <td>
                  {{creditInfo.custName}}
                </td>
              </tr>
              <tr>
                <td>账单日</td>
                <td>
                  {{creditInfo.repayDate}}
                </td>
                <td>期数</td>
                <td>
                  {{creditInfo.period}}
                </td>
              </tr>
              <tr>
                <td>减免类型</td>
                <td> {{creditInfo.devideTypeDisplay}}</td>
                <td>减免金额</td>
                <td>
                  {{creditInfo.devideAmount}}
                </td>
              </tr>
              <tr>
                <td>录入人</td>
                <td>  {{creditInfo.applyUserName}}</td>
                <td>录入时间</td>
                <td>
                  {{creditInfo.insertDate}}
                </td>
              </tr>
              <tr>
                <td>备注</td>
                <td colspan="3">
                  {{creditInfo.remark}}
                </td>
              </tr>
              <tr>
                <td valign="top">凭证</td>
                <td colspan="3">
                 <div class="voucherImg" v-for="(item,index) in voucherImgList"
                      :key="index" @click="enlarge(item)">
                   <img :src="item" alt="">
                 </div>
                </td>
              </tr>

            </table>
        </div>

        <span slot="footer" class="dialog-footer" v-if="!isView">
          <el-button size="small" type="primary" @click="audit('1')">通过</el-button>
          <el-button  size="small" @click="audit('2')"  type="danger">驳回</el-button>
        </span>
      </el-dialog>

      <div class="bigImg" v-show="showBigImg" @click="closeBigImg">
        <img :src="imgUrl" alt="">
      </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        searchJson:{
          loanNo:"",
          auditStatus:""
        },
        statusArr: [
//          {
//            "code": "1",
//            "value": "审核通过"
//          }
        ],
        list:[],
        caseId: "",
        totalCount: 1,
        "page":{
          "pageNo": 1,
          "pageSize":10
           },
        dialogVisible:false,
        creditInfo:{},//减免信息
        currentId:"",//选中行号Id
        recordId:"",//选中当前行记录Id
        currentRow: {},
        isView:false,//是否紧紧为预览
        modelTitle:"",
        voucherImgList: [],
        showBigImg: false,
        imgUrl: ""
      }
    },
    created(){
      let that=this
//      that.getList()
      that.getAuditStatus()
    },
    methods:{
      getAuditStatus () {
        let that = this
        that.$axios.get(api + "/ngcos/collectionDevideInfo/getAuditStatus").then(function (res) {
          let { code, message, data } = res.data
          if (code == "200") {
            that.statusArr = data.list
          } else {
            that.$message(message)
          }
        }).catch()
      },
      /**************************
       函数描述:审核操作
       人员：zzm（姓名简称）
       **************************/
      audit:function(val){
        let that=this
        //审核状态：1.审核通过 2.审核驳回 3.待审核
        that.$http.post(api+'/ngcos/collectionDevideInfo/auditDevideInfo',
          {
            caseId: that.creditInfo.caseId, //案件流水号
            loanNo: that.creditInfo.loanNo, //贷款编号
            period: that.creditInfo.period, //期数
            auditStatus: val //审核状态：1.审核通过 2.审核驳回 3.待审核
        }).then(function(response) {
          that.$message({message: response.data.message,type: 'success'});
          if (response.data.code==200) {
            that.getList() //重新拉取列表数据
            that.dialogVisible=false //当请求的数据成功，关闭窗体
          }

        }).catch(function (response) {})

      },
      /**************************
       函数描述:减免信息详情查询
       人员：zzm（姓名简称）
       **************************/
      getCreditInfo:function(){
        let that=this
        that.$http.post(api+'/ngcos/collectionDevideInfo/queryDevInfoDetailByPk',{params:{id:that.recordId}})
          .then(function(response) {

            if(response.data.code==200)
            {
              let result=response.data.data
              that.creditInfo=result
              that.voucherImgList = result.caseSysAttList
              that.dialogVisible=true //当请求的数据成功，激活模态框
            }
            else
            {
              that.$message({
                message: response.data.message,
                type: 'error'
              });
            }

          })
          .catch(function (response) {
          })

      },
      /**************************
       函数描述:打开弹出框
       人员：zzm（姓名简称）
       **************************/
      openModel(viewStatus){
        let that=this
        that.isView = viewStatus
        that.modelTitle = that.isView?"详情":"审核"
        if (that.caseId === "") {
          that.$message({
            message: '请先选择一项案件！',
            type: 'error'
          });
          return false;
        } else if (that.currentRow.auditStatus == "审核驳回" && !that.isView) {
          that.$message.error("不能重复审核被驳回的案件")
          return false;
        }
        that.getCreditInfo()
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
          done();
      })
      .catch(_ => {});
      },
      /**************************
       函数描述:重置查询条件
       人员：zzm（姓名简称）
       **************************/
      resetSearch:function(){
        let that = this
        that.searchJson={loanNo:"",auditStatus:""}
        that.goSearch()
      },
      /**************************
       函数描述:根据查询条件 请求api
       人员：zzm（姓名简称）
       **************************/
      goSearch:function(){
        let that = this
        that.page.pageNo=1
        that.getList()
      },
      /**************************
       函数描述:获取当前列表页数据
       人员：zzm（姓名简称）
       **************************/
      getList:function(){
        let that = this
        let sendJson={}
        that.caseId=""  //重置选中项
        sendJson=that.page
        sendJson.params=that.searchJson
        that.$http.post(api+'/ngcos/collectionDevideInfo/queryDevideInfoList',sendJson)
          .then(function(response) {
            let result=response.data.data
            that.list = result.list
            that.totalCount = result.total
          })
          .catch(function (response) {
          })
      },
      clickItem (row) {
        let that = this
        that.caseId = row.caseId + row.id
        that.recordId = row.id
        that.currentRow = row
      },
      /**************************
       函数描述:翻页
       人员：zzm（姓名简称）
       **************************/
      handleSizeChange:function(val) {
        let that = this
        that.page.pageSize=val
        that.getList()

      },
      /**************************
       函数描述:修改当前pageNo
       人员：zzm（姓名简称）
       **************************/
      handleCurrentChange:function(val) {
        let that = this
        that.page.pageNo=val
        that.getList()
      },
      enlarge (url) {   //放大图片
        let that = this
        that.imgUrl = url
        that.showBigImg = true
      },
      closeBigImg () {
        this.showBigImg = false
      }
    }
  }
</script>
