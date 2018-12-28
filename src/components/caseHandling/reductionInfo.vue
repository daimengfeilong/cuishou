<style lang="less">

</style>
<template>
  <div class="annexInfo">
    <div class="annexInfo-cnt">
      <p class="annexInfo-tit">减免信息 <i class="el-icon-error pull-right" @click="closeThis"></i></p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="loanNo" label="贷款编号" show-overflow-tooltip width="180" align="center"></el-table-column>
        <el-table-column prop="repayDate" label="账单日" align="center"></el-table-column>
        <el-table-column prop="discType" label="减免类型" align="center"></el-table-column>
        <el-table-column prop="discAmt" label="减免金额" align="center"></el-table-column>
        <el-table-column prop="discDate" label="减免时间" align="center"></el-table-column>
        <el-table-column prop="tranStaff" label="经办人" align="center"></el-table-column>
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
//            "loanNo": "2018081500001",
//            "repayDate": "", //账单日
//            "discType": "",//减免类型
//            "discAmt": "正常还款",//减免金额
//            "discDate": "",//减免时间
//            "tranStaff":"tranStaff"//经办人
//          }
        ]
      }
    },
    created () {
      const that = this
      that.paramJson.loanNo = that.loanNo
      that.getReductionInfo()
    },
    methods: {
      getReductionInfo () {
        let that = this, sendJson = that.pageJson
        sendJson.params = that.paramJson
        that.$axios.post(api+"/ngcos/collectionCaseQuery/queryReliefInfo", sendJson).then(function (res) {
          let result = res.data
          if (result.code == "200") {
            that.tableData = result.data.list
          } else {
            that.$message(result.message);
          }
        }).catch()
      },
      closeThis () {
        this.$parent.handlingBtn.showReduction = false
      }
    }
  }
</script>
