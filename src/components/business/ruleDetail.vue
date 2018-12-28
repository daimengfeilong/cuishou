<style lang="less">
  .diyStyle{
    .el-form-item__content{
      width: 184px;
    }
  }
</style>
<template>
	<div>

		<p class="btnListContainer">
			<el-button type="primary" icon="el-icon-edit" size="small" @click="openModel('edit')">编辑</el-button>
		</p>
		<div class="tableViewContainer userList">
			<el-table :data="list" highlight-current-row style="width: 100%">
				<el-table-column width="55" align="center">
					<template slot-scope="scope">
						<el-radio v-model="overRuleId" :label="scope.row.overRuleId" @click.native.prevent="clickitem(scope.row)">01</el-radio>
					</template>
				</el-table-column>
        <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
        <el-table-column prop="overLevelName" label="入催等级" width="100" align="center"></el-table-column>
				<el-table-column prop="overBeginNum" label="入催开始时间(天)" align="center"></el-table-column>
				<el-table-column prop="overEndNum" label="入催结束时间(天)" align="center"></el-table-column>
        <el-table-column prop="overRuleId" label="催收机构类型" show-overflow-tooltip width="280" align="center"></el-table-column>
				<el-table-column prop="groupName" label="小组/机构名称" align="center"></el-table-column>
				<el-table-column prop="rowAddUser" label="权重比例" align="center"></el-table-column>
			</el-table>
		</div>
		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageNo" :page-sizes="[10, 20, 30, 50]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
			</el-pagination>
		</div>

		<el-dialog :title="title" :visible.sync="dialogVisible" :before-close="closeForm">
			<el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="110px">
				<el-form-item label="入催等级" prop="overLevel">
					<el-select v-model="ruleForm.overLevel" placeholder="请选择" clearable>
						<el-option v-for="(item,index) in rankList" :key="index" :label="item.overLevelName" :value="item.overLevel"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="入催开始天数" prop="overBeginNum">
					<el-input :maxlength="3" placeholder="请输入内容" v-model="ruleForm.overBeginNum" clearable></el-input>
				</el-form-item>
				<el-form-item label="入催结束天数" prop="overEndNum">
					<el-input :maxlength="3" placeholder="请输入内容" v-model="ruleForm.overEndNum" clearable></el-input>
				</el-form-item>
				<el-form-item label="催收组" prop="groupName">
					<el-autocomplete v-model="ruleForm.groupName" :fetch-suggestions="querySearchAsync" placeholder="请输入组名" clearable @select="handleSelect1"></el-autocomplete>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="closeForm">取 消</el-button>
		    <el-button type="primary" @click="addInfo('ruleForm')">确 定</el-button>
		  </span>
		</el-dialog>

	</div>
