<style lang="less">
  .rateTable{
    .el-radio__label{
      display: none;
    }
  }
  .upload-demo{
    .el-upload-list--picture-card .el-upload-list__item, .el-upload--picture-card{
      width: 120px;
      height: 120px;
    }
    .el-upload--picture-card{
      line-height: 120px;
    }
  }
</style>
<template>
  <div>
    <el-form :inline="true" label-width="80px" class="mt15">
      <el-form-item label="贷款编号">
        <el-input v-model="searchJson.loanNo" clearable size="small"></el-input>
      </el-form-item>

      <el-form-item label="身份证">
        <el-input v-model="searchJson.certNo" clearable size="small"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="small" @click="goSearch()">查询</el-button>
        <el-button size="small" @click="resetSearch()">重置</el-button>
      </el-form-item>

        <!--<el-form-item>-->
          <!--<el-button  size="small" @click="openModel()">录入减免信息</el-button>-->
        <!--</el-form-item>-->

    </el-form>
    <div style="margin-top: -10px;margin-bottom: 10px;" >
      <el-button  size="small" @click="openModel()">录入减免信息</el-button>
    </div>
    <el-row>
      <el-table class="rateTable" :data="list" highlight-current-row style="width: 100%">
        <el-table-column width="55" align="center">
          <template slot-scope="scope">
            <el-radio v-model="caseId" :label="scope.row.caseId + scope.row.period" @click.native.prevent="clickItem(scope.row)">01</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="loanNo" label="贷款编号" show-overflow-tooltip min-width="200"></el-table-column>
        <el-table-column prop="custName" label="客户姓名" width="100" align="center"></el-table-column>
        <el-table-column prop="certNo" label="身份证号" min-width="180"></el-table-column>
        <el-table-column prop="repayDate" label="账单日" width="100" align="center"></el-table-column>
        <el-table-column prop="period" label="期数" width="100" align="center"></el-table-column>
        <el-table-column prop="loanAmt" label="本金" width="80" align="center"></el-table-column>
        <el-table-column prop="intAmt" label="利息" width="80" align="center"></el-table-column>
        <el-table-column prop="ovduAmt" label="滞纳金" show-overflow-tooltip min-width="130" align="center"></el-table-column>
        <el-table-column prop="svcAmt" label="服务费" width="80" align="center"></el-table-column>
        <el-table-column prop="accManAmt" label="账户管理费" show-overflow-tooltip width="150" align="center"></el-table-column>
        <el-table-column prop="insuAmt" label="保险费" min-width="120" align="center"></el-table-column>
        <el-table-column prop="poundageAmt" label="手续费" show-overflow-tooltip min-width="130" align="center"></el-table-column>
        <el-table-column prop="funAmt" label="违约金" show-overflow-tooltip min-width="130" align="center"></el-table-column>
        <el-table-column prop="outSvcAmt" label="委外服务费" show-overflow-tooltip min-width="130" align="center"></el-table-column>
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
      title="录入减免信息"
      :visible.sync="dialogVisible"
      width="60%" @close="cancelEntry">
      <div class="modelFormContainer">
        <table>
          <tr>
            <td>贷款编号</td>
            <td>
              <el-input  placeholder="请输入内容" v-model="form.loanNo" :disabled="true" size="small" clearable></el-input>
            </td>
            <td>客户名称</td>
            <td>
              <el-input  placeholder="请输入内容" v-model="form.custName" :disabled="true" size="small" clearable></el-input>
            </td>
          </tr>
          <tr>
            <td>账单日</td>
            <td>
              <el-input  placeholder="请输入内容" v-model="form.repayDate"  :disabled="true" size="small" clearable></el-input>
            </td>
            <td>期数</td>
            <td>
              <el-input  placeholder="请输入内容" v-model="form.period" :disabled="true" size="small" clearable></el-input>
            </td>
          </tr>
          <tr>
            <td>违约金</td>
            <td>
              <el-input  placeholder="请输入内容" v-model="form.funAmt"  :disabled="true" size="small" clearable></el-input>
            </td>
            <td>利息</td>
            <td>
              <el-input  placeholder="请输入内容" v-model="form.intAmt" :disabled="true" size="small" clearable></el-input>
            </td>
          </tr>
          <tr>
            <td>滞纳金</td>
            <td>
              <el-input  placeholder="请输入内容" v-model="form.ovduAmt"  :disabled="true" size="small" clearable></el-input>
            </td>
            <td>服务费</td>
            <td>
              <el-input  placeholder="请输入内容" v-model="form.svcAmt" :disabled="true" size="small" clearable></el-input>
            </td>
          </tr>
          <tr>
            <td>委外服务费</td>
            <td>
              <el-input  placeholder="请输入内容" v-model="form.outSvcAmt"  :disabled="true" size="small" clearable></el-input>
            </td>
            <td>账户管理费</td>
            <td>
              <el-input  placeholder="请输入内容" v-model="form.accManAmt" :disabled="true" size="small" clearable></el-input>
            </td>
          </tr>
          <tr>
            <td>保险费</td>
            <td>
              <el-input  placeholder="请输入内容" v-model="form.insuAmt"  :disabled="true" size="small" clearable></el-input>
            </td>
            <td>手续费</td>
            <td>
              <el-input  placeholder="请输入内容" v-model="form.poundageAmt" :disabled="true" size="small" clearable></el-input>
            </td>
          </tr>
          <tr>
            <td><span class="red">* </span>减免类型</td>
            <td>
              <el-select v-model="form.devideType" placeholder="请选择"  size="small" >
                <el-option v-for="(item,index) in reductionList" :label="item.value" :value="item.code" :disabled="item.code == '20001'" :key="index"></el-option>
              </el-select>
            </td>
            <td><span class="red">* </span>减免金额</td>
            <td>
              <el-input  placeholder="请输入金额" v-model="form.devideAmount" size="small" clearable></el-input>
            </td>
          </tr>
          <tr>
            <td>备注</td>
            <td colspan="3">
              <el-input v-model="form.remark" :maxlength="100" type="textarea" placeholder="请输入内容，最多100字" size="small" clearable></el-input>
            </td>
          </tr>
          <tr>
            <td valign="top"><span class="red">* </span>上传凭证</td>
            <td colspan="3">
              <p>
                <el-upload
                  class="upload-demo"
                  name="file"
                  :headers="requestHeader"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-upload="beforeAvatarUpload"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="10"
                  :on-exceed="handleExceed"
                  :on-success="handleSuccess"
                  :file-list="fileList" list-type="picture-card">
                  <i class="el-icon-plus"></i>
                  <div slot="tip" class="el-upload__tip">Tips:最多上传10张，每张图片的最大限定为1M</div>
                </el-upload>
                </p>
            </td>
          </tr>
        </table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addInfo()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogBigImg" width="60%">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        uploadUrl:api+"/ngcos/collectionDevideInfo/uploadAttachInfo",
        requestHeader:{
          Authorization: localStorage.getItem('token')
        },
        searchJson:{
          loanNo:"",
          certNo:""
        },
        list:[],
        caseId: "",
        totalCount: 1,
        "page":{
          "pageNo": 1,
          "pageSize":10
        },
        dialogVisible:false,
        dialogBigImg: false,
        dialogImageUrl: "",
        currentId:"",
        reductionList:[],
        fileList:[],
        certficateList:[],
        form: {
          caseId:"",//案件流水号
          loanNo:"",//贷款编号
          custName:"",
          period:"1",//期数
          repayDate:"",//账单日
          devideType:"",//减免类型
          devideAmount:"",//减免金额
          remark:"",//备注
          applyUserId:"",//录入人工号
          custNo:"",//客户号
          certificate:"", //上传附件(必传),多个附件以逗号相隔
          deletecertificate:"" //需要删除的附件id,多个附件以逗号相隔
        }
      }
    },
    created(){
      let that=this
//      that.getList()
      that.getReductionList()
    },
    methods:{
      /**************************
       函数描述:获取减免类型列表
       人员：zzm（姓名简称）
       **************************/
      getReductionList:function(){
        let that=this
        that.$http.get(api+'/ngcos/collectionDevideInfo/getDevideTypes')
          .then(function(response) {
            let result=response.data.data
            that.reductionList=result.list
          })
          .catch(function (response) {
          })

      },

      /**************************
       函数描述:保存添加信息，成功则关闭模态框，失败则弹出相关提示
       人员：zzm（姓名简称）
       **************************/
      addInfo:function(){
        let that=this
        that.form.applyUserId = localStorage.userId
        if (that.form.devideType == "" || that.form.devideAmount == "") {
          that.$message.warning("减免类型和减免金额不能为空")
          return false;
        }
        if (!/^((?!0)\d+(\.\d{1,2})?)$/g.test(that.form.devideAmount)) {
          that.$message.warning("请输入数字，可保留两位小数")
          return false;
        }
        if (!that.form.certificate) {
          that.$message.warning("请选择附件上传")
          return false;
        }
        that.$http.post(api+'/ngcos/collectionDevideInfo/saveDevideInfo',that.form)
          .then(function(response) {
            let { code, result, message } = response.data
            if (code == "200") {
              that.$message.success(message)
              that.dialogVisible = false  //关闭模态框
            } else {
              that.$message.error(message)
            }
          })
          .catch(function (err) {
            that.$message.error(err.data.message)
          })

      },
      cancelEntry () {   //取消录入
        let that = this
        that.fileList = [] //清空文件列表
        that.certficateList = []
        that.form.certificate = "" //清空附件列表
        that.form.devideType = ""
        that.form.devideAmount = ""
        that.form.remark = ""
      },
      /**************************
       函数描述:打开弹出框
       人员：zzm（姓名简称）
       **************************/
      openModel(){
        let that=this

        if (that.caseId === "") {
          that.$message({
            message: '请选中你要添加的选项！',
            type: 'warning'
          });
          return false
        }
        that.dialogVisible=true
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
        that.searchJson={loanNo:"",certNo:""}
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
        that.currentId=""  //重置选中项
        sendJson=that.page
        sendJson.params=that.searchJson
        that.$http.post(api+'/ngcos/collectionDevideInfo/queryLoanInfoList',sendJson)
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
        that.caseId = row.caseId + row.period
        that.form = {...that.form, ...row}
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
      /**************************
       函数描述:element 文件上传组件相关功能函数
       人员：zzm（姓名简称）
       **************************/
      handleRemove(file, fileList) {
        let that=this
        let delId=file.response.data.fileId
        let delIndex=-1
        for(var i=0;i<that.certficateList.length;i++)
        {
          if (delId==that.certficateList[i]) {
            delIndex=i
          }
        }
        if (i>0) {
          that.certficateList.splice(delIndex, 1);
        }
        that.form.certificate= that.certficateList.toString()
      },
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogBigImg = true;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleSuccess(response, file, fileList){
        let that=this
        if (response.code == "200") {
          that.certficateList.push(response.data.fileId)
          that.form.certificate = that.certficateList.toString()
        } else {
          that.$message({
            type: "error",
            message: response.message,
            onClose () {
              fileList.pop()
            }
          })
        }
      },
      beforeRemove(file, fileList) {
        return true
//        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt1M = file.size / 1024 / 1024 < 1;

        if (!isJPG) {
          this.$message.error('附件只能是png、jpg格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传图片大小不能超过1MB!');
        }
        return isJPG && isLt1M;
      }

    }
  }
</script>
