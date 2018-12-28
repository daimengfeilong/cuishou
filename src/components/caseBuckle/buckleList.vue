<style lang="less">
  .statementDate{
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
      width: 185px;
    }
  }
</style>
<template>
  <div class="">
    <el-row>
      <el-form :inline="true" :model="paramJson" ref="queryForm" :rules="rules" class="caseList-form">
        <!--<el-form-item label="扣款状态">-->
          <!--<el-select size="small" v-model="paramJson.repayChannel" placeholder="请选择">-->
            <!--<el-option v-for="item in withholdStatus" :label="item.caseValue" :value="item.caseKey"-->
                       <!--:key="item.caseKey"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="资方渠道" prop="fundChannel">
          <el-select size="small" v-model="paramJson.fundChannel" placeholder="请选择">
            <el-option v-for="item in capitalChan" :label="item.caseValue" :value="item.caseKey"
                       :key="item.caseKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="条数" prop="batchNum">
          <el-select size="small" v-model="paramJson.batchNum" placeholder="请选择">
            <el-option v-for="item in barsNum" :label="item.caseKey"
                       :value="item.caseKey" :key="item.caseKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="statementDate" label="账单日" required>
          <el-form-item prop="sTime" style="margin-right: 0;">
            <el-date-picker size="small" type="date" value-format="yyyy-MM-dd" :picker-options="pickerOptions"
                            v-model="paramJson.sTime" placeholder="开始日期"></el-date-picker>
          </el-form-item>
          <span>至</span>
          <el-form-item prop="eTime">
            <el-date-picker size="small" type="date" value-format="yyyy-MM-dd" :picker-options="pickerOptions"
                            v-model="paramJson.eTime" placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitQuery('queryForm')">查询</el-button>
          <el-button size="small" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <el-row class="mb20">
      <el-button type="primary" size="small" @click="clickEvent()">案件批扣</el-button>
    </el-row>

    <el-row>
      <template>
        <el-table :data="tableData" highlight-current-row style="width: 100%">
          <!--<el-table-column width="55" align="center">
            <template slot-scope="scope">
              <el-radio v-model="caseId" :label="scope.row.caseId">01</el-radio>
            </template>
          </el-table-column>-->
          <el-table-column prop="loanNo" label="贷款编号" show-overflow-tooltip min-width="200"></el-table-column>
          <el-table-column prop="custName" label="客户姓名" width="100" align="center"></el-table-column>
          <el-table-column prop="certNo" label="身份证号" min-width="180"></el-table-column>
          <el-table-column prop="overAmount" label="逾期金额" width="100"></el-table-column>
          <el-table-column prop="overTerm" label="期数" width="80" align="center"></el-table-column>
          <el-table-column prop="repayDate" label="账单日" min-width="180" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="repayStatusDisplay" label="扣款状态" width="100" align="center"></el-table-column>
          <el-table-column prop="caseResources" label="资方渠道" min-width="100" align="center"></el-table-column>
          <el-table-column prop="shouldRepayAmount" label="当日应还平台金额" min-width="145" align="center"></el-table-column>
          <el-table-column prop="shouldRepayAllAmount" label="当前应还平台金额" min-width="145" align="center"></el-table-column>
          <el-table-column prop="shouldRepayFundAmount" label="当日应还资方金额" min-width="145" align="center"></el-table-column>
          <el-table-column prop="shouldRepayFundAllAmount" label="当前应还资方金额" min-width="145" align="center"></el-table-column>
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

    </el-row>
    <el-dialog title="批量代扣" :visible.sync="showDialog" :before-close="closeForm">
      <el-form :model="paramJson" :inline="true" :rules="rules" ref="paramJson" style="text-align: center;">
        <el-form-item label="扣款渠道" prop="repayChannel">
          <el-select v-model="paramJson.repayChannel" placeholder="请选择">
            <el-option v-for="item in channels" :label="item.caseValue"
                       :value="item.caseKey" :key="item.caseKey"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveSubmit('paramJson')">确定代扣</el-button>
        <el-button @click="closeForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

  export default {
    name: 'app',
    data () {
      return {
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() > Date.now();
          }
        },
        rules: {
          fundChannel: [
            {required: true, message: '请选择资方渠道', trigger: 'change'}
          ],
          batchNum: [
            {required: true, message: '请选择条数', trigger: 'change'}
          ],
          sTime: [
            {required: true, message: '请选择开始日期', trigger: 'change'}
          ],
          eTime: [
            {required: true, message: '请选择结束日期', trigger: 'change'}
          ],
          repayChannel: [
            {required: true, message: '请选择扣款渠道', trigger: 'change'}
          ]
        },
        pageJson: {
          pageNo: "1",
          pageSize: "10"
        },
        paramJson: {
          "repayChannel": "", 	//扣款渠道
          "fundChannel": "",		//资方渠道
          "sTime": "",	//开始时间
          "eTime": "",	//结束时间
          "batchNum": ""			//查询数量
        },
        withholdStatus: [
//          {caseKey: "31700001", caseValue: "扣款处理中"}
        ],
        capitalChan: [
//          {caseKey: "1001", caseValue: "JIUFU_ONE"}
        ],
        barsNum: [],
        channels: [
//          {caseKey: "31600001", caseValue: "支付宝"}
        ],
        isManager: true,
        showAllot: false,
        showOutsource: false,
        showDialog: false,
        caseId: '',
        tableData: [
//          {
//            caseResources: "32200001",
//            certNo: "522730198908151527",
//            custNo: "3fab178f942a446ea0d56d33ff59a98b",
//            env: null,
//            id: 1,
//            loanNo: "20015170417113048152",
//            overAmount: 834.9,
//            overStatus: "40000003",
//            overTerm: 18,
//            repayDate: "2018-10-16T16:00:00.000+0000",
//            repayStatus: "31700003",
//            rowAddTime: null,
//            rowAddUser: "system",
//            rowUpdateTime: "2018-10-19T02:37:31.000+0000",
//            rowUpdateUser: null
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
//      that.getWithholdStatus()
      that.getCapitalChan()
      that.getBarsNum()
      that.getWithholdChan()
    },
    methods: {
      getWithholdStatus () {   //获取扣款状态
        const that = this
        that.$axios.post(api + "/ngcos/collectionCaseDeal/getDeductStateEnum").then(function (res) {
          const result = res.data
          if (result.code == "200") {
            if (result.data.list.length > 0) {
              that.withholdStatus = result.data.list
            }
          } else {
            that.$message(result.message);
          }

        }).catch()
      },
      getCapitalChan () {   //资方渠道
        let that = this
        that.$axios.post(api + "/ngcos/collectionCaseDeal/getFundChannelEnum").then(function (res) {
          let result = res.data
          if (result.code == "200") {
            if (result.data.list.length > 0) {
              that.capitalChan = result.data.list
            }
          } else {
            that.$message(result.message);
          }
        }).catch()
      },
      getBarsNum () {   //获取条数
        const that = this
        that.$axios.post(api + "/ngcos/collectionCaseDeal/getBatchNumEnum").then(function (res) {
          const result = res.data
          if (result.code == "200") {
            if (result.data.list.length > 0) {
              that.barsNum = result.data.list
            }
          } else {
            that.$message(result.message);
          }
        }).catch()
      },
      submitQuery (formName) {   //查询
        let that = this, sendJson = {}
        that.$refs[formName].validate(function (valid) {
          if (valid) {
            sendJson = that.pageJson
            that.paramJson.batchNum = parseInt(that.paramJson.batchNum)
            sendJson.params = that.paramJson
            that.$axios.post(api + "/ngcos/collectionCaseDeal/queryBatchDeduct", sendJson).then(function (res) {
              let result = res.data
              if (result.code == "200") {
                that.tableData = result.data.list
                delete result.data.list
                that.listData = result.data
              } else {
                that.$message(result.message);
              }
            }).catch()
          } else {
            return false;
          }
        })
      },
      resetForm () {
        const that = this
        for (let item in that.paramJson) {
          that.paramJson[item] = ''
        }
        console.log(that.paramJson)
      },
      clickEvent () {
        const that = this
        if (that.tableData.length > 0) {
          that.showDialog = true
        } else {
          that.$message.error('请先筛选您要批扣的案件');
        }
      },
      handleSizeChange (val) {
        const that = this
        that.pageJson.pageSize = val
        that.submitQuery("queryForm")
      },
      handleCurrentChange (val) {
        this.pageJson.pageNo = val
        this.submitQuery("queryForm")
      },
      getWithholdChan () {   //获取扣款渠道
        let that = this
        that.$axios.post(api + "/ngcos/collectionCaseDeal/getRepayChannelEnum").then(function (res) {
          const result = res.data
          if (result.code == "200") {
            if (result.data.list.length > 0) {
              that.channels = result.data.list
            }
          } else {
            that.$message(result.message);
          }
        }).catch()
      },
      /**************************
       函数描述:关闭新增/编辑弹窗
       人员：yyp（姓名简称）
       **************************/
      closeForm(){
        this.$refs['paramJson'].resetFields() //清除验证
        this.showDialog = false
      },
      /**************************
       函数描述: 确定批扣
       人员：yyp（姓名简称）
       **************************/
      saveSubmit (formName){
        let that = this
        that.$refs[formName].validate(function (valid) {
          if (valid) {
            delete that.paramJson.statementDate
            that.$axios.post(api + "/ngcos/collectionCaseDeal/saveBatchDeduction", that.paramJson).then(function (res) {
              let result = res.data
              if (result.code == "200") {
                that.tableData = []
                that.$message.success(result.message);
                that.showDialog = false
                that.resetForm()
              } else {
                that.$message.warning(result.message);
              }
            }).catch()
          } else {
            return false;
          }
        })
      }
    }
  }
</script>
