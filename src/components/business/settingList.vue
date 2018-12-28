<template>
	<div class="userList">
		<el-form :inline="true" :model="sendJson.params" label-width="80px" size="small">
			<el-form-item label="员工编号">
				<el-input v-model="sendJson.params.loginName" maxlength="20" clearable></el-input>
			</el-form-item>

			<el-form-item label="员工姓名">
				<el-input v-model="sendJson.params.userName" maxlength="10" clearable></el-input>
			</el-form-item>

			<el-form-item label="分机号">
				<el-input v-model="sendJson.params.extensionNum" maxlength="20" clearable></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="submitQuery()">查询</el-button>
				<el-button icon="el-icon-bell" @click="resetForm()">重置</el-button>
			</el-form-item>
		</el-form>
		<el-row class="m15">
			<!--<el-col :span="12">-->
			<el-button size="small" type="primary" icon="el-icon-plus" @click="addEvent">新增</el-button>
			<el-button size="small" icon="el-icon-edit" @click="editEvent">修改</el-button>
			<el-button size="small" icon="el-icon-delete" @click="deleteEvent">删除</el-button>
		</el-row>
		<!--<p class="btnListContainer">
        <el-button  icon="el-icon-plus" size="small" @click="openModel()">新增</el-button>
        <el-button  icon="el-icon-edit" size="small" @click="openModel()">编辑</el-button>
        <el-button  icon="el-icon-delete" size="small" @click="openModel()">删除</el-button>
      </p>-->
		<el-row>
			<template>
				<el-table :data="tableData" highlight-current-row style="width: 100%">
					<el-table-column type="index" width="50"></el-table-column>
					<el-table-column width="55" align="center">
						<template slot-scope="scope">
							<el-radio v-model="ruleForm.id" :label="scope.row.id" @click.native.prevent="clickitem(scope.row.id)">01</el-radio>
						</template>
					</el-table-column>
					<el-table-column prop="loginName" label="员工编号" align="center"></el-table-column>
					<el-table-column prop="userName" label="员工姓名" align="center"></el-table-column>
					<el-table-column prop="extensionNum" label="分机号" align="center"></el-table-column>
					<el-table-column prop="trueNum" label="分机真实号码" align="center"></el-table-column>
				</el-table>
			</template>
			<div class="pag-index">
				<el-pagination style="margin-top:20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listData.pageNum" :pager-count="11" :page-sizes="[10, 20, 30, 50]" :page-size="listData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listData.total">
				</el-pagination>
			</div>
		</el-row>
		<el-dialog :title="title" :visible.sync="dialogVisible" :before-close="closeForm">
			<el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="80px">
				<el-form-item label="员工编号" prop="loginName">
					<el-input v-model="ruleForm.loginName" :disabled="title == '修改呼叫分配'" maxlength="20" clearable></el-input>
				</el-form-item>
				<el-form-item label="分机号" prop="extensionNum">
					<el-input v-model="ruleForm.extensionNum" maxlength="20" clearable></el-input>
				</el-form-item>
				<el-form-item label="真实号码" prop="trueNum">
					<el-input v-model="ruleForm.trueNum" maxlength="20" clearable></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeForm">取 消</el-button>
				<el-button type="primary" @click="addSubmit('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				sendJson: {
					"params": {
						"loginName": "", //员工登录号
						"extensionNum": "", //分机号
						"userName": "" //用户姓名

					}
				},
				//		id:'',
				tableData: [],
				listData: {}, //返回内容
				dialogVisible: false,
				title: '',
				ruleForm: {
					"id": "",
					"loginName": "", //员工登录号
					"extensionNum": "", //分机号
					"trueNum": "" //真实号码
				},
				rules: {
					loginName: [
						{ required: true, message: '请输入员工登录号', trigger: 'blur' },
//						{ min: 4, max: 30, message: '长度在 4 到 30 个字符', trigger: 'blur' }
					],
					extensionNum: [
						{ required: true, message: '请输入分机号', trigger: 'blur' },
//            { type: 'number', message: '分机号必须为数字值', trigger: 'blur'}
					],
					trueNum: [
						{ required: true, message: '请输入真实号码', trigger: 'blur' },
//            { type: 'number', message: '真实号码必须为数字值', trigger: 'blur'}
					]
				}
			}
		},
		created() {
			let that = this
			that.submitQuery()
		},
		methods: {
			/**************************
		           函数描述:按条件查询数据
		           人员：yyp（姓名简称）
	      	**************************/
			submitQuery() {
				let that = this
				that.$axios.post(api + "/ngcos/collectionCallCenter/getCallCenterList", that.sendJson).then(function(res) {
					let result = res.data
					if(result.code == "200") {
						that.tableData = result.data.list
						delete result.data.list
						that.listData = result.data
						that.ruleForm.id = ''
					} else {
						that.$message(result.message);
					}
				}).catch()
			},
			/**************************
		       函数描述:重置查询条件
		       人员：yyp（姓名简称）
	       **************************/
			resetForm() {
				const that = this
				for(let item in that.sendJson.params) {
					that.sendJson.params[item] = ''
				}
			},
			/**************************
		       函数描述:新增呼叫分配
		       人员：yyp（姓名简称）
	       **************************/
			addEvent() {
				let that = this
				for(let item in this.ruleForm) {
					this.ruleForm[item] = ''
				}
				that.title = '新增呼叫分配'
				that.dialogVisible = true
			},
			/**************************
		       函数描述:表格的勾选与取消勾选
		       人员：yyp（姓名简称）
	       **************************/
			clickitem(e) {
				e === this.ruleForm.id ? this.ruleForm.id = '' : this.ruleForm.id = e
			},
			/**************************
		       函数描述:编辑呼叫分配
		       人员：yyp（姓名简称）
	       **************************/
			editEvent() {
				let that = this
				let newForm = ''
				if(that.ruleForm.id) {
					for(let i = 0; i < that.tableData.length; i++) {
						if(that.tableData[i].id == that.ruleForm.id) {
							newForm = JSON.stringify(that.tableData[i])
						}
					}
					that.ruleForm = JSON.parse(newForm)
					that.title = '修改呼叫分配'
					that.dialogVisible = true
				} else {
					that.$message.error("请先选中一项")
				}
			},
			/**************************
		       函数描述:关闭新增/编辑弹窗
		       人员：yyp（姓名简称）
	       **************************/
			closeForm() {
				this.$refs['ruleForm'].resetFields() //清除验证
				this.dialogVisible = false
			},
			/**************************
		       函数描述:删除数据
		       人员：yyp（姓名简称）
	       **************************/
			deleteEvent() {
				let that = this
				if(that.ruleForm.id) {
					this.$confirm('是否删除这条信息？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						that.$axios.post(api + "/ngcos/collectionCallCenter/delete", that.ruleForm).then(function(res) {
							let result = res.data
							if(result.code == "200") {
								that.$message({
									type: 'success',
									message: '删除成功!'
								})
								that.submitQuery()
							} else {
								that.$message(result.message);
							}
						}).catch()
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				} else {
					that.$message.error("请先选中一项")
				}
			},
			/**************************
		       函数描述:设置每页显示的数据条数
		       人员：yyp（姓名简称）
	       **************************/
			handleSizeChange(val) {
				let that = this
				that.sendJson.pageSize = val
				that.submitQuery()
			},
			/**************************
		       函数描述:跳转到指定页码
		       人员：yyp（姓名简称）
	       **************************/
			handleCurrentChange(val) {
				let that = this
				that.sendJson.pageNo = val
				that.submitQuery()
			},
			/**************************
		       函数描述:保存新增或编辑的数据
		       人员：yyp（姓名简称）
	       **************************/
			addSubmit(formName) {
				let that = this,
					url = "/ngcos/collectionCallCenter/save"
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(that.ruleForm.id) {
							url = "/ngcos/collectionCallCenter/updt"

              if (isNaN(parseInt(that.ruleForm.extensionNum)) || isNaN(parseInt(that.ruleForm.trueNum))) {
                that.$message.error("号码格式不正确");
                return false;
              }
						}
						that.$axios.post(api + url, that.ruleForm).then(function(res) {
							let result = res.data
							if(result.code == "200") {
								that.dialogVisible = false
								that.submitQuery()
							} else {
								that.$message(result.message);
							}
						}).catch(function (err) {
              that.$message.error(err.data.message);
            })
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			}
		}
	}
</script>
