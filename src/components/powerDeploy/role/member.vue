<style lang="less">
</style>

<template>
    <div id="content">
        <el-form :inline="true" :model="query.params" ref="ruleForm">
            <el-form-item label="姓名" prop="name">
                <el-input placeholder="姓名" v-model="query.params.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input placeholder="手机号" v-model="query.params.mobile"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userId">
                <el-input placeholder="用户名" v-model="query.params.userId"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getQuery">查询</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <!--<el-col :span="12">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" @click="getQuery">查询</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>-->
        <el-col :span="24">
            <el-button type="primary" @click="toAdd"  icon="el-icon-plus">添加员工</el-button>
            <el-button type="danger" @click="delUser">移除</el-button>
        </el-col>
        <el-table :data="tableData" @selection-change="handleSelectionChange($event,'tableData','deleteUserIds')" index ref="multipleTable">
          <el-table-column type="selection" width="55" v-model="multipleSelection"></el-table-column>
          <el-table-column align="center" label="" width="55" type="index" ></el-table-column>
          <el-table-column align="center" prop="name" label="姓名"></el-table-column>
          <el-table-column align="center" prop="userId" label="用户名"></el-table-column>
          <el-table-column align="center" prop="mobile" label="手机号" :formatter="formatPhone"></el-table-column>
        </el-table>

        <div class="pag-index">
            <el-pagination
                style="margin-top:20px;"
                @size-change="handleSizeChange($event,'query','getQuery')"
                @current-change="handleCurrentChange($event,'query','getQuery')"
                :current-page="query.pageNo"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="query.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="listData.total"
            >
            </el-pagination>
        </div>
          <el-dialog title="添加成员" :visible.sync="dialogFormVisible" class="dialog-container">
                <el-form :model="memberQuery" ref="memberForm" :inline="true">
                     <el-form-item label="用户编号" prop="userId">
                        <el-input placeholder="请输入用户编号" v-model="memberQuery.params.userId"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名称" prop="name">
                        <el-input placeholder="请输入用户名称" v-model="memberQuery.params.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.native="getOtherMembers">查询</el-button>
                        <el-button type="primary" @click.native="resetMember">重置</el-button>
                    </el-form-item>
                </el-form>
                 <el-table :data="memberData" @selection-change="handleSelectionChange($event,'memberData','addUserIds')" index ref="multipleMember">
                    <el-table-column label="" width="55" type="index" ></el-table-column>
                    <el-table-column type="selection" width="55" v-model="memberSection"></el-table-column>
                    <el-table-column align="center" prop="name" label="姓名"></el-table-column>
                    <el-table-column align="center" prop="userId" label="用户名"></el-table-column>
                    <el-table-column align="center" prop="mobile" label="手机号" :formatter="formatPhone"></el-table-column>
                </el-table>

                <div class="pag-index">
                    <el-pagination
                        style="margin-top:20px;"
                        @size-change="handleSizeChange($event,'memberQuery','getOtherMembers')"
                        @current-change="handleCurrentChange($event,'memberQuery','getOtherMembers')"
                        :current-page="memberQuery.pageNo"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="memberQuery.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="memberListData.total"
                    >
                    </el-pagination>
                </div>
               <div class="text-center mt25 p15">
                   <el-button type="primary" @click.native="addMember">确认添加</el-button>
                    <el-button @click.native="dialogFormVisible=false">取消</el-button>
               </div>
          </el-dialog>
    </div>
</template>

<script>
    import _ from 'underscore';
