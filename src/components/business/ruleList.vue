<style lang="less">

</style>
<template>
  <div class="">
    <el-row>
      <el-form :inline="true" :model="paramJson" class="caseList-form" label-width="100px">
        <el-col :span="8">
          <el-form-item label="规则编号">
            <el-input size="small" v-model="paramJson.stageId" :maxlength="30" placeholder="规则编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="案件阶段名称">
            <el-input size="small" v-model="paramJson.stageName" :maxlength="30" placeholder="案件阶段名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分案最小金额">
            <el-input size="small" v-model="paramJson.stageName" :maxlength="30" placeholder="案件阶段名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分案最大金额">
            <el-input size="small" v-model="paramJson.stageName" :maxlength="30" placeholder="案件阶段名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户籍地址">
            <el-input size="small" v-model="paramJson.stagePeriod" :maxlength="10" placeholder="案件阶段周期"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资金渠道">
            <el-select size="small" v-model="paramJson.state" placeholder="请选择">
              <el-option v-for="item in ruleState" :label="item.message"
                         :value="item.code" :key="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="机构">
            <el-select size="small" v-model="paramJson.state" placeholder="请选择">
              <el-option v-for="item in ruleState" :label="item.message"
                         :value="item.code" :key="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="催收组名称">
            <el-select size="small" v-model="paramJson.state" placeholder="请选择">
              <el-option v-for="item in ruleState" :label="item.message"
                         :value="item.code" :key="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select size="small" v-model="paramJson.state" placeholder="请选择">
              <el-option v-for="item in ruleState" :label="item.message"
                         :value="item.code" :key="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-row class="btn-group">
      <el-button size="small" type="primary" @click="clickEvent(1)">新建</el-button>
      <el-button size="small" type="primary" @click="clickEvent(2)">修改</el-button>
      <el-button size="small" @click="clickEvent(3)">删除</el-button>
      <el-button size="small" class="pull-right" @click="resetForm(paramJson)">重置</el-button>
      <el-button size="small" type="primary" class="pull-right" @click="submitQuery()">查询</el-button>
    </el-row>

    <el-row>
      <template>
        <el-table :data="tableData" highlight-current-row @row-click="handleRow" style="width: 100%">
          <el-table-column width="55" align="center">
            <template slot-scope="scope">
              <el-radio class="radioStyle" v-model="ruleId" :label="scope.row.stageId">01</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="stageId" label="规则编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="stageName" label="案件阶段名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="stageType" label="分案最小金额" width="120" align="center"></el-table-column>
          <el-table-column prop="stageType" label="分案最大金额" width="120" align="center"></el-table-column>
          <el-table-column prop="caseType" label="资金渠道" align="center"></el-table-column>
          <el-table-column prop="stagePeriod" label="户籍地址" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" width="100" align="center"></el-table-column>
          <el-table-column prop="rowAddUser" label="机构" align="center"></el-table-column>
          <el-table-column prop="rowAddUser" label="催收组名称" align="center"></el-table-column>
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

    <el-dialog :title="dialogTit" :visible.sync="showDialog" @close="closeDialog('form')" width="40%">
      <div class="pr20">
        <el-form :model="form" :rules="rules" ref="form" label-width="120px" size="small">
          <el-form-item label="案件阶段名称:" prop="stageName">
            <el-input v-model="form.stageName" :maxlength="30" placeholder="案件阶段名称"></el-input>
          </el-form-item>
          <el-form-item label="案件阶段类型:" prop="stageType">
            <el-select size="small" v-model="form.stageType" placeholder="请选择">
              <el-option v-for="item in stageType" :label="item.message" :value="item.code"
                         :key="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="案件类型:" prop="caseType">
            <el-select size="small" v-model="form.caseType" placeholder="请选择">
              <el-option v-for="item in caseType" :label="item.message"
                         :value="item.code" :key="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.stageType == 2" label="案件阶段周期:" prop="stagePeriod">
            <el-input v-model="form.stagePeriod" :maxlength="10" placeholder="案件阶段周期"></el-input>
          </el-form-item>
          <el-form-item label="是否禁用:" prop="state">
            <el-select v-model="form.state" placeholder="请选择">
              <el-option v-for="item in ruleState" :label="item.message"
                         :value="item.code" :key="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitConfig">确 定</el-button>
      </div>
    </el-dialog>

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
          stageId : "",
          stageName : "",
          stageType : "",
          caseType : "",
          stagePeriod : "",
          state : ""
        },
        stageType: [],
        caseType: [],
        ruleState: [],
        dialogTit: "新建规则",
        showDialog: false,
        form: {
          stageName : "",/** 阶段名称 **/
          stageType : "",/** 案件阶段类型 (1 自然月；2 非自然月) **/
          caseType : "",/** 案件类型 (1 正常产品； 2 PDL) **/
          stagePeriod : "",/** 案件周期 **/
          state : "" /** 状态 **/
        },
        rules: {
          stageName : [{required: true, message: '请输入案件阶段名称', trigger: 'blur'}],
          stageType : [{required: true, message: '请选择案件阶段类型', trigger: 'change'}],
          caseType : [{required: true, message: '请选择案件类型', trigger: 'change'}],
          stagePeriod : [{required: true, message: '请输入案件阶段周期', trigger: 'blur'}],
          state : [{required: true, message: '请选择规则状态', trigger: 'change'}]
        },
        ruleId: '',
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
      that.getStageType("StageType")
      that.getStageType("CaseType")
      that.getStageType("StateType")
      that.submitQuery()
    },
    methods: {
      getStageType (type) {   //获取阶段类型
        const that = this
        that.$axios.post(api+"/ngcos/public/convert/getAllValue", {
          "params": {
            "typeCode": type
          }
        }).then(function (res) {
          const result = res.data
          if (result.code == "200") {
            if (type == "StageType") {
              that.stageType  = result.data.list
            } else if (type == "CaseType") {
              that.caseType = result.data.list
            } else if (type == "StateType") {
              that.ruleState = result.data.list
            }
          } else {
            that.$message.warning(result.message);
          }

        }).catch()
      },
      submitQuery () {   //查询
        let that = this, sendJson = {}
        sendJson = that.pageJson
        sendJson.params = that.paramJson

        if (that.form.stageType == 1) {
          that.form.stagePeriod = ""
        }

        that.$axios.post(api+"/ngcos/stage/queryCaseStageList", sendJson).then(function (res) {
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
      resetForm (obj) {
        const that = this
        for (let item in obj) {
          obj[item] = ''
        }
      },
      handleRow (row) {
        this.ruleId = row.stageId
        this.currentRow = row
      },
      clickEvent (code) {
        const that = this
        switch (code) {
          case 1:
            //新建
            that.dialogTit = "新建规则"
            that.showDialog = true
            break;
          case 2:
            //修改
            if (that.ruleId) {
              that.dialogTit = "编辑规则"
              that.form.stageName = that.currentRow.stageName
              that.form.stageType = that.currentRow.stageType
              that.form.caseType = that.currentRow.caseType
              that.form.stagePeriod = that.currentRow.stagePeriod
              that.form.state = that.currentRow.state
              that.showDialog = true
            } else {
              that.$message.error('请先选择一条规则');
            }
            break;
          case 3:
            //删除
            if (that.ruleId) {
              that.$confirm('确定删除该条规则？', '删除确认', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(function () {
                that.deleteRule(that.ruleId)
              }).catch();
            } else {
              that.$message.error('请先选择一条规则');
            }
            break;
        }
      },
      submitConfig () {
        let that = this
        that.$refs['form'].validate(function (valid) {
          if (valid) {
            that.$axios.post(api + "/ngcos/stage/saveCaseStage", that.form).then(function (res) {
              let result = res.data, { code, message } = result
              if (code == "200") {
                that.showDialog = false
                that.submitQuery()
                that.$message.success(message)
              } else {
                that.$message.warning(message)
              }
            }).catch()
          } else {
            return false;
          }
        })
      },
      deleteRule (stageId) {
        let that = this
        that.$axios.post(api + "/ngcos/stage/deleteCaseStage", {stageId: stageId}).then(function (res) {
          let result = res.data, { code, message } = result
          if (code == "200") {
            that.$message.success(message)
            that.submitQuery()
          } else {
            that.$message.warning(message)
          }
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
      closeDialog (formName) {
        let that = this
        that.$refs[formName].resetFields();
        that.resetForm(that.form)
      }
    }
  }
</script>
