<style lang="less">

</style>
<template>
	<div class="userList">
		<el-row>
			<el-form :inline="true" :model="sendJson.params" class="" label-width="80px" size="small">
				<el-form-item label="用户名">
					<el-input v-model="sendJson.params.name" placeholder="用户名" clearable></el-input>
				</el-form-item>
				<el-form-item label="登录名">
					<el-input v-model="sendJson.params.userId" placeholder="登录名" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" @click="submitQuery()">查询</el-button>
					<el-button icon="el-icon-bell" @click="resetForm()">重置</el-button>
					<el-button icon="el-icon-back" @click="goBack()">返回</el-button>
				</el-form-item>
				<!--</el-col>-->
			</el-form>
		</el-row>
		<el-row class="m15">
			<el-button size="small" type="primary" icon="el-icon-plus" @click="addEvent">添加组员</el-button>
			<el-button size="small" icon="el-icon-delete" class="mr70" @click="deleteEvent">移除组员</el-button>

		</el-row>
		<el-row>
			<template>
				<el-table :data="tableData" highlight-current-row style="width: 100%" @selection-change="deleteChangeFun">
          <el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="50" align="center"></el-table-column>
					<!--<el-table-column width="55" align="center">
            <template slot-scope="scope">
              <el-radio v-model="userId" :label="scope.row.userId"  @click.native.prevent="clickitem(scope.row.userId)">01</el-radio>
            </template>-->
					</el-table-column>
					<el-table-column prop="name" label="用户姓名" align="center"></el-table-column>
					<el-table-column prop="userId" label="登录名" align="center"></el-table-column>
				</el-table>
			</template>
			<div class="pag-index">
				<el-pagination style="margin-top:20px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listData.pageNum" :pager-count="11" :page-sizes="[10, 20, 30, 50]" :page-size="listData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listData.total">
				</el-pagination>
			</div>
		</el-row>
		<el-dialog title="添加组员" :visible.sync="dialogVisible" width="70%">
			<el-row>
				<el-form :inline="true" :model="formJson.params" class="" label-width="80px" size="small">
					<el-form-item label="用户名">
						<el-input v-model="formJson.params.name" placeholder="用户名" clearable></el-input>
					</el-form-item>
					<el-form-item label="登录名">
						<el-input v-model="formJson.params.userId" placeholder="登录名" clearable></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="el-icon-search" @click="formQuery()">查询</el-button>
						<el-button icon="el-icon-bell" @click="resetFormView()">重置</el-button>
					</el-form-item>
					<!--</el-col>-->
				</el-form>
			</el-row>
			<el-row>
				<template>
					<el-table :data="formTableData" highlight-current-row style="width: 100%" @selection-change="changeFun">
						<el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="50" align="center"></el-table-column>
						<el-table-column prop="name" label="用户姓名" align="center"></el-table-column>
						<el-table-column prop="userId" label="登录名" align="center"></el-table-column>
					</el-table>
				</template>
				<div class="pag-index">
					<el-pagination style="margin-top:20px;" @size-change="formSizeChange" @current-change="formCurrentChange" :current-page="formListData.pageNum" :pager-count="11" :page-sizes="[10, 20, 30, 50]" :page-size="formListData.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="formListData.total">
					</el-pagination>
				</div>
			</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addSubmit('ruleForm')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		name: 'app',
		data() {
			return {
				groupId: "", // 以下是用户组下用户页面的相关参数
				sendJson: {
					"params": {
						"groupId": "", //分组编号
						"name": "", //用户名
						"userId": "" //登录名
					}
				},
				tableData: [],
				deleteSelete: [],
				listData: {},
				formJson: { // 以下是用户组下用户页面添加用户弹框的相关参数
					"params": {
						"groupId": "", //分组编号
						"name": "", //用户名
						"userId": "" //登录名
					}
				},
				dialogVisible: false,
				formTableData: [],
				addSelete: [],
				formListData: {},
				ruleForm: {
					"groupId": "", //组编号（组编号存在用户组：修改, 组编号不存在：新增）
					"userIds": "" //用户id (用英文;拼接) 如："01181111;01181112;"
				}
			}
		},
    activated () {
			this.groupId = localStorage.getItem("groupId")
			this.sendJson.params.groupId = localStorage.getItem("groupId")
			this.formJson.params.groupId = localStorage.getItem("groupId")
			this.ruleForm.groupId = localStorage.getItem("groupId")
			this.submitQuery()
		},
		methods: {
			/**************************
		       函数描述:用户组成员-按条件查询
		       人员：yyp（姓名简称）
	    **************************/
			submitQuery() { //查询
				let that = this
				that.$axios.post(api + "/ngcos/collectionGroup/queryUserByGroupId", that.sendJson).then(function(res) {
					let result = res.data
					if(result.code == "200") {
						that.tableData = result.data.list
						delete result.data.list
						that.listData = result.data
					} else {
						that.$message(result.message);
					}
				}).catch()
			},
			/**************************
		       函数描述:用户组成员-重置查询条件
		       人员：yyp（姓名简称）
	    **************************/
			resetForm() {
				const that = this
				for(let item in that.sendJson.params) {
					that.sendJson.params[item] = ''
				}
				that.sendJson.params.groupId = localStorage.getItem("groupId")
			},
			/**************************
		       函数描述:用户组成员-添加用户组成员
		       人员：yyp（姓名简称）
	    **************************/
			addEvent() {
				let that = this
				this.ruleForm.userIds = ''
				that.dialogVisible = true
				that.formQuery()
				that.resetFormView()
			},
			/**************************
		       函数描述:用户组成员-获取多选选择数据
		       人员：yyp（姓名简称）
	    **************************/
			deleteChangeFun(val) {
				let that = this
				that.deleteSelete = []
				for(let i = 0; i < val.length; i++) {
					that.deleteSelete.push(val[i].userId)
				}
				that.ruleForm.userIds = that.deleteSelete.join(";")
			},
			/**************************
		       函数描述:用户组成员-删除选中的数据
		       人员：yyp（姓名简称）
	    **************************/
			deleteEvent() {
				let that = this
				if(that.ruleForm.userIds) {
					this.$confirm('是否删除这条信息？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						that.$axios.post(api + "/ngcos/collectionGroup/dUser", that.ruleForm).then(function(res) {
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
		       函数描述:用户组成员-设置每页显示的条数
		       人员：yyp（姓名简称）
	    **************************/
			handleSizeChange(val) {
				const that = this
				that.sendJson.pageSize = val
				that.submitQuery()
			},
			/**************************
		       函数描述:用户组成员-跳转到指定页码
		       人员：yyp（姓名简称）
	    **************************/
			handleCurrentChange(val) {
				this.sendJson.pageNo = val
				this.submitQuery()
			},
			// 以下是用户组下用户页面添加用户弹框的相关交互
			/**************************
		       函数描述:弹窗用户-按条件查询数据
		       人员：yyp（姓名简称）
	    **************************/
			formQuery() {
				let that = this
				that.$axios.post(api + "/ngcos/collectionGroup/queryUserByGroupIdNo", that.formJson).then(function(res) {
					let result = res.data
					if(result.code == "200") {
						that.formTableData = result.data.list
						delete result.data.list
						that.formListData = result.data
					} else {
						that.$message(result.message);
					}
				}).catch()
			},
			/**************************
		       函数描述:弹窗用户-重置查询条件
		       人员：yyp（姓名简称）
	    **************************/
			resetFormView() {
				const that = this
				for(let item in that.formJson.params) {
					that.formJson.params[item] = ''
				}
				that.formJson.params.groupId = localStorage.getItem("groupId")
			},
			/**************************
		       函数描述:弹窗用户-设置每页显示条数
		       人员：yyp（姓名简称）
	    **************************/
			formSizeChange(val) {
				const that = this
				that.formJson.pageSize = val
				that.formQuery()
			},
			/**************************
		       函数描述:弹窗用户-跳转到指定页码
		       人员：yyp（姓名简称）
	    **************************/
			formCurrentChange(val) {
				this.formJson.pageNo = val
				this.formQuery()
			},
			/**************************
		       函数描述:弹窗用户-获取选择的数据
		       人员：yyp（姓名简称）
	    **************************/
			changeFun(val) {
				let that = this
				that.addSelete = []
				for(let i = 0; i < val.length; i++) {
					that.addSelete.push(val[i].userId)
				}
				that.ruleForm.userIds = that.addSelete.join(";")
			},
			/**************************
		       函数描述:弹窗用户-保存添加的成员
		       人员：yyp（姓名简称）
	    **************************/
			addSubmit(formName) {
				let that = this
        if (!that.ruleForm.groupId) {
          that.$message.warning("用户组编号不能为空");
          return false;
        }
        if (!that.ruleForm.userIds) {
          that.$message.warning("请至少选择一位用户");
          return false;
        }
				that.$axios.post(api + "/ngcos/collectionGroup/addUser", that.ruleForm).then(function(res) {
					let result = res.data
					if(result.code == "200") {
						that.dialogVisible = false
						that.submitQuery()
						that.ruleForm.userIds = ''
					} else {
						that.$message(result.message);
					}
				}).catch()
			},
      goBack () {
        this.$router.push("userGroup")
      }
		}
	}
</script>
