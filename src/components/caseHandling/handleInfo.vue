<style lang="less">

</style>
<template>
  <div class="annexInfo">
    <div class="annexInfo-cnt">
      <p class="annexInfo-tit">经办信息 <i class="el-icon-error pull-right" @click="closeThis"></i></p>
      <p class="pl30 pr30 pb10"><a href="http://www.w3school.com.cn/" target="_blank" style="color: #3f9eff;text-decoration: underline;">关联催记</a></p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="callDate" label="处理时间" width="180" align="center"></el-table-column>
        <el-table-column prop="collectionName" label="处理人姓名" align="center"></el-table-column>
        <el-table-column prop="userId" label="处理人工号" align="center"></el-table-column>
        <el-table-column prop="handleType" label="经办类型" align="center"></el-table-column>
        <el-table-column prop="applyNotes" label="处理备注" min-width="200" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'app',
    props: ["caseId"],
    data () {
      return {
        paramJson: {
          caseId: ""
        },
        tableData: [
//          {
//            "loanNo": "2018081500001",//贷款编号
//            "custName": null,//贷款人姓名
//            "caseId": "19d2fbbca1f111e88cb800163e10c83f",//案件编号
//            "userId": "01050164",//经办人id
//            "collectionName": "李情",//经办人
//            "callDate": "2018-08-08 19:11:30",//催收时间
//            "handleType": null,//经办类型
//            "applyNotes": "来电咨询提前还款，已告知没有减免，用户不接受，说自己做生意亏了，现在还不起了，不协商还款后续不会还款，告知为其反馈，让其在3个工作日来电核实具体情况，开放提前结清"
//          }
        ]
      }
    },
    created () {
      const that = this
      that.paramJson.caseId = that.caseId
      that.getHandleInfo()
    },
    methods: {
      getHandleInfo () {
        let that = this, sendJson = {}
        sendJson.params = that.paramJson
        that.$axios.post(api+"/ngcos/collectionCaseQuery/queryHandleInfos", sendJson).then(function (res) {
          let result = res.data
          if (result.code == "200") {
            that.tableData = result.data.list
          } else {
            that.$message(result.message);
          }
        }).catch()
      },
      closeThis () {
        this.$parent.handlingBtn.showHandle = false
      }
    }
  }
</script>
