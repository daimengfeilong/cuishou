<style lang="less">

</style>
<template>
  <div class="caseList">
    <el-row>
      <el-form :inline="true" :model="paramJson" class="caseList-form">
        <el-col :span="6">
          <el-form-item label="贷款编号">
            <el-input size="small" v-model="paramJson.loanNo" placeholder="贷款编号"></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="6">-->
          <!--<el-form-item label="客户姓名">-->
            <!--<el-input size="small" v-model="paramJson.custName" placeholder="客户姓名"></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <el-col :span="6">
          <el-form-item label="身份证号">
            <el-input size="small" v-model="paramJson.certNo" placeholder="身份证号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="处理人">
            <el-input size="small" v-model="paramJson.dealUserId" placeholder="处理人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所属组">
            <el-select size="small" v-model="paramJson.groupNo" placeholder="请选择">
              <el-option v-for="item in allGroup" :label="item.groupName" :value="item.groupId"
                         :key="item.groupId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所属机构">
            <el-select size="small" v-model="paramJson.orgId" placeholder="请选择">
              <el-option v-for="item in deputeOrg" :label="item.organizationName" :value="item.organizationcode"
                         :key="item.organizationcode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="催收状态">
            <el-select size="small" v-model="paramJson.collectionStatus" placeholder="请选择">
              <el-option v-for="item in collectionStatus" :label="item.collectionStateName"
                         :value="item.collectionStateCode" :key="item.collectionStateCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!--<el-col :span="6">-->
          <!--<el-form-item label="案件来源">-->
            <!--<el-select size="small" v-model="paramJson.caseResources" placeholder="请选择">-->
              <!--<el-option v-for="item in caseSource" :label="item.msg"-->
                         <!--:value="item.code" :key="item.code"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <el-col :span="6">
          <el-form-item label="资金渠道">
            <el-select size="small" v-model="paramJson.chanNo" placeholder="请选择">
              <el-option v-for="item in channelList" :label="item.chanNoName"
                         :value="item.chanNo" :key="item.chanNo"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="协催人">
            <el-input size="small" v-model="paramJson.assistUser" placeholder="协催人"></el-input>
          </el-form-item>
        </el-col>
        <!--<el-col :span="6">-->
          <!--<el-form-item label="是否协催">-->
            <!--<el-select size="small" v-model="paramJson.isAssist" placeholder="请选择">-->
              <!--<el-option v-for="item in synergyType" :label="item.msg"-->
                         <!--:value="item.code" :key="item.code"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <el-col :span="18">
          <el-form-item label="逾期开始时间">
            <el-date-picker size="small" type="daterange" value-format="yyyy-MM-dd" v-model="overdueTime"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-row class="btn-group">
      <el-button size="small" type="primary" @click="clickEvent()">查看详情</el-button>
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
          <el-table-column prop="collectionStatus" label="催收状态" width="100" align="center"></el-table-column>
          <el-table-column prop="callTime" label="催收次数" width="80" align="center"></el-table-column>
          <el-table-column prop="dispatcherAmount" label="逾期金额" width="100"></el-table-column>
          <el-table-column prop="termContinuous" label="逾期期数" width="80" align="center"></el-table-column>
          <el-table-column prop="minRepayDate" label="逾期开始时间" width="180" align="center"></el-table-column>
          <el-table-column prop="maxRepayDate" label="逾期结束时间" width="180" align="center"></el-table-column>
          <!--<el-table-column prop="ovduAmt" label="滞纳金" width="130" align="center"></el-table-column>-->
          <!--<el-table-column prop="rdLoanAmt" label="剩余本金" width="130" align="center"></el-table-column>-->
          <!--<el-table-column prop="promiseRepayTime" label="承诺还款时间" show-overflow-tooltip min-width="130" align="center"></el-table-column>-->
          <el-table-column prop="deputeSign" label="所属机构" min-width="120" align="center"></el-table-column>
          <el-table-column prop="collectionUser" label="处理人" width="80" align="center"></el-table-column>
          <el-table-column prop="groupName" label="所属组" show-overflow-tooltip width="150" align="center"></el-table-column>
          <el-table-column prop="isAssistName" label="是否协催" show-overflow-tooltip width="150" align="center"></el-table-column>
          <el-table-column prop="assistUser" label="协催人" width="80" align="center"></el-table-column>
          <el-table-column prop="assistGroupName" label="所属协催组" show-overflow-tooltip width="150" align="center"></el-table-column>
          <el-table-column prop="chanNoName" label="资金渠道" width="130" align="center"></el-table-column>
          <el-table-column prop="deputeSign" label="委外标记" min-width="120" align="center"></el-table-column>
          <el-table-column prop="deputeSignDate" label="委外标记时间" min-width="120" align="center"></el-table-column>
          <el-table-column prop="urgeNum" label="委外天数" width="80" align="center"></el-table-column>
          <el-table-column prop="dealTime" label="创建时间" show-overflow-tooltip min-width="130" align="center"></el-table-column>
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

  </div>
