<style lang="less">

</style>
<template>
  <div class="annexInfo">
    <div class="annexInfo-cnt">
      <p class="annexInfo-tit">案件分配 <i class="el-icon-error pull-right" @click="closeThis"></i></p>
      <div class="pl30 pr30">
        <el-form :inline="true" :model="formJson" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input size="small" v-model="formJson.userName" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="所属组" class="ml10">
            <el-select size="small" v-model="formJson.groupId" placeholder="请选择">
              <el-option v-for="item in allGroup" :label="item.groupName" :value="item.groupId"
                         :key="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="ml10">
            <el-button size="small" type="primary" @click="queryAllot">查询</el-button>
            <el-button size="small" @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" highlight-current-row @row-click="handleRow" style="width: 100%">
          <el-table-column label="" width="50" align="center">
            <template slot-scope="scope">
              <el-radio v-model="userId" :label="scope.row.userId">01</el-radio>
            </template>
          </el-table-column>
          <el-table-column type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
          <el-table-column prop="userId" label="登录账号" width="180" align="center"></el-table-column>
          <el-table-column prop="groupName" label="所属组" align="center"></el-table-column>
          <!--<el-table-column prop="department" label="所属部门" align="center"></el-table-column>-->
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

        <div class="mt20 btnGroup">
          <el-button type="primary" @click="sureAllot">确定分配</el-button>
          <el-button @click="closeThis">取消</el-button>
        </div>
      </div>
    </div>

    <el-dialog title="请选择分配类型" :visible.sync="dialogFormVisible" :modal="false" width="40%">
      <el-form :model="allotJson" :rules="rules" ref="allotJson" label-width="80px">
        <el-form-item label="分配类型" prop="allotType">
          <el-select v-model="allotJson.allotType" placeholder="请选择">
            <el-option label="类型一" value="1"></el-option>
            <el-option label="类型二" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAllot">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'app',
    props: ["currentData", "groupData"],
    data () {
      return {
        pageJson: {
          pageNo: "1",
          pageSize: "10"
        },
        paramJson: {
          caseId: this.currentData.caseId
        },
        formJson: {
          userName: "",
          groupId: ""
        },
        userId: "",
        allGroup: this.groupData,
        tableData: [],
        listData: {},
        allotJson: {
        	"caseId": this.currentData.caseId,//案件编号
					"groupNo": "",//小组编号
					"userId": "",//工号
          allotType: ""
        },
        dialogFormVisible: false,
        rules: {
          allotType: [{ required: true, message: '请选择分配类型', trigger: 'change' }]
        }
      }
    },
    created () {
      const that = this
      console.log(that.groupData)
//    that.queryAllot()
//      that.formJson.caseId = that.caseId
    },
    methods: {
      queryAllot () {
        let that = this, sendJson = that.pageJson
        sendJson.params = that.formJson
        that.$axios.post(api + "/ngcos/collectionCaseQuery/getUserList", sendJson).then(function (res) {
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
      },
      closeThis () {
        this.$parent.showAllot = false
      },
      handleSizeChange (val) {
        const that = this
        that.pageJson.pageSize = val
        that.queryAllot()
      },
      handleCurrentChange (val) {
        this.pageJson.pageNo = val
        this.queryAllot()
      },
      handleRow (row) {
        this.userId = row.userId
        this.allotJson.groupNo = row.groupNo
      },
      sureAllot () {
      	let that = this
      	if (that.userId) {
          this.allotJson.userId = that.userId
          that.dialogFormVisible = true

        } else {
          that.$message.error('请先选择分配人员');
        }
      },
      submitAllot () {
        let that = this
        that.$refs['allotJson'].validate(function (valid) {
          if (valid) {
            that.$axios.post(api+"/ngcos/allot/allotCase", that.allotJson).then(function (res) {
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
            return false;
          }
        })
      }
    }
  }
</script>