</template>
<script>
	import _ from 'underscore'
	export default {
		data() {
			return {

				timeout: null,
				title: '',
				searchJson: {
					"caseType": '',
					"overRuleId": "",
					"overRuleName": "",
					"overBeginNum": "", //入催开始天数
					"overEndNum": "", //入催结束天数
					"overBeginAmt": "", //期款开始金额
					"overEndAmt": "", //期款结束金额
					"overLevel": "", //入催等级
					"groupNo": "", //催收组Id
					"groupName": "" //催收组Id
				},
				list: [],
				totalCount: 1,
				"page": {
					"pageNo": 1,
					"pageSize": 10
				},
				dialogVisible: false,
				overRuleId: "",
        rowForm: {},
				rankList: [],
				//				restaurants: [],
				//				groupList: [],
				restaurants: [],
				ruleForm: {
					"overRuleId": "", //根据规则编号判断修改，存在该规则编号数据则修改，不存在则新增
					"overRuleName": "",
					"overBeginNum": "",
					"overEndNum": "",
					"overLevel": "",
					"groupNo": "",
          "groupName": ""
				},
				rules: {
					overLevel: [
						{ required: true, message: '请选择入催等级', trigger: 'change' },
						//						{ min: 4, max: 30, message: '长度在 4 到 30 个字符', trigger: 'blur' }
					],
					overBeginNum: [
						{ required: true, message: '请输入入催开始天数', trigger: 'blur' },
						{ validator: this.checkNumber, trigger: 'blur'}
					],
					overEndNum: [
						{ required: true, message: '请输入入催结束天数', trigger: 'blur' },
						{ validator: this.checkNumber, trigger: 'blur'}
					],
          groupName: [
						{ required: true, message: '请选择催收组', trigger: 'blur' }
					]
				}
			}
		},
		created() {
			let that = this
			that.getList()
			that.getRankList()
      that.getGroupList()
		},
		mounted() {
		},
		methods: {
			/**************************
			 函数描述:验证数字输入
			 人员：yyp（姓名简称）
			 **************************/
			checkNumber(rule, value, callback){
		        let reg = /^[0-9]{0,3}$/
		        if (value === "") {
			    } else if(!reg.test(value)){
			      	callback(new Error("请输入数字"))
		        }else {
		          callback()
		        }
		    },
			/**************************
			 函数描述:重置表单内容
			 人员：zzm（姓名简称）
			 **************************/
			resetForm: function() {
				let that = this
				for (let item in that.ruleForm) {
          that.ruleForm[item] = ""
        }
			},
			/**************************
			 函数描述:删除记录
			 功能描述：选中记录，点击删除，确认删除之后 发起删除操作
			 人员：zzm（姓名简称）
			 **************************/
			del: function() {
				let that = this
				if(that.overRuleId === "") {
					that.$message({
						message: '请选中你要删除的记录！',
						type: 'warning'
					});
					return false
				}

				that.$confirm('确认删除本条分配规则?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					that.$http.post(api + '/ngcos/rule/deleteCaseRule', { "overRuleId": that.overRuleId })
						.then(function(response) {
						let message = "删除失败！"
						if(response.data.code == 200) {
							message = '删除成功!'
							that.getList()
						}
						that.$message({ type: 'success', message: message });
					})
					.catch(function(response) {})

				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			/**************************
			 函数描述:获取催收等级
			 人员：zzm（姓名简称）
			 **************************/
			getRankList: function() {
				let that = this
				that.$http.get(api + '/ngcos/rule/getCollectionLevelEnum')
				.then(function(response) {
					let result = response.data.data
					that.rankList = result.list
				})
				.catch(function(response) {})
			},
			/**************************
			 函数描述:获取催收组
			 人员：yyp（姓名简称）
			 **************************/
			querySearchAsync (queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					cb(results);
				}, 2000 * Math.random());
			},
			createStateFilter (queryString) {
				return(state) => {
					return(state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect (item) {    //查询表单中搜索框的选中事件
        this.searchJson.groupNo = item.address
        this.searchJson.groupName = item.value
			},
      handleSelect1 (item) {   //新增和编辑中搜索框的选中事件
        this.ruleForm.groupNo = item.address
        this.ruleForm.groupName = item.value
      },
			getGroupList () {
				let that = this
				that.$http.get(api + '/ngcos/collectionCaseQuery/getAllGroup')
					.then(function(response) {
						let result = response.data.data,
							oneTime = {}
						for(let i = 0; i < result.list.length; i++) {
							oneTime = {
								"value": result.list[i].groupName,
								"address": result.list[i].groupId
							}
							that.restaurants.push(oneTime)
						}
					})
					.catch(function(response) {})
			},

			/**************************
			 函数描述:保存添加信息，成功则关闭模态框，失败则弹出相关提示
			 人员：zzm（姓名简称）
			 **************************/
			addInfo: function(formName) {
				let that = this
				this.$refs[formName].validate((valid) => {
					if(valid) {
						delete that.ruleForm.groupName
						that.$http.post(api + '/ngcos/rule/saveCaseRule', that.ruleForm)
						.then(function(response) {
							let result = response.data
							if(result.code == 200) {
								that.getList()
								that.resetForm()
                that.$message.success(result.message);
								that.dialogVisible = false //关闭模态框
							} else {
                that.$message.error(result.message);
              }
						})
						.catch(function(response) {})
					} else {
						return false;
					}
				})
			},
			/**************************
		         函数描述:选择/取消选择
		       人员：yyp（姓名简称）
	       **************************/
			clickitem (row) {
        let that = this

				that.overRuleId = row.overRuleId
        that.rowForm = row
			},
			/**************************
			 函数描述:打开弹出框
			 人员：zzm（姓名简称）
			 **************************/
			openModel(type) {
				let that = this
//				that.getGroupList()
				that.title = "新增分配规则配置"
				if (type == "edit") {
					that.title = "编辑分配规则配置"
					if(that.overRuleId === "") {
						that.$message({
							message: '请选中你要修改的规则！',
							type: 'warning'
						});
						return false
					}

          that.ruleForm.overRuleId = that.rowForm.overRuleId //根据规则编号判断修改，存在该规则编号数据则修改，不存在则新增
          that.ruleForm.overRuleName=that.rowForm.overRuleName
          that.ruleForm.overBeginNum = that.rowForm.overBeginNum
          that.ruleForm.overEndNum = that.rowForm.overEndNum
          that.ruleForm.overLevel = that.rowForm.overLevel
          that.ruleForm.groupNo = that.rowForm.groupNo
          that.ruleForm.groupName = that.rowForm.groupName

				} else {
          that.resetForm()
        }
				that.dialogVisible = true
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
			 函数描述:重置查询条件
			 人员：zzm（姓名简称）
			 **************************/
			resetSearch: function(formName) {
				let that = this
				for (let item in formName) {
          formName[item] = ""
        }
				that.goSearch()
			},
			/**************************
			 函数描述:根据查询条件 请求api
			 人员：zzm（姓名简称）
			 **************************/
			goSearch: function() {
				let that = this
				that.page.pageNo = 1
				that.getList()
			},
			/**************************
			 函数描述:获取当前列表页数据
			 人员：zzm（姓名简称）
			 **************************/
			getList: function() {
				let that = this
				let sendJson = {}
				that.overRuleId = "" //重置选中项
				sendJson = that.page
				sendJson.params = that.searchJson
				that.$http.post(api + '/ngcos/rule/queryCaseRuleList', sendJson)
					.then(function(response) {
						let result = response.data.data
						that.list = result.list
						that.totalCount = result.total
					})
					.catch(function(response) {})
			},
			/**************************
			 函数描述:翻页
			 人员：zzm（姓名简称）
			 **************************/
			handleSizeChange: function(val) {
				let that = this
				that.page.pageSize = val
				that.getList()

			},
			/**************************
			 函数描述:修改当前pageNo
			 人员：zzm（姓名简称）
			 **************************/
			handleCurrentChange: function(val) {
				let that = this
				that.page.pageNo = val
				that.getList()
			}
		}
	}
</script>
