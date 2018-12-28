<style lang="less">

</style>
<template>
  <div class="userList">
    <el-row>
      <el-form :inline="true" :model="sendJson.params" class="" label-width="80px" size="small">
          <el-form-item label="姓名">
            <el-input v-model="sendJson.params.name" placeholder="姓名" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="sendJson.params.mobile" placeholder="手机号" clearable></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="sendJson.params.userId" placeholder="用户名" clearable></el-input>
          </el-form-item>
          <!--<el-form-item label="状态">
            <el-select v-model="sendJson.params.userState" placeholder="请选择" clearable>
              <el-option label="全部" value="1"></el-option>
              <el-option label="正常" value="2"></el-option>
              <el-option label="已停用" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门">
            <el-select v-model="sendJson.params.departmentId" placeholder="请选择" clearable>
              <el-option label="部门1" value="1"></el-option>
              <el-option label="部门2" value="2"></el-option>
              <el-option label="部门3" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职位">
            <el-select v-model="sendJson.params.jobId" placeholder="请选择" clearable>
              <el-option label="职位1" value="1"></el-option>
              <el-option label="职位2" value="2"></el-option>
              <el-option label="职位3" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最后登录">
            <el-date-picker
				      v-model="sendJson.params.lastTime"
				      type="datetimerange"
				      align="right"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      :default-time="['00:00:00', '23:59:59']">
				    </el-date-picker>
          </el-form-item>-->
        <!--<el-col :span="24" style="padding-left: 40px;">-->
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="submitQuery()">查询</el-button>
            <el-button icon="el-icon-bell" @click="resetForm()">重置</el-button>
          </el-form-item>
        <!--</el-col>-->
      </el-form>
    </el-row>
    <el-row class="m15">
    	<!--<el-col :span="12">-->
	      <el-button size="small" type="primary" icon="el-icon-plus" @click="addEvent">新增</el-button>
	      <el-button size="small" icon="el-icon-edit" @click="editEvent">编辑</el-button>
	      <el-button size="small" class="mr70" icon="el-icon-info" @click="detailEvent">详情</el-button>
      <!--</el-col>
      <el-col :span="12">-->
	      <!--<el-button type="primary" @click="submitQuery()">查询</el-button>
        <el-button @click="resetForm()">重置</el-button>-->
      <!--</el-col>-->
    </el-row>
    <el-row>
      <template>
        <el-table :data="tableData" highlight-current-row style="width: 100%">
          <el-table-column width="55" align="center">
            <template slot-scope="scope">
              <el-radio v-model="userId" :label="scope.row.userId" @click.native.prevent="clickitem(scope.row.userId)">01</el-radio>
            </template>
          </el-table-column>
          <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
          <el-table-column prop="userId" label="用户名" align="center"></el-table-column>
          <el-table-column prop="department" label="部门" align="center"></el-table-column>
          <el-table-column prop="job" label="职位" align="center"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="180" align="center"></el-table-column>
          <el-table-column prop="userState" label="状态" align="center"></el-table-column>
          <el-table-column prop="role" label="角色" align="center"></el-table-column>
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
		<el-dialog :title="title" :visible.sync="dialogVisible" :before-close="closeForm">
		  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
		    <el-form-item label="用户名" prop="userId">
	        <el-input v-model="ruleForm.userId" placeholder="4~30个字符；可使用字母、数字或下划线"
	          minlength="4" maxlength="30" :disabled="isDisabled" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="hasPaw">
           <el-input type="password" placeholder="6~30个字符"
           	minlength="6" maxlength="30" v-model="ruleForm.password" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" v-else>
           <el-input type="password" placeholder="6~30个字符"
           	minlength="6" maxlength="30" v-model="ruleForm.password" :disabled="isDisabled" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="ruleForm.mobile" :disabled="isDisabled" clearable></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="ruleForm.name" :disabled="isDisabled" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="ruleForm.userState" placeholder="" :disabled="isDisabled">
			      <el-option label="启用" value="01"></el-option>
			      <el-option label="禁用" value="02"></el-option>
			    </el-select>
        </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="closeForm">取 消</el-button>
		    <el-button type="primary" @click="closeForm" v-if="isDisabled">确定</el-button>
		    <el-button type="primary" @click="addSubmit('ruleForm')" v-else>确 定</el-button>
		  </div>
		</el-dialog>
  </div>
