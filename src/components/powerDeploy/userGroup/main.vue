<style lang="less">

</style>
<template>
	<div class="userList">
		<el-row>
			<el-form :inline="true" :model="sendJson.params" class="" label-width="80px" size="small">
				<!--<el-col :span="6">-->
				<el-form-item label="用户组">
					<el-input v-model="sendJson.params.groupName" placeholder="用户组" clearable></el-input>
					<!--<el-select v-model="sendJson.params.groupName" placeholder="请选择" clearable>
              <el-option label="全部" value="1"></el-option>
              <el-option label="IT部" value="2"></el-option>
              <el-option label="审批部" value="3"></el-option>
            </el-select>-->
				</el-form-item>
				<!--</el-col>
        <el-col :span="6">-->
				<el-form-item label="编号">
					<el-input v-model="sendJson.params.groupId" placeholder="编号" clearable></el-input>
				</el-form-item>
				<!--</el-col>
        <el-col :span="6">-->
				<el-form-item label="状态">
					<el-select v-model="sendJson.params.groupState" placeholder="请选择" style="width: 100%;">
						<el-option v-for="(item,index) in stateList" :key="item.state" :label="item.menuStateName" :value="item.state"></el-option>
					</el-select>
				</el-form-item>
				<!--</el-col>
        <el-col :span="5" :offset="1">-->
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="submitQuery()">查询</el-button>
					<el-button icon="el-icon-bell" @click="resetForm()">重置</el-button>
				</el-form-item>
				<!--</el-col>-->
			</el-form>
		</el-row>
		<el-row class="m15">
			<el-button size="small" type="primary" icon="el-icon-plus" @click="addEvent">新增</el-button>
			<el-button size="small" icon="el-icon-edit" @click="editEvent">编辑</el-button>
			<el-button size="small" icon="el-icon-setting" @click="userSet">用户管理</el-button>
			<el-button size="small" icon="el-icon-delete" class="mr70" @click="deleteEvent">删除</el-button>

		</el-row>
		<el-row>
			<template>
				<el-table :data="tableData" highlight-current-row style="width: 100%">
					<el-table-column width="55" align="center">
						<template slot-scope="scope">
							<el-radio v-model="groupId" :label="scope.row.groupId" @click.native.prevent="clickitem(scope.row.groupId)">01</el-radio>
						</template>
					</el-table-column>
          <el-table-column type="index" width="50" align="center"></el-table-column>
					<el-table-column prop="groupId" label="组编号" align="center"></el-table-column>
					<el-table-column prop="groupName" label="组名称" align="center"></el-table-column>
					<el-table-column prop="groupStateName" label="状态" align="center"></el-table-column>
					<el-table-column prop="remark" label="备注" align="center"></el-table-column>
				</el-table>
			</template>
			<div class="pag-index">
				<el-pagination style="margin-top:20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listData.pageNum" :pager-count="11" :page-sizes="[10, 20, 30, 50]" :page-size="listData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listData.total">
				</el-pagination>
			</div>
		</el-row>
		<el-dialog :title="title" :visible.sync="dialogVisible" :before-close="closeForm">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
				<el-col :span="12">
					<el-form-item label="组编号" prop="groupId">
						<el-input v-model="ruleForm.groupId" :disabled="title == '编辑用户组'" placeholder="组编号，最多15字" clearable :maxlength="15"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="组名" prop="groupName">
						<el-input v-model="ruleForm.groupName" placeholder="组名，最多15字" clearable :maxlength="15"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="启用状态" prop="groupState">
						<el-select v-model="ruleForm.groupState" placeholder="请选择" style="width: 100%;">
							<el-option v-for="(item,index) in stateList" :key="item.state" :label="item.menuStateName" :value="item.state"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
					<el-col :span="24">
						<el-form-item label="备注" style="width: 100%;">
							<el-input v-model="ruleForm.remark" placeholder="最多输入50字" clearable :maxlength="50"></el-input>
						</el-form-item>
					</el-col>
				<div class="clearFloat"></div>
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
		name: 'app',
		data() {
      var checkGroupId = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入组编号'));
        } else if (/[\u4E00-\u9FA5]/i.test(value)) {
          return callback(new Error("组编号格式不正确，不能包含中文"));
        } else {
          callback()
        }
      }
			return {
				sendJson: {
					"pageNo":1,
					"pageSize":10,
					"params": {
						"groupId": "", //分组编号
						"groupName": "", //组名
						"groupState": "" //启用状态
					}
				},
				groupId: "",
				stateList: [],
				tableData: [],
				listData: {},
				dialogVisible: false,
				title: '',
				ruleForm: {
          "groupId": "",//组编号
          "groupName": "",//组名
          "groupState": "",//启用状态
          "remark": ""//备注
        },
				rules: {
					groupId: [
						{ validator: checkGroupId, required: true, trigger: 'blur' }
					],
					groupName: [
						{ required: true, message: '请输入组名', trigger: 'blur' }
					],
					groupState: [
						{ required: true, message: '请选择启用状态', trigger: 'change' }
					]
				}
			}
		},
		created() {
			this.getState()
			this.submitQuery()
		},
		methods: {
			/**************************
		       函数描述:获取状态
		       人员：yyp（姓名简称）
	    **************************/
			getState() {
				let that = this
				that.$axios.get(api + "/ngcos/collectionSysMenu/getAllMenuState").then(function(res) {
					let result = res.data
					if(result.code == "200") {
						that.stateList = result.data.list
					} else {
						that.$message(result.message);
					}
				}).catch()
			},
			/**************************
		       函数描述:按条件查询数据
		       人员：yyp（姓名简称）
	    **************************/
			submitQuery() {
				let that = this
				that.$axios.post(api + "/ngcos/collectionGroup/queryCollectionGroupList", that.sendJson).then(function(res) {
					let result = res.data
					if(result.code == "200") {
						that.tableData = result.data.list
						delete result.data.list
						that.listData = result.data
						that.groupId = ''
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
		       函数描述:新增用户组
		       人员：yyp（姓名简称）
	    **************************/
			addEvent() {
				let that = this
				for(let item in this.ruleForm) {
					this.ruleForm[item] = ''
				}
				that.groupId = ''
				that.title = '新增用户组'
				that.dialogVisible = true
			},
			clickitem(e) {
				e === this.groupId ? this.groupId = '' : this.groupId = e
			},
			/**************************
		       函数描述:编辑用户组
		       人员：yyp（姓名简称）
	    **************************/
			editEvent() {
				let that = this
				let newForm = ''
				if(that.groupId) {
					for(let i = 0; i < that.tableData.length; i++) {
						if(that.tableData[i].groupId == that.groupId) {
							newForm = that.tableData[i]
						}
					}
					that.ruleForm.groupId = newForm.groupId
					that.ruleForm.groupName = newForm.groupName
          that.ruleForm.groupState = newForm.groupState.toString()
          that.ruleForm.remark = newForm.remark

					that.title = '编辑用户组'
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
		       函数描述:用户管理
		       人员：yyp（姓名简称）
	    **************************/
			userSet() {
				let that = this
				if(that.groupId) {
					that.$router.push({ path: 'userSet' })
					localStorage.setItem("groupId", that.groupId)
				} else {
					that.$message.error("请先选中一项")
				}
			},
			/**************************
		       函数描述:删除数据
		       人员：yyp（姓名简称）
	    **************************/
			deleteEvent() {
				let that = this
				if(that.groupId) {
					this.$confirm('是否删除这条信息？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let deleteData = {
							groupId: that.groupId
						}
						that.$axios.post(api + "/ngcos/collectionGroup/deleteGroup", deleteData).then(function(res) {
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
				const that = this
				that.sendJson.pageSize = val
				that.submitQuery()
			},
			/**************************
		       函数描述:跳转到指定页码
		       人员：yyp（姓名简称）
	    **************************/
			handleCurrentChange(val) {
				this.sendJson.pageNo = val
				this.submitQuery()
			},
			/**************************
		       函数描述:保存新增/编辑的数据
		       人员：yyp（姓名简称）
	    **************************/
			addSubmit(formName) {
				let that = this, url = "/ngcos/collectionGroup/saveCollectionGroup"
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(that.groupId) {
							url = "/ngcos/collectionGroup/uCollectionGroup"
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
