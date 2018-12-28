<style lang="less">

</style>
<template>
  <div class="">
    <div class="">
      <el-form :inline="true" :model="formJson" class="demo-form-inline">
        <el-form-item label="贷款编号">
          <el-input size="small" v-model="formJson.loanNo" placeholder="贷款编号"></el-input>
        </el-form-item>
        <el-form-item label="操作类型" class="">
          <el-select size="small" v-model="formJson.dealType" placeholder="请选择">
            <el-option v-for="item in handleType" :label="item.msg" :value="item.code"
                       :key="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作人姓名">
          <el-input size="small" v-model="formJson.rowAddUserName" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="操作时间">
          <el-date-picker size="small" type="daterange" value-format="yyyy-MM-dd" v-model="handleDate" @change="chooseDate"
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item class="ml10">
          <el-button size="small" type="primary" @click="queryLog">查询</el-button>
          <el-button size="small" @click="resetForm()">重置</el-button>
          <el-button @click="goBack" size="small" icon="el-icon-back">返回</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="loanNo" label="贷款编号" width="180" align="center"></el-table-column>
        <el-table-column prop="dealAgoName" label="变更前处理人" align="center"></el-table-column>
        <el-table-column prop="dealNowName" label="变更后处理人" align="center"></el-table-column>
        <el-table-column prop="dealTypeName" label="操作类型" align="center"></el-table-column>
        <el-table-column prop="rowAddUser" label="操作人姓名" align="center"></el-table-column>
        <el-table-column prop="rowAddTime" label="操作时间" align="center"></el-table-column>
      </el-table>

      <div class="pag-index">
        <el-pagination
          style="margin-top:20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listData.pageNum"
          :pager-count="7"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="listData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listData.total"
        >
        </el-pagination>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data () {
      return {
        pageJson: {
          pageNo: "1",
          pageSize: "10"
        },
        paramJson: {
          caseId: this.caseId
        },
        formJson: {
          "loanNo": "",
          "dealType": "",  //操作类型
          "rowAddUserName": "",  //操作人姓名
          "rowAddTimeBegin": "",  //操作时间(开始)
          "rowAddTimeEnd": ""   //操作时间(结束)
        },
        userId: "",
        handleType: [
//          {
//            "code": "100009",
//            "msg": "委外"
//          }
        ],
        handleDate: [],
        tableData: [],
        listData: {},
        allotJson: {
        	"caseId": this.caseId,//案件编号
					"groupNo": "",//小组编号
					"userId": ""//工号
        }
      }
    },
    created () {
      const that = this
      that.getHandleType()
      that.formJson.loanNo = that.$route.query.loanNo
      that.queryLog()
    },
    methods: {
      getHandleType () {
        let that = this
        that.$axios.get(api + "/ngcos/collectionCaseQuery/queryDealType").then(function (res) {
          let result = res.data, { data, code, message } = result
          if (code == "200") {
            that.handleType = data.list
          } else {
            that.$message.warning(message);
          }
        }).catch()
      },
      chooseDate (date) {
        let that = this
        that.handleDate = date
        that.formJson.rowAddTimeBegin = date[0]
        that.formJson.rowAddTimeEnd = date[1]
      },
      queryLog () {
        let that = this, sendJson = that.pageJson
        sendJson.params = that.formJson
        that.$axios.post(api + "/ngcos/collectionCaseQuery/queryCaseOperateLog", sendJson).then(function (res) {
          let result = res.data, { code, message, data } = result
          if (code == "200") {
            that.tableData = data.list
            delete data.list
            that.listData = data
          } else {
            that.$message(message);
          }

        }).catch()
      },
      resetForm () {
        const that = this
        for (let item in that.formJson) {
          that.formJson[item] = ''
        }
        that.handleDate = []
      },
      handleSizeChange (val) {
        const that = this
        that.pageJson.pageSize = val
        that.queryLog()
      },
      handleCurrentChange (val) {
        this.pageJson.pageNo = val
        this.queryLog()
      },
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>