</template>
<script>
  import { userId,checkName,checkPhone } from '../../../assets/js/utils.js'
  export default {
    name: 'app',
    data () {
      return {
      	sendJson: {
//					"pageNo":1,
//					"pageSize":20,
					"params": {
				    "userId":"",//用户名
						"name":"",//用户姓名
						"email":"",//email
						"mobile":"",//电话号码
						"rowAddTimeBegin":"",//创建时间begin
						"rowAddTimeEnd":""//创建时间End

					}
				},
//      paramJson: {
//        "name":"",//姓名
//        "phoneNo":"",//手机号
//        "collcectionName":"",//用户名
//        "userState":"13144659898",//状态
//        "departmentId": "",//部门
//        "jobId": "",//职位
//        "userState":"2018-09-03"//最后登录
//      },
        userId: "",
        currentRow: "",
        tableData: [],
        listData: {},//返回内容
        dialogVisible:false,
        title:'',
        ruleForm:{
        	"userId":"",//用户名
          "password":"",//密码
          "name":"",//用户名称
//        "email":"",
          "mobile":"",
          "userState": "",
//        "department": "",
//        "job": ""
        },
        hasPaw: false,
        isDisabled: false,
        rules: {
          userId: [
            { required: true, validator: userId, trigger: 'blur' }
//          { required: true, message: '请输入用户名', trigger: 'blur' },
//          { min: 6, max: 30, message: '密码格式有误', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 30, message: '密码格式有误', trigger: 'blur' }
          ],
          name: [
            { required: true, validator: checkName, trigger: 'blur' }
//          { required: true, message: '请输入真实姓名', trigger: 'blur' },
//          {validator: checkPhone, trigger: 'blur'}
          ],
          mobile: [
            { required: true, validator: checkPhone, trigger: 'blur' }
//          {validator: checkPhone, trigger: 'blur'}
//          { type: 'number', message: '手机号必须为数字值', trigger: 'blur'}
          ],
          userState: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ]
        }
      }
    },
    created () {
			this.submitQuery()
    },
    methods: {
    	/**************************
		       函数描述:按条件查询数据
		       人员：yyp（姓名简称）
	       **************************/
    	submitQuery () {   //查询
        let that = this
        that.$axios.post(api+"/ngcos/collectionUser/usersList", that.sendJson).then(function (res) {
          let result = res.data
          if (result.code == "200") {
            that.tableData = result.data.list
            delete result.data.list
            that.listData = result.data
            that.userId = ''
          } else {
            that.$message(result.message);
          }
        }).catch()
      },
      /**************************
		       函数描述:重置查询条件
		       人员：yyp（姓名简称）
	       **************************/
      resetForm () {
        const that = this
        for (let item in that.sendJson.params) {
          that.sendJson.params[item] = ''
        }
      },
      /**************************
		       函数描述:增加用户
		       人员：yyp（姓名简称）
	       **************************/
      addEvent () {
        let that = this
        for(let item in this.ruleForm){
          this.ruleForm[item] = ''
        }
        that.userId = ''
        that.title = '新增用户'
        that.hasPaw = true
        that.dialogVisible = true
        that.isDisabled = false
      },
      /**************************
		       函数描述:选择/取消选择
		       人员：yyp（姓名简称）
	       **************************/
      clickitem (e) {
			  e === this.userId ? this.userId = '' : this.userId = e
			},
			/**************************
		       函数描述:编辑用户
		       人员：yyp（姓名简称）
	       **************************/
      editEvent () {
        let that = this
        let newForm = ''
        if (that.userId) {
        	for(let i=0;i<that.tableData.length;i++){
          	if(that.tableData[i].userId == that.userId){
          		newForm = JSON.stringify(that.tableData[i])
          	}
          }
        	that.ruleForm.userId = JSON.parse(newForm).userId
        	that.ruleForm.name = JSON.parse(newForm).name
        	that.ruleForm.mobile = JSON.parse(newForm).mobile

          that.title = '编辑用户'
          that.hasPaw = false
          that.dialogVisible = true
          that.isDisabled = false
        } else {
          that.$message.error("请先选中一项")
        }
      },
      /**************************
		       函数描述:查看用户详情
		       人员：yyp（姓名简称）
	       **************************/
      detailEvent (){
      	let that = this
      	that.editEvent()
      	that.title = '用户详情'
      	that.isDisabled = true
      },
      /**************************
		       函数描述:关闭新增/编辑弹窗
		       人员：yyp（姓名简称）
	       **************************/
      closeForm(){
      	this.$refs['ruleForm'].resetFields() //清除验证
      	this.dialogVisible = false
      },
      /**************************
		       函数描述:设置每页显示数据条数
		       人员：yyp（姓名简称）
	       **************************/
      handleSizeChange (val) {
        const that = this
        that.sendJson.pageSize = val
        that.submitQuery()
      },
      /**************************
		       函数描述:指定跳转页码
		       人员：yyp（姓名简称）
	       **************************/
      handleCurrentChange (val) {
        this.sendJson.pageNo = val
        this.submitQuery()
      },
      /**************************
		       函数描述:保存新增/编辑数据
		       人员：yyp（姓名简称）
	       **************************/
      addSubmit (formName){
      	let that = this,url = "/ngcos/collectionUser/register"
      	this.$refs[formName].validate((valid) => {
          if (valid) {
          	if (that.userId){
          		url = "/ngcos/collectionUser/updateUser"
          		if(that.ruleForm.password.length < 6){
          			that.$message.error('密码格式有误')
          			return false
          		}
          	}
            that.$axios.post(api+url, that.ruleForm).then(function (res) {
	          let result = res.data
	          if (result.code == "200") {
	          	that.submitQuery()
	          	that.dialogVisible = false
	          } else {
	            that.$message.error(result.message);
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
