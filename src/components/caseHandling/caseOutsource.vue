<style lang="less">

</style>
<template>
  <div class="annexInfo">
    <div class="annexInfo-cnt">
      <p class="annexInfo-tit">案件委外 <i class="el-icon-error pull-right" @click="closeThis"></i></p>
      <div class="pl30 pr30">
        <el-form :model="outsourceJson" :inline="true" ref="outsourceJson" :rules="rules">
          <el-form-item label="委外天数" prop="days">
            <el-input size="small" v-model="outsourceJson.days" placeholder="请输入委外天数"></el-input>
          </el-form-item>
        </el-form>

        <el-form :inline="true" :model="paramJson" class="demo-form-inline outsource-form">
          <el-form-item label="机构编号">
            <el-input size="small" v-model="paramJson.organizationcode" placeholder="机构编号"></el-input>
          </el-form-item>
          <el-form-item label="机构名称" class="ml10">
            <el-select size="small" v-model="paramJson.organizationName" placeholder="请选择">
              <el-option v-for="item in deputeOrg" :label="item.organizationName" :value="item.organizationName"
                         :key="item.organizationcode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="ml10">
            <el-button size="small" type="primary" @click="queryDeputeOrg">查询</el-button>
            <el-button size="small" @click="resetForm()">重置</el-button>
          </el-form-item>

        </el-form>

        <el-table :data="tableData" highlight-current-row style="width: 100%">
          <el-table-column label="" width="50" align="center">
            <template slot-scope="scope">
              <el-radio v-model="outsourceJson.deputeOrgId" :label="scope.row.organizationcode">01</el-radio>
            </template>
          </el-table-column>
          <el-table-column type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="organizationName" label="机构名称" align="center"></el-table-column>
          <el-table-column prop="organizationcode" label="机构编码" width="180" align="center"></el-table-column>
        </el-table>

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

        <div class="mt50 btnGroup">
          <el-button type="primary" @click="submitOutsource('outsourceJson')">确定</el-button>
          <el-button @click="closeThis">取消</el-button>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
  export default {
    name: 'app',
    props: ["currentData", "orgData"],
    data () {
      var checkDays = function (rule, value, callback) {
        if (!value) {
          return callback(new Error('委外天数不能为空'));
        } else if (!/^[1-9]+[0-9]*]*$/.test(value)) {
          callback(new Error('委外天数必须是正整数'));
        } else {
          callback();
        }
      }
      return {
        pageJson: {
          pageNo: "1",
          pageSize: "10"
        },
        paramJson: {
          "organizationName": "",
          "organizationcode": ""
        },
//      organizationcode: "",
        outsourceJson: {
          "caseId": this.currentData.caseId,//案件编号
          "loanNo": this.currentData.loanNo,
          "repayNum": this.currentData.overdueNum,
          "days": "",  //委外天数
					"deputeOrgId": "",//委外机构码
					"deputeNotes": ""//委外备注内容
        },
        rules: {
          days: [
            { validator: checkDays, required: true, trigger: 'blur' }
          ]
        },
        deputeOrg: this.orgData,
        tableData: [
//          {
//            "organizationcode": "00001",
//            "organizationName": "委外机构一"
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
    created () {
      const that = this
      that.queryDeputeOrg()
    },
    methods: {
      queryDeputeOrg () {
        let that = this, sendJson = that.pageJson
        sendJson.params = that.paramJson
        console.log(sendJson)
        that.$axios.post(api+"/ngcos/collectionCaseQuery/getDeputeOrg", sendJson).then(function (res) {
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
      closeThis () {
        this.$parent.showOutsource = false
      },
      submitOutsource (formName) {
        let that = this

        that.$refs[formName].validate(function (valid) {
          if (valid) {
            if (that.outsourceJson.deputeOrgId) {
              that.$axios.post(api+"/ngcos/collectionCaseDeal/depute", that.outsourceJson)
                .then(function (res) {
                  if(res.data.code == "200"){
                    that.$message.success(res.data.message);
                    that.closeThis()
                    that.$parent.resetForm()
                    that.$parent.paramJson.loanNo = that.currentData.loanNo
                    that.$parent.submitQuery()
                  }else{
                    that.$message.error(res.data.message);
                  }
                }).catch(function (err) {
                that.$message.error(err.data.message);
              })
            } else {
              that.$message.error('请选择委外机构');
            }
          } else {
            return false;
          }
        })
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