export default {
    data() {
        return {
            query:{
                params: {
                    roleId:"", // 角色id
                    userId:'', // 用户id
                    name:'', // 姓名
                    mobile:'', // 电话号码
                },
                pageNo: 1,
                pageSize: 10
            },
            memberQuery:{
                params: {
                    roleId: "", // 角色id
                    userId:'', // 用户id
                    name:'', // 姓名
                    mobile:'', // 电话号码
                },
                pageNo: 1,
                pageSize: 10
            },
            roleId: "", // 当前角色id
            listData:{},
            tableData: [],
            memberData:[],
            memberListData:[],
            // 成员对象
            dialogFormVisible:false,// 添加新成员的弹窗开关
            multipleSelection:[],// 批量选中的数组
            memberSection:[], // 改角色成员下批量选中的数组
            deleteUserIds:'', // 删除成员的userId
            addUserIds:'', // 添加成员的userId
            combinMember:[] // 保存批量选中的成员对象
        };
    },
    activated () {
        this.query.params.roleId = this.$route.query.roleId
        this.roleId = this.$route.query.roleId
        this.memberQuery.params.roleId = this.$route.query.roleId
        this.getQuery()
    },
    methods: {
        getQuery(){
            // 已添加用户
            this.$axios
                .post(`${api}/ngcos/collectionSysRole/userListByRoleId`, this.query)
                .then(res => {
                    let {data,message,code} = res.data;
                    if(code === '200') {
                        this.listData = data;
                        this.tableData = data.list;
                    }else{
                        if(message)  this.$message.error(message)
                    }
                });
        },
        // 未添加用户列表
        getOtherMembers(){
            this.$axios.post(`${api}/ngcos/collectionSysRole/userListByRoleIdNo`,this.memberQuery).
            then(res => {
                let {data,message,code} = res.data;
                if(code === '200') {
                    this.memberListData = data;
                    this.memberData = data.list;
                }
            })
        },
        formatPhone(row) {
            if(row.mobile){
                return row.mobile.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
            }else{
                return '';
            }
        },
        handleSizeChange: function (val,paramName,functionName) {
            this[paramName].pageSize = val
            this[functionName]()
        },
        handleCurrentChange: function (val,paramName,functionName) {
            this[paramName].pageNo = val
            this[functionName]()
        },
        handleSelectionChange(val,tableName,userIdsName){
            if(tableName === 'memberData') this.combinMember = val;
            let idArr = [];
            // indexArr 索引数组 idArr 删除的userid
            _.each(this[tableName],(value,index) => {
                _.each(val,item => {
                    if(_.isEqual(item,value)) {
                        idArr.push(item.userId) // 保存需要删除的用户suerId
                    }
                })
            })
            this[userIdsName] = idArr.join(';')
        },
        toAdd(){
            this.resetMember();
          this.dialogFormVisible = true;
        },
        delUser(){
            if(!this.deleteUserIds)  {
                this.$message.error('请先选中列表');
                return false;
            }

            this.$confirm(`确认删除选中的所有员工`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post(`${api}/ngcos/collectionSysRole/delRoleUser`,{roleId:this.roleId,userIds:this.deleteUserIds}).then(res => {
                    let {code,message} = res.data;
                    if(code === '200'){
                        this.$message({type:'success',message:'删除成功'})
                        let idsArr = this.deleteUserIds.split(';');// 将userId字符串转换成数组
                        _.each(idsArr,item => {
                             let currentIndex;
                            if(_.some(this.tableData,(val,index) => {currentIndex = index;return item === val.userId;})) {
                                this.tableData.splice(currentIndex,1)
                            }
                        })
                        _.each(this.tableData,(value,index) => {
                            console.log(value)
                            if(value && idsArr.indexOf(value.userId) > -1) {
                                this.tableData.splice(index,1);
                            }
                        })
                    }else{
                        if(message) this.$message.error(message);
                    }
                })
            }).catch((error) => {
                console.log(error)
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
            });
        },
        resetForm(formName) {
           this.$refs[formName].resetFields()
        },
        resetMember(){
            this.memberQuery = {
                params: {
                    roleId:this.$route.query.roleId, // 角色id
                    userId:'', // 用户id
                    name:'', // 姓名
                    mobile:'', // 电话号码
                },
                pageNo: 1,
                pageSize: 10
            }
          this.getOtherMembers()
        },
        // 添加成员
        addMember(){
            if(!this.addUserIds)  {
                this.$message.error('请先选中列表');
                return false;
            }

            this.$axios.post(`${api}/ngcos/collectionSysRole/saveRoleUser`,{roleId:this.roleId,userIds:this.addUserIds}).then(res => {
                    let {code,message} = res.data;
                    if(code === '200'){
                        this.$message({type:'success',message:'添加成功'})
                        this.tableData = this.tableData.concat(this.combinMember);
                        this.dialogFormVisible = false;
                    }else{
                        if(message) this.$message.error(message);
                    }
                })
        }
    }
};
</script>
