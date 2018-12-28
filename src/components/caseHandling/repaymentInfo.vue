<style lang="less">

</style>
<template>
  <div class="annexInfo">
    <div class="annexInfo-cnt">
      <p class="annexInfo-tit">还款信息 <i class="el-icon-error pull-right" @click="closeThis"></i></p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="loanNo" label="贷款编号" show-overflow-tooltip width="180" align="center"></el-table-column>
        <el-table-column prop="repayNum" label="期数" align="center"></el-table-column>
        <el-table-column prop="loanDate" label="账单日" align="center"></el-table-column>
        <el-table-column prop="totalAmount" label="应收总额" align="center"></el-table-column>
        <el-table-column prop="ovduAmt" label="应收滞纳金" min-width="120" align="center"></el-table-column>
        <el-table-column prop="realRepayAmount" label="还款金额" align="center"></el-table-column>
        <el-table-column prop="seltAmt" label="还款时间" align="center"></el-table-column>
        <el-table-column prop="realRepayChannel" label="还款渠道" align="center"></el-table-column>
        <el-table-column prop="seltAmt" label="结算标志" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'app',
    props: ["loanNo"],
    data () {
      return {
        pageJson: {
          pageNo: "1",
          pageSize: "10"
        },
        paramJson: {
          loanNo: ""
        },
        tableData: [
//          {
//            "loanNo": "2018081500001",//贷款编号
//            "repayNum": "5",//还款期数
//            "realRepayAmount": "100.02",//实际还款金额
//            "realRepayWay": "正常还款",//还款方式
//            "realRepayChannel": "支付宝",//还款渠道
//          }
        ]
      }
    },
    created () {
      const that = this
      that.paramJson.loanNo = that.loanNo
      that.getRepaymentInfo()
    },
    methods: {
      getRepaymentInfo () {
        let that = this, sendJson = that.pageJson
        sendJson.params = that.paramJson
        that.$axios.post(api+"/ngcos/collectionCaseQuery/queryRefundDetail", sendJson).then(function (res) {
          let result = res.data
          if (result.code == "200") {
            that.tableData = result.data.list
          } else {
            that.$message(result.message);
          }
        }).catch()
      },
      closeThis () {
        this.$parent.handlingBtn.showRepayment = false
      }
    }
  }
</script>
