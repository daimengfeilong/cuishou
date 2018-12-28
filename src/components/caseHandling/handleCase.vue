<style lang="less">

</style>
<template>
  <div class="caseDetail">
    <div class="backBtn">
      <el-button @click="goBack" size="small" icon="el-icon-back">返回</el-button>
    </div>
    <el-row>
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="案件信息" name="first">
            <div class="infoList">
              <p>1.案件基本信息</p>
              <el-row class="mt15">
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>贷款编号:</label>
                    <span>{{ detailData.loanNo }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>借款期数:</label>
                    <span>{{ detailData.instNum }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>数据来源:</label>
                    <span>{{ detailData.dataSource }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>案件状态:</label>
                    <span>{{ detailData.caseStatusName }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>逾期开始日期:</label>
                    <span>{{ detailData.beginDate }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>逾期结束日期:</label>
                    <span>{{ detailData.endDate }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>逾期天数:</label>
                    <span>{{ detailData.ovduDays }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>逾期期数:</label>
                    <span>{{ detailData.ovduNum }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>逾期次数:</label>
                    <span>{{ detailData.lateTimes }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>催收次数:</label>
                    <span>{{ detailData.collcectionNum }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>催收员姓名:</label>
                    <span>{{ detailData.collcectionName }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>催收员工号:</label>
                    <span>{{ detailData.userId }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>是否协催:</label>
                    <span>{{ detailData.collcectionNum }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>协催员姓名:</label>
                    <span>{{ detailData.collcectionName }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>协催员工号:</label>
                    <span>{{ detailData.userId }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>入催时间:</label>
                    <span>{{ detailData.instDate }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>来源APP:</label>
                    <span>{{ detailData.appSource }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>资金渠道:</label>
                    <span>{{ detailData.chanName }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="infoList">
              <p>2.案件金额信息</p>
              <el-row class="mt15">
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>逾期金额:</label>
                    <span>{{ detailData.totalAmt }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>贷款本金:</label>
                    <span>{{ detailData.loanAmt }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>剩余还款金额:</label>
                    <span>{{ detailData.sumRepayAmt }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>利息:</label>
                    <span>{{ detailData.intAmt }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>保险费用:</label>
                    <span>{{ detailData.insuAmt }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>服务费用:</label>
                    <span>{{ detailData.svcAmt }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>滞纳金:</label>
                    <span>{{ detailData.ovduAmt }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>违约金:</label>
                    <span>{{ detailData.funAmt }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>提前结清金额:</label>
                    <span>{{ detailData.seltAmt }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>委外服务费:</label>
                    <span>{{ detailData.outSvcAmt }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>委外总金额:</label>
                    <span>{{ detailData.outTotalAmt }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>委外天数:</label>
                    <span>{{ detailData.outTotalAmt }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>咨询费:</label>
                    <span>{{ detailData.rcvJfBusiAmt }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="infoList">
              <p>3.案件处理</p>
              <el-row class="btn-group mt15">
                <el-button size="small" @click="lookAnnex('showAnnex')">附件信息</el-button>
                <el-button size="small" @click="lookAnnex('showRepayment')">还款信息</el-button>
                <el-button size="small" @click="lookAnnex('showReduction')">减免信息</el-button>
                <el-button size="small" @click="lookAnnex('showHandle')">经办信息</el-button>
                <el-button size="small">发送短信</el-button>
                <el-button size="small" @click="toThirdPage('bigDataReport')">信用报告</el-button>
                <el-button size="small" @click="toThirdPage('bigDataCall')">通话详单</el-button>
                <el-button size="small" @click="toThirdPage('bigDataPhone')">通讯录</el-button>
                <el-button size="small" @click="toThirdPage('collectreport')">催收报告</el-button>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="客户信息" name="second">
            <div class="infoList">
              <p>1.客户基本信息</p>
              <el-row class="mt15">
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>姓名:</label>
                    <span>{{ detailData.custName }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>身份证:</label>
                    <span>{{ detailData.certNo }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>性别:</label>
                    <span>{{ detailData.sex }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>婚姻状况:</label>
                    <span>{{ detailData.marrType }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>学历:</label>
                    <span>{{ detailData.eduBackground }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>QQ:</label>
                    <span>{{ detailData.custQq }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>手机号码:</label>
                    <span>{{ detailData.custTel }}</span>
                    <i class="el-icon-phone ml5 color fs16 pointer"></i>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>职业:</label>
                    <span>{{ detailData.workJob }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>电商认证:</label>
                    <span>{{ detailData.ecoCertification }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>省市区:</label>
                    <span>{{ detailData.homeProCy }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>居住地:</label>
                    <span>{{ detailData.homeAddr }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="infoList">
              <p>2.客户工作信息</p>
              <el-row class="mt15">
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>公司名称:</label>
                    <span>{{ detailData.workUnit }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>公司行业:</label>
                    <span>{{ detailData.workTrade }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>公司电话:</label>
                    <span>{{ detailData.workTel }}</span>
                    <i class="el-icon-phone ml5 color fs16 pointer"></i>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>省市区:</label>
                    <span>{{ detailData.workProCy }}</span>
                  </div>
                </el-col>
                <el-col :span="8" class="mb15">
                  <div class="caseInfo">
                    <label>公司地址:</label>
                    <span>{{ detailData.workAddr }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="infoList">
              <p>3.银行卡信息</p>
              <el-row class="mt15">
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>银行卡号:</label>
                    <span>{{ detailData.acctNo }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>开户机构:</label>
                    <span>{{ detailData.openOrg }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>开户地区:</label>
                    <span>{{ detailData.openOrgAdr }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>账号名称:</label>
                    <span>{{ detailData.openPeople }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="infoList">
              <p>4.联系人信息</p>
              <el-row class="mt15">
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>父母:</label>
                    <span>{{ detailData.acctNo }}</span>
                    <span class="color-6">{{ detailData.acctNo }}</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="caseInfo">
                    <label>同事:</label>
                    <span>{{ detailData.openOrg }}</span>
                    <span class="color-6">{{ detailData.openOrg }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="逾期信息" name="third">
            <el-row class="mb10">
              <el-button type="primary" size="small" @click="clickBuckle">一键批扣</el-button>
            </el-row>

            <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;">
              <el-table-column prop="overTerm" label="期数" align="center"></el-table-column>
              <el-table-column prop="repayDate" label="账单日" align="center"></el-table-column>
              <el-table-column prop="mthRepayAmt" label="期款" align="center"></el-table-column>
              <el-table-column prop="totalAmt" label="应收总额" align="center"></el-table-column>
              <el-table-column prop="ovduAmt" label="滞纳金" align="center"></el-table-column>
              <el-table-column prop="funAmt" label="违约金" align="center"></el-table-column>
              <el-table-column prop="seltAmt" label="提前结清金额" align="center"></el-table-column>
              <el-table-column prop="deductState" label="扣款状态" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
              	<template slot-scope="scope">
                  <a class="link" @click="toChargebacks(scope.row)" v-if="scope.row.operateState == '100007'">￥扣款</a>
                  <a class="" style="color: #CFCCD6;" v-else>￥扣款</a>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-row>
    <el-row>
      <template>
        <el-form :model="formJson" label-width="80px">
          <el-form-item label="标记">
            <el-radio-group v-model="formJson.applyType">
              <el-radio v-for="(item, index) in radios" :label="item.code" :key="index">{{ item.msg }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="承诺时间" v-if="formJson.applyType == 1">
            <el-date-picker size="small" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="formJson.promiseRepayTime"></el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="formJson.applyNotes" :maxlength="50" placeholder="最多50字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitRemark">提交</el-button>
            <el-button @click="cancelRemark">取消</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-row>

		<el-dialog :title="dialogTit" :visible.sync="showDialog" :before-close="closeForm">
		  <el-form :model="form" :inline="true" :rules="rules" ref="form" style="text-align: center;">
        <el-form-item label="扣款渠道" prop="channelEnum">
          <el-select v-model="form.channelEnum" placeholder="请选择">
            <el-option v-for="item in channels" :label="item.caseValue"
                       :value="item.caseKey" :key="item.caseKey"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveSubmit('form')">确定扣款</el-button>
        <el-button @click="closeForm">取 消</el-button>
      </div>
    </el-dialog>

    <annex-info v-if="handlingBtn.showAnnex" :loanNo="detailData.loanNo"></annex-info>
    <repayment-info v-if="handlingBtn.showRepayment" :loanNo="detailData.loanNo"></repayment-info>
    <reduction-info v-if="handlingBtn.showReduction" :loanNo="detailData.loanNo"></reduction-info>
    <handle-info v-if="handlingBtn.showHandle" :caseId="detailData.caseId"></handle-info>


  </div>
</template>
<script>
  import annexInfo from './annexInfo.vue'
  import repaymentInfo from './repaymentInfo.vue'
  import reductionInfo from './reductionInfo.vue'
  import handleInfo from './handleInfo.vue'

  export default {
    name: 'app',
    data () {
      return {
        loanNo: "",
      	showDialog: false,
        dialogTit: "",
      	rules: {
          channelEnum: [
            { required: true, message: '请选择扣款渠道', trigger: 'change' }
          ]
        },
        form: {
          "loanNo": "",
          "repayNum": "",
          "channelEnum": ""
        },
        channels:[
//          {caseKey: "31600001", caseValue: "支付宝"}
        ],
        activeName: 'first',
        radios: [
//          {
//            "code": 1,
//            "msg": "承诺还款"
//          },
//          {
//            "code": 2,
//            "msg": "失联"
//          },{
//            "code": 3,
//            "msg": "老赖"
//          }
        ],
        formJson: {
          "caseId": "",//案件流水号，不可为空
          "loanNo": "",//贷款编号，不可为空
          "applyType": "",//标记：1-承诺还款，2-失联，3-老赖
          "applyNotes": "",//备注
          "promiseRepayTime": ""//承诺还款时间
        },
        detailData: {
//          "id": 186645,//案件ID
//          "caseStatus": "10000",//催收状态（码值）
//          "caseStatusName": "催收中",//催收状态
//          "lateTimes": 8,//逾期次数
//          "collcectionNum": null,//催收次数
//          "collcectionName": "邓明建 ",//催收人员姓名
//          "userId": "01050573",//催收人员姓名
//          "instDate": null,//入催时间
//          "loanNo": "2018081500001",//贷款编号
//          "loanAmt": null,//贷款本金
//          "sumRepayAmt": null,//剩余金额
//          "mthRepayAmt": null,//期款
//          "intAmt": null,//利息
//          "insuAmt": null,//保险费用
//          "svcAmt": null,//服务费费用
//          "ovduAmt": null,//滞纳金
//          "funAmt": null,//违约金
//          "seltAmt": null,//提前结清金额
//          "fstPayAmt": null,//首付金额
//          "beginDate": null,//逾期开始日期
//          "endDate": null,//逾期结束日期
//          "ovduDays": null,//逾期天数
//          "ovduNum": null,//逾期期数
//          "outSvcAmt": null,//委外服务费
//          "outTotalAmt": null,//委外总金额
//          "totalAmt": null,//逾期金额
//          "rcvJfBusiAmt": null,//咨询费
//          "custNo": "201800001",//会员编号
//          "custName": null,//姓名
//          "certNo": null,//身份证
//          "custTel": null,//手机号
//          "sex": null,//性别
//          "marrType": null,//婚姻状况
//          "sesameGrade": null,//芝麻评分
//          "custMail": null,//邮箱
//          "custQq": null,//QQ
//          "custWx": null,//微信
//          "homeAddr": null,//家庭住址
//          "regAddr": null,//户籍地址
//          "income": null,//月收入
//          "workPost": null,//职位
//          "workRelTel": null,//单位联系人电话
//          "workTel": null,//单位电话
//          "workUnit": null,//单位名称
//          "workAddr": null,//单位地址
//          "openOrg": null,//扣款银行
//          "acctNo": null,//扣款账号
//          "openOrgDtl": null,//扣款开户行
//          "prodName": null,//产品名称
//          "prodMsg": null,//品牌型号
//          "regDate": null,//注册时间（贷款申请时间）
//          "loanDate": null,//放款时间
//          "promotionChan": null,//引流渠道
//          "chanName": null,//渠道名称
//          "instNum": null,//借款期数
//          "dataSource": null,//数据来源
//          "appSource": null,//来源APP
//          "branchName": null,//网点名称
//          "branchNo": null,//网点编号
//          "branchPerson": null,//网点联系人
//          "branchProv": null,//网点所在省
//          "branchCity": null,//网点所在市
//          "branchTel": null,//网点电话
//          "saleTel": null,//销售电话
//          "branchAdd": null,//网点地址
//           "transferAddress": {
//             "bigDataReport": "",//信用报告
//             "bigDataCall": "http://120.26.125.141:40449/it_phone_detail?user_id=", 	通话详单
//             "bigDataPhone": "http://120.26.125.141:40449/it_contacts_list?user_id=", 	通讯录
//             "collectreport": "http://120.26.125.141:40449/dingdang_contacts_list?user_id=" 催收报告
//           },
//          "caseId": "19d2fbbca1f111e88cb800163e10c83f"//案件编号
        },
        tableData: [
//          {
//            "overTerm": 2,//期数
//            "repayDate": "2018-08-27",//账单日
//            "totalAmt": "5064.1",//应收总额
//            "ovduAmt": "35.1",//滞纳金
//            "funAmt": "0",//违约金
//            "seltAmt": "13491.82"//提前结清金额
//          },{
//            "overTerm": 3,
//            "repayDate": "2018-08-27",
//            "totalAmt": "5064.1",
//            "ovduAmt": "35.1",
//            "funAmt": "0",
//            "seltAmt": "13491.82"
//          }
        ],
        handlingBtn: {
          showAnnex: false,
          showRepayment: false,
          showReduction: false,
          showHandle: false
        },
        buckleJson: {
          "loanNo": "",
          "channelEnum": ""
        }
      }
    },
    components: {
      annexInfo,
      repaymentInfo,
      reductionInfo,
      handleInfo
    },
    activated () {
      this.loanNo = this.$route.query.loanNo
      this.getCaseDetail()
      this.getOverdueList()
      this.getApplyType()
      this.getWithholdChan()
    },
    created () {
      const that = this
//      that.getCaseDetail()
    },
    methods: {
      getCaseDetail () {   //获取案件详情信息
        let that = this, sendJson = {params: { "caseId": this.$route.query.caseId}}
        that.$axios.post(api+"/ngcos/collectionCaseQuery/queryCaseDetail", sendJson).then(function (res) {
          let result = res.data
          if (result.code == "200") {
            that.detailData = result.data
          } else {
            that.$message(result.message);
          }
        }).catch()
      },
      getOverdueList () {   //获取逾期信息
        let that = this, sendJson = {params: {loanNo: that.loanNo}}
        that.$axios.post(api+"/ngcos/collectionCaseQuery/getOverdueList", sendJson).then(function (res) {
          let result = res.data
          if (result.code == "200") {
            that.tableData = result.data.list
          } else {
            that.$message.error(result.message);
          }
        }).catch()
      },
      getApplyType () {   //获取处理标记
        let that = this
        that.$axios.get(api + "/ngcos/collectionCaseQuery/getCollectionCallResult").then(function (res) {
          let { code, data, message } = res.data
          if (code == "200") {
            that.radios = data.list
          } else {
            that.$message.error(message)
          }
        }).catch()
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
      handleClick (tab, event) {
        let that = this
//        console.log(tab, event);
//        if (tab.name == "third") {
//          that.getOverdueList()
//        }
      },
      goBack () {
        this.$router.push("caseList")
      },
      lookAnnex (type) {
        const that = this
        that.handlingBtn[type] = true
      },
      toThirdPage (type) {
        let that = this, url = `${that.detailData.transferAddress[type]}${localStorage.getItem("token").replace("bearer ", "")}`
        window.open(url)
      },
      submitRemark () {
        let that = this
        if (!that.formJson.applyType) {
          that.$message.warning("请选择经办类型")
          return false;
        } else if (that.formJson.applyType == 1 && that.formJson.promiseRepayTime == "") {
          that.$message.warning("承诺还款时间必填")
          return false;
        }
        that.formJson.caseId = that.$route.query.caseId
        that.formJson.loanNo = that.loanNo
        that.$axios.post(api+"/ngcos/collectionCaseDeal/saveCaseHandle", that.formJson).then(function (res) {
          let result = res.data
          if (result.code == "200") {
            that.$message({
              type: "success",
              message: result.message,
              onClose:function () {
                that.resetForm()
                that.$router.push("caseList")
              }
            })
          } else {
            that.$message.warning(result.message)
          }
        }).catch()
      },
      cancelRemark () {
        let that = this
        that.resetForm()
        that.$router.push("caseList")
      },
      resetForm () {
        const that = this
        for (let item in that.formJson) {
          that.formJson[item] = ''
        }
      },
      toChargebacks(row){
        let that = this
        that.form.repayNum = row.overTerm
        that.dialogTit = "扣款"
        that.showDialog = true
      },
       /**************************
		       函数描述:关闭新增/编辑弹窗
		       人员：yyp（姓名简称）
	       **************************/
		  closeForm(){
		  	this.$refs['form'].resetFields() //清除验证
		  	this.showDialog = false
		  },
		  /**************************
			       函数描述:保存扣款渠道
			       人员：yyp（姓名简称）
		       **************************/
		  saveSubmit (formName){
		  	let that = this, sendJson = {}, url = ""

        if (that.dialogTit == "扣款") {
          that.form.loanNo = that.loanNo
          sendJson = that.form
          url = "/ngcos/collectionCaseDeal/saveSingleDeduction"
        } else {
          that.buckleJson.loanNo = that.loanNo + '0'
          that.buckleJson.channelEnum = that.form.channelEnum
          sendJson = that.buckleJson
          url = "/ngcos/collectionCaseDeal/oneKeyBatchBuckle"
        }

		  	that.$refs[formName].validate(function (valid) {
		      if (valid) {
		        that.$axios.post(api + url, sendJson).then(function (res) {
              let result = res.data
              if (result.code == "200") {
                that.getOverdueList()
                that.showDialog = false
              } else {
                that.$message.error(result.message);
              }
            }).catch()
		      } else {
		        return false;
		      }
		    })
		  },
      clickBuckle () {   //一键批扣
        let that = this
        that.dialogTit = "一键批扣"
        that.showDialog = true
      }
    }
  }
</script>
