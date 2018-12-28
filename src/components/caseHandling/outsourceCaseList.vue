<style lang="less">
  .avatar-uploader{
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<template>
  <div class="caseList">
    <el-row>
      <el-form :inline="true" :model="paramJson" class="caseList-form">
        <el-form-item label="贷款编号">
          <el-input size="small" v-model="paramJson.loanNo" placeholder="贷款编号"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input size="small" v-model="paramJson.certNo" placeholder="身份证号"></el-input>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-select size="small" v-model="paramJson.orgId" placeholder="请选择">
            <el-option v-for="item in deputeOrg" :label="item.organizationName" :value="item.organizationcode"
                       :key="item.organizationcode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收状态">
          <el-select size="small" v-model="paramJson.collectionStatus" placeholder="请选择">
            <el-option v-for="item in collectionStatus" :label="item.collectionStateName"
                       :value="item.collectionStateCode" :key="item.collectionStateCode"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-row>

    <el-row class="btn-group">
      <el-button size="small" type="primary" @click="clickEvent(1)">查看详情</el-button>
      <el-button class="mb10" size="small" type="primary" @click="clickEvent(2)">取消委外</el-button>
      <el-button class="mb10" size="small" type="primary" @click="clickEvent(3)">导入取消委外</el-button>
      <el-button class="mb10" size="small" type="primary" @click="clickEvent(4)">导出</el-button>
      <el-button class="mb10" size="small" type="primary" @click="clickEvent(5)">操作日志</el-button>
      <el-button size="small" class="pull-right" @click="resetForm()">重置</el-button>
      <el-button size="small" type="primary" class="pull-right" @click="submitQuery()">查询</el-button>
    </el-row>

    <el-row>
      <template>
        <el-table :data="tableData" highlight-current-row @row-click="handleRow" style="width: 100%">
          <el-table-column width="55" align="center">
            <template slot-scope="scope">
              <el-radio v-model="caseId" :label="scope.row.caseId">01</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="caseId" label="案件编号" show-overflow-tooltip min-width="160"></el-table-column>
          <el-table-column prop="loanNo" label="贷款编号" show-overflow-tooltip min-width="160"></el-table-column>
          <el-table-column prop="custName" label="客户姓名" width="100" align="center"></el-table-column>
          <el-table-column prop="certNo" label="身份证号" min-width="180"></el-table-column>
          <el-table-column prop="caseStatuName" label="催收状态" width="100" align="center"></el-table-column>
          <el-table-column prop="sumOverdueAmt" label="逾期金额" width="100" align="center"></el-table-column>
          <!--<el-table-column prop="overdueNum" label="逾期期数" width="80" align="center"></el-table-column>-->
          <!--<el-table-column prop="ovduAmt" label="滞纳金" width="130" align="center"></el-table-column>-->
          <el-table-column prop="minRepayDay" label="逾期开始时间" width="180" align="center"></el-table-column>
          <el-table-column prop="maxRepayDay" label="逾期结束时间" width="180" align="center"></el-table-column>
          <!--<el-table-column prop="rdLoanAmt" label="剩余本金" width="130" align="center"></el-table-column>-->
          <el-table-column prop="chanNoName" label="资金渠道" width="130" align="center"></el-table-column>
          <!--<el-table-column prop="callTimes" label="催收次数" width="80" align="center"></el-table-column>-->
          <!--<el-table-column prop="promiseRepayTime" label="承诺还款时间" show-overflow-tooltip min-width="130" align="center"></el-table-column>-->
          <!--<el-table-column prop="collcectionName" label="处理人" width="80" align="center"></el-table-column>-->
          <!--<el-table-column prop="groupName" label="所属组" show-overflow-tooltip width="150" align="center"></el-table-column>-->
          <el-table-column prop="deputeOrgName" label="所属机构" min-width="120" align="center"></el-table-column>
          <el-table-column prop="urgeNum" label="委外天数" width="80" align="center"></el-table-column>
          <el-table-column prop="rowUpdateTime" label="处理时间" show-overflow-tooltip min-width="130" align="center"></el-table-column>
        </el-table>
      </template>
      <div class="pag-index">
        <el-pagination
          style="margin-top:20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listData.pageNum"
          :pager-count="11"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="listData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listData.total"
        >
        </el-pagination>
      </div>

      <el-dialog :title="dialogTit" :visible.sync="showDialog" center>

        <el-upload
          class="avatar-uploader"
          :action="importUrl"
          ref="upload"
          name="file"
          :headers="requestHeader"
          :show-file-list="true"
          :auto-upload="false"
          :multiple="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :on-change="handleChange">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">只能Excel文件，且不超过10MB</div>
        </el-upload>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="downloadTemplate">下载模板</el-button>
          <el-button type="primary" @click="submitUpload">确定导入</el-button>
          <el-button @click="showDialog = false">取 消</el-button>
        </div>
      </el-dialog>
    </el-row>

  </div>
</template>
<script>
  import {fileDownload} from '../../assets/js/fileDownload'

  export default {
    name: 'app',
    data () {
      return {
        requestHeader:{
          Authorization: localStorage.getItem('token')
        },
        pageJson: {
          pageNo: "1",
          pageSize: "10"
        },
        paramJson: {
          "caseId": "",//案件编号
          "loanNo": "",//贷款编号   202041712081359024112444634576
          "certNo": "",
          "collectionStatus": "",  //案件状态(码值）
          "orgId": ""//委外标记（码值）
        },
        cancelJson: {
          "caseId": "",//案件编号
          "loanNo": "",
          "repayNum": "",
          "deputeOrgId": "",//委外机构码
          "deputeNotes": "",//委外备注内容
          "days": ""//委外天数
        },
        deputeOrg: [],
        collectionStatus: [],
        isManager: true,
        showAllot: false,
        showOutsource: false,
        dialogTit: "",
        importUrl: "",
        showDialog: false,
        imageUrl: '',
        caseId: '',
        currentRow: {},
        tableData: [
//          {
//            "id": 186645,//案件id
//            "caseId": "19d2fbbca1f111e88cb800163e10c83f",//案件编号
//            "loanNo": "2018081500001",//贷款编号
//            "custNo": "201800001",//会员编号
//            "caseResources": "10001",//案件来源（码值）
//            "caseResourceName": "DAINIHAI",//案件来源
//            "caseStatus": 10000,//案件状态（码值）
//            "caseStatuName": "催收中",//案件状态
//            "collcectionName": "邓明建 ",//处理人
//            "groupName": "D1",//分组名
//            "rowUpdateTime": null,//更新时间
//            "groupId": "2018081500004",//分组id
//            "userId": "01050573",//处理人id
//            "promiseRepayTime": "2018-08-27",//承诺还款时间
//            "callTimes": 3,//催收次数
//            "custName": "宋慧乔",//贷款人姓名
//            "certNo": "513722199901010827",//身份证号
//            "sumOverdueAmt": null,//逾期总金额
//            "overdueNum": null,//逾期期数
//            "deputeOrgName":"委外机构1"//委外标记
//          }
        ],
        listData: {//返回内容
//          "total": 1,//列表总数
//          "pageNum": 1,//几页
//          "pageSize": 10,//每页大小
//          "size": 1,
//          "startRow": 1,
//          "endRow": 1,
//          "pages": 1,//页数
//          "prePage": 0,//上一页
//          "nextPage": 0,//下一页
//          "isFirstPage": true,//是否是第一页
//          "isLastPage": true,//是否是第二页
//          "hasPreviousPage": false,
//          "hasNextPage": false,
//          "navigatePages": 8,
//          "navigatepageNums": [
//            1                  //显示1,2，3,4,5页
//          ],
//          "navigateFirstPage": 1,
//          "navigateLastPage": 1,
//          "lastPage": 1,// 最后一页
//          "firstPage": 1 //第一页
        }
      }
    },
    components: {},
    created () {
      const that = this
      that.getDeputeOrg()
      that.getCollectionState()
    },
    methods: {
      getDeputeOrg () {   //获取委外机构
        let that = this
        that.$axios.get(api+"/ngcos/collectionCaseQuery/getAllDeputeOrg").then(function (res) {
          let result = res.data
          if (result.code == "200") {
            if (result.data.list.length > 0) {
              that.deputeOrg = result.data.list
            }
          } else {
            that.$message(result.message);
          }
        }).catch()
      },
      getCollectionState () {   //获取案件状态
        const that = this
        that.$axios.get(api+"/ngcos/collectionCaseQuery/getCollectionState").then(function (res) {
          const result = res.data
          if (result.code == "200") {
            if (result.data.list.length > 0) {
              that.collectionStatus = result.data.list
            }
          } else {
            that.$message(result.message);
          }
        }).catch()
      },
      submitQuery () {   //查询
        let that = this, sendJson = {}
        sendJson = that.pageJson
        sendJson.params = that.paramJson

        that.$axios.post(api+"/ngcos/collectionCaseQuery/queryDeputeList", sendJson).then(function (res) {
          let result = res.data
          if (result.code == "200") {
            that.tableData = result.data.list
            delete result.data.list
            that.listData = result.data
          } else {
            that.$message(result.message);
          }
        }).catch()
      },
      resetForm () {
        const that = this
        for (let item in that.paramJson) {
          that.paramJson[item] = ''
        }
      },
      handleRow (row) {
        this.caseId = row.caseId
        this.currentRow = row
      },
      clickEvent (type) {
        const that = this
        switch (type) {
          case 1:
            //查看详情
            if (that.caseId) {
              that.$router.push({
                name: "caseDetail",
                query: {
                  caseId: that.caseId,
                  loanNo: that.currentRow.loanNo
                }
              })
            } else {
              that.$message.error('请先选择一项案件');
            }
            break;
          case 2:
            //取消委外
            if (that.caseId) {
              that.$confirm('确定将所选案件取消委外吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(function () {
                that.cancelOutsource()
              }).catch(function () {

              });
            } else {
              that.$message.error('请先选择一项案件')
            }
            break;
          case 3:
            //导入取消委外
            that.dialogTit = "导入取消委外"
            that.importUrl = api+"/ngcos/collectionCaseDeal/importdepute"
            that.showDialog = true
            break;
          case 4:
            //导出
            that.exportCase()
            break;
          case 5:
            //操作日志
            if (that.caseId) {
              that.$router.push({
                name: "handleLog",
                query: {
                  loanNo: that.currentRow.loanNo
                }
              })
            } else {
              that.$message.error('请先选择一项案件');
            }
            break;
        }

      },
      cancelOutsource () {
        let that = this
        that.cancelJson.caseId = that.currentRow.caseId
        that.cancelJson.loanNo = that.currentRow.loanNo
        that.cancelJson.repayNum = that.currentRow.overdueNum
        that.cancelJson.deputeOrgId = that.currentRow.deputeOrgId
        that.cancelJson.deputeNotes = that.currentRow.deputeNotes
        that.cancelJson.days = that.currentRow.deputeDay
        that.$axios.post(api + "/ngcos/collectionCaseDeal/cancelDepute", that.cancelJson).then(function (res) {
          let result = res.data, {code, data, message} = result
          if (code == "200") {
            that.$message.success(message)
            that.submitQuery()
          } else {
            that.$message.error(message)
          }
        }).catch()
      },
      exportCase () {   //导出
        let that = this
        that.$axios.post(api+"/ngcos/collectionCaseQuery/excelExport", { "params":that.paramJson }, {responseType: 'blob'}).then(function (res) {
          let result = res.data, fileType = res.headers["content-disposition"].substr(res.headers["content-disposition"].indexOf('.'))
          fileDownload(result, `${new Date().getTime()}${fileType}`)
          that.$message.success("导出成功")
        }).catch()
      },
      downloadTemplate () {
        let that = this, url
        if (that.dialogTit == "导入取消委外") {
          url = api+'/ngcos/collectionCaseDeal/outTemplate'
        }
        if (that.dialogTit == "导入分配") {
          url = api+'/ngcos/allot/downAllotTemplate'
        }
        that.$axios.get(url, {responseType: 'blob'}).then(function (res) {
          let result = res.data, fileType = res.headers["content-disposition"].substr(res.headers["content-disposition"].indexOf('=')+1)
          let fileName = decodeURI(fileType)
          fileDownload(result, `${fileName}`)
          that.$message.success("下载成功")
        }).catch()
      },
      handleSizeChange (val) {
        const that = this
        that.pageJson.pageSize = val
        that.submitQuery()
      },
      handleCurrentChange (val) {
        this.pageJson.pageNo = val
        this.submitQuery()
      },
      handleAvatarSuccess (res, file, fileList) {
        let that = this
        that.imageUrl = ""
        fileList.length = 0
        if (res.code == "200") {
          that.$message({
            type: 'info',
            message: res.message,
            onClose: function () {
              that.showDialog = false
            }
          })
        } else {
          that.$message.error(res.message)
        }
      },
      handleAvatarError (res, file) {
        this.$message(res.message)
      },
      handleChange (file, fileList) {
        console.log(file)
        console.log(fileList)
        let that = this, isExcel = file.name.substr(file.name.indexOf('.') + 1).toLowerCase(), isLt10M = file.size / 1024 / 1024 < 10
        if (isExcel !== "xlsx" && isExcel !== "xls") {
          that.$message.error("只能上传Excel文件")
          that.imageUrl = ""
          fileList.length = 0
          return false;
        } else if (!isLt10M) {
          this.$message.error('上传文件大小不能超过10MB!');
          that.imageUrl = ""
          fileList.length = 0
          return false;
        }
        if (fileList.length > 1) {
          fileList.shift()
        }
        if (file.status == "ready") {
          that.imageUrl = require("@/assets/image/icon_excel.png");
        }
      },
      submitUpload () {
        this.$refs.upload.submit();
      }
    }
  }
</script>
