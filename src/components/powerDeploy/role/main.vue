<style lang="less">
</style>

<template>
    <div id="content">
        <el-form :inline="true" :model="query.params">
            <el-form-item label="角色名称" prop="name">
                <el-input placeholder="请输入角色名称" v-model="query.params.name"></el-input>
            </el-form-item>

            <el-form-item label="创建时间">
                <el-date-picker
                    type="daterange"
                    v-model="date"
                    @change="dateChange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
             <el-form-item>
                <el-button type="primary" @click.native="getQuery(1)">查询</el-button>
                <el-button type="primary" @click.native="resetQuery(query.params)">重置</el-button>
            </el-form-item>
        </el-form>

        <el-col>
            <el-button type="primary" @click.native="edit('13900001')">新建</el-button>
            <el-button type="primary" @click.native="edit('13900002')">详情</el-button>
            <el-button type="primary" @click.native="edit('13900003')">编辑</el-button>
            <el-button type="primary" @click.native="memberManage">成员管理</el-button>
            <el-button @click.native="deleteRole">删除</el-button>
        </el-col>
        <el-table :data="tableData">
            <el-table-column label="" width="55" >
                 <template slot-scope="scope">
                    <el-radio  :label="scope.$index" v-model="radio"  @change.native="chooseSingle(scope.$index,scope.row)">&nbsp</el-radio>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="角色名称"></el-table-column>
            <el-table-column align="center" prop="depict" label="描述"></el-table-column>
            <el-table-column align="center" prop="rowAddTime" label="创建时间"></el-table-column>
        </el-table>

        <div class="pag-index">
            <el-pagination
                style="margin-top:20px;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="query.pageNo"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="query.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="listData.total"
            >
            </el-pagination>
        </div>
         <el-dialog :title="operateTitle" :visible.sync="dialogFormVisible" :before-close="closeForm" class="dialog-container">
             <el-form :model="roleJson"  ref="roleForm" :rules="roleRules" label-width="80px">
                 <el-form-item label="角色编号" prop="role">
                    <!-- 编辑的时候角色编号不可编辑 -->
                     <span v-if="isUpdate === '13900002'">{{roleJson.role}}</span>
                    <el-input v-else v-model="roleJson.role"  :disabled="isUpdate === '13900003'" :maxlength="20" placeholder="角色编号"></el-input>

                </el-form-item>
                <el-form-item label="角色名称" prop="name">
                     <span v-if="isUpdate === '13900002'">{{roleJson.name}}</span>
                    <el-input v-else v-model="roleJson.name"  placeholder="请输入角色名称" :maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="权限配置" >
                    <el-tree ref="tree" :data="menuTree" show-checkbox node-key="id"  :default-expand-all="true" :default-checked-keys="checkedNodes" :props="defaultProps">
                    </el-tree>
                </el-form-item>
              <el-form-item label="备注信息" prop="depict">
                <span v-if="isUpdate === '13900002'">{{roleJson.depict}}</span>
                <el-input v-model="roleJson.depict" type="area" :maxlength="50" placeholder="请输入备注信息，最多50字" clearable v-else></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer text-center">
                <el-button type="primary" @click.native="confirmSave(true)" v-if="isUpdate === '13900003'">保存</el-button>
                <el-button type="primary" @click.native="confirmSave(false)" v-if="isUpdate === '13900001'">添加</el-button>
                <el-button type="warning" @click.native="resetForm('roleForm',false)" v-if="/13900001|13900003/.test(isUpdate)">重置</el-button>
                <el-button @click="closeForm">取消</el-button>
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
                    name:'', // 角色名称
                  rowAddTimeBegin:'', // 创建时间begin
                  rowAddTimeEng:'' // 创建时间End
                },
                pageNo: 1,
                pageSize: 10
            },
            listData:{},
            tableData: [],
            date:'',
            operateTitle:'',
            dialogFormVisible:false,
            roleJson:{
                role: '', // 角色编号
                name: '', // 角色名
                modules: '', //权限
                depict:'' // 描述
            },
            roleRules: {
                role:[ {message:'请输入角色编号', trigger: 'blur',required: true }],
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                ],
                modules: [
                    {required: true, message: '请输入配置权限', trigger: 'blur'},
                ]
            },
            currRoleData:{}, // 选中的当前角色的数据对象
            radio:"",
            isUpdate:null,
            menuTree: [],
            checkedNodes:[],
            defaultProps: {
                children: "children",
                label: "name"
            }
        };
    },
    mounted() {
        this.getQuery()
        this.getMenuList();
    },
    methods: {
        getQuery(val){
            if(val) this.query.pageNo = val;
            this.$axios
                .post(`${api}/ngcos/collectionSysRole/rolesList`,this.query)
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
        dateChange(val){
            if(val){
                this.query.params.rowAddTimeBegin = val[0]
                this.query.params.rowAddTimeEng = val[1]
                this.getQuery(1)
            }else{
                this.query.params.rowAddTimeBegin = ''
                this.query.params.lastLoginDateMax = ''
            }
        },
        getMenuList(){
            this.$axios.post(`${api}/ngcos/collectionSysMenu/menuListuByLogerName`,{id:this.currRoleData.id})
            .then(res => {
                /*  权限列表相关注释
                    --
                    @params {Number} id 菜单id
                    @params {String} opt 是否勾选（1为勾选，0为未勾选）
                    @params {Number} parentId 父菜单id
                    @params {Array} children 子菜单对象数组
                */
                let {data,message,code} = res.data;
                if(code === '200'){
                    this.menuTree = data.list;

                    // 获取已经选中的权限
                    this.checkedNodes = []  //清空选中节点的id
                    this.getCheckedMenus(this.menuTree);
                }else{
                    if(message) this.$message.error(message)
                }
            })
        },
        handleSizeChange: function (val) {
            this.query.pageSize = val
            this.getQuery()
        },
        getCheckedMenus(tree){
             _.each(tree,item => {
                if(item.opt === '1'){
                    this.checkedNodes.push(item.id)
                }
                if(Array.isArray(item.children) && item.children.length){
                    this.getCheckedMenus(item.children)
                }
            })
        },
        handleCurrentChange: function (val) {
            this.query.pageNo = val
            this.getQuery()
        },
        // 编辑
        edit(tag){
            // @param {String} tag 新增 write 或者 查阅 read 编辑 update
            // 13900001 => 添加 13900002 => 查阅 13900003 => 编辑

            if(tag === '13900001') {
                this.roleJson = {role:'',name:'',modules:'',depict:''}; // 添加的时候将绑定对象初始化
                this.dialogFormVisible = true;
                this.operateTitle = '新增角色'
                if (this.$refs.tree) {
                  this.$refs.tree.setCheckedKeys([]) //清空勾选节点
                }

            }else if(/\d+/.test(this.radio)) {
                this.getMenuList();
                this.dialogFormVisible = true;
            }else {
                 this.$message({
                    type: 'warning',
                    message: '请先选中某个角色'
                });
            }

            if(tag === '13900002'){
                this.operateTitle = '查阅详情'
            }else if(tag === '13900003') {
                this.operateTitle = '编辑角色'
            }

            this.isUpdate = tag;
        },
        // 成员管理
        memberManage(){
            if(!/\d+/.test(this.radio)) {
                 this.$message({
                    type: 'warning',
                    message: '请先选中某个角色'
                });
            }else{
                 this.$router.push({path:'/main/system/memberManage',query:{roleId: this.currRoleData.id}});
            }
        },
        confirmSave(tag){
            // @params {Boolean} 保存还是新增; true => 保存 false => 新增
              let req_url = tag ? '/ngcos/collectionSysRole/roles/urole' : '/ngcos/collectionSysRole/roles/role'
             if(!tag) this.roleJson = _.omit(this.roleJson,'id')

            this.roleJson.modules = this.$refs.tree.getCheckedKeys().join(';');
             this.$refs.roleForm.validate(valid => {
                if(valid) {
                     this.$axios.post(`${api}${req_url}`,this.roleJson)
                    .then(res => {
                        let {message,code} = res.data,info = tag ? '保存角色成功' : '新增角色成功'
                        if(code === '200') {
                             this.$message({
                               type: 'success',
                               message: info + '，即将刷新页面',
                               onClose: () => {
                                 this.getMenu()
                               }
                            });

                          this.getQuery()
                             this.dialogFormVisible = false;
                        }else{
                            if(message) this.$message.error(message)
                        }
                    }).catch(err => {
                    this.$message.error(err.data.message)
                  })
                }
          })
        },
        closeForm(){
	      	this.$refs['roleForm'].resetFields() //清除验证
	      	this.dialogFormVisible = false
	      },
        chooseSingle(index,row){
            this.currRoleData = row;
            _.extend(this.roleJson,_.pick(row,'role','name','modules','depict','id'));
        },
        resetForm(formName,tag) {
            if(tag) {
                this.$refs[formName].resetFields()
                this.date = '';
            }else{
                this.$refs.tree.setCheckedKeys([])   //清空勾选节点
                let comboinJson = this.isUpdate === '13900001' ? {role:'',name:'',modules:'',depict:''} : {name:'',modules:'',depict:''}
                _.extend(this.roleJson,comboinJson)
            }

        },
      resetQuery (form) {
        this.date = '';
        for (let item in form) {
          form[item] = ""
        }
      },
      deleteRole () {
        let that = this
        if (!/\d+/.test(this.radio)) {
          that.$message.warning("请选择一位角色");
          return false;
        }
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.$axios.post(api + "/ngcos/collectionSysRole/drole", {
            "role": that.currRoleData.role
          }).then(function (res) {
            let { code, message } = res.data
            if (code == "200") {
              that.$message.success(message);
              that.getQuery()
              that.radio = ""
            } else {
              that.$message.error(message);
            }
          }).catch(function (err) {
            that.$message.error(err.data.message);
          })
        }).catch();

      },
      getMenu () {
        let that = this
        that.$axios.get(api+"/ngcos/collectionSysMenu/menuListu").then(function (res) {
          let result = res.data
          if (result.code == "200") {
            localStorage.setItem("menuTree", JSON.stringify(result.data.list))
            location.reload(true);// 强制拉取服务器接口
          }
        }).catch()
      }
    }
};
</script>