</template>
<script>

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
          "loanNo": "",//贷款编号   202041712081359024112444634576
          "custName":"",  //客户名称
          "certNo": "",//身份证号
          "caseResources": "",//案件来源（码值）
          "groupNo": "",//分组id
          "groupName": "",//分组名
          "dealUserId": "",  //处理人
          "collectionStatus": "",  //案件状态(码值）
          "orgId": "",//委外标记（码值）
          "minRepayDayBegin": "",  //逾期开始时间（begin）
          "minRepayDayEnd": "",   //逾期结束时间（end）
          "chanNo": "",   //渠道码值
          "assistUser":"",  //协催人姓名
          "isAssist":""   //是否协催
        },
        allGroup: [],
        deputeOrg: [],
        collectionStatus: [],
        caseSource: [],
        channelList: [],
        synergyType: [],
        overdueTime: [],
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
      that.getAllGroup()
      that.getDeputeOrg()
      that.getCollectionState()
      that.getCaseSource()
      that.getChannel()
      that.getSynergyType()
    },
    methods: {
      getAllGroup () {   //获取所有组
        const that = this
        that.$axios.get(api+"/ngcos/collectionCaseQuery/getAllGroup").then(function (res) {
          const result = res.data
          if (result.code == "200") {
            if (result.data.list.length > 0) {
              that.allGroup = result.data.list
            }
          } else {
            that.$message(result.message);
          }

        }).catch()
      },
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
      getCaseSource () {   //获取案件来源
        let that = this
        that.$axios.get(api+"/ngcos/collectionCaseQuery/getSystemEnv").then(function (res) {
          const result = res.data
          if (result.code == "200") {
            if (result.data.list.length > 0) {
              that.caseSource = result.data.list
            }
          } else {
            that.$message(result.message);
          }
        }).catch()
      },
      getChannel () {   //获取资方渠道
        let that = this
        that.$axios.get(api+"/ngcos/collectionCaseQuery/getAllChan").then(function (res) {
          const result = res.data
          if (result.code == "200") {
            if (result.data.list.length > 0) {
              that.channelList = result.data.list
            }
          } else {
            that.$message.warning(result.message);
          }
        }).catch()
      },
      getSynergyType () {
        let that = this
        that.$axios.get(api + "/ngcos/collectionCaseQuery/getEnableState").then(function (res) {
          let result = res.data, { code, data, message } = result
          if (code == "200") {
            that.synergyType = data.list
          } else {
            that.$message.warning(message);
          }
        }).catch()
      },
      checkObj () {   //判断是否选择了查询条件
        let that = this, status = false;
        for (let item in that.paramJson) {
          if (that.paramJson[item] != "") {
            status = true;
            return status;
          }
        }
      },
      submitQuery () {   //查询
        let that = this, sendJson = {}
        sendJson = that.pageJson

        if (that.overdueTime && that.overdueTime.length > 0) {
          that.paramJson.minRepayDayBegin = that.overdueTime[0]
          that.paramJson.minRepayDayEnd = that.overdueTime[1]
        } else {
          that.paramJson.minRepayDayBegin = ""
          that.paramJson.minRepayDayEnd = ""
        }

        if (!that.checkObj()) {
          that.$message.error("请先任意选择一个条件查询")
          return false;
        }

        sendJson.params = that.paramJson
        that.$axios.post(api+"/ngcos/collectionCaseQuery/queryDealRecord", sendJson).then(function (res) {
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
        that.overdueTime = []
      },
      handleRow (row) {
        this.caseId = row.caseId
        this.currentRow = row
      },
      clickEvent () {
        const that = this
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
      },
      handleSizeChange (val) {
        const that = this
        that.pageJson.pageSize = val
        that.submitQuery()
      },
      handleCurrentChange (val) {
        this.pageJson.pageNo = val
        this.submitQuery()
      }
    }
  }
</script>
