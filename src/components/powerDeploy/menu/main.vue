<style lang="less">
</style>

<template>
    <div id="content" class="userList">
        <el-form :inline="true" :model="query.params" ref="ruleForm">
              <el-form-item label="菜单名称" prop="name">
                <el-input placeholder="请输入菜单名称" v-model="query.params.name"></el-input>
            </el-form-item>
             <el-form-item label="菜单类型" prop="type">
                 <el-select v-model="query.params.type" placeholder="请选择菜单类型" @change="choosetype">
                        <el-option
                        v-for="item in menuOptions"
                        :key="item.type"
                        :label="item.menuTypeName"
                        :value="item.type">
                        </el-option>
                    </el-select>
            </el-form-item>
             <el-form-item label="启用状态" prop="state">
                 <el-select v-model="query.params.state" placeholder="请选择启用状态" @change="chooseStat">
                      <el-option
                      v-for="item in statOptions"
                      :key="item.state"
                      :label="item.menuStateName"
                      :value="item.state">
                      </el-option>
                  </el-select>
            </el-form-item>
             <el-form-item>
              <el-button type="primary" @click.native="getQuery(1)">查询</el-button>
              <el-button type="primary" @click.native="resetForm('ruleForm',true)">重置</el-button>
            </el-form-item>
        </el-form>
        <el-col>
            <el-button type="primary" @click.native="edit(false)">新建</el-button>
            <el-button type="primary" @click.native="edit(true)">编辑</el-button>
             <el-button type="danger" @click.native="delMenus">删除</el-button>
        </el-col>
        <el-table :data="tableData" >
        	<el-table-column label="序号" type="index" width="50"></el-table-column>
            <el-table-column label="" width="55" >
                 <template slot-scope="scope">
                    <el-radio :label="scope.$index" v-model="radio" @change.native="chooseSingle(scope.$index,scope.row)">01</el-radio>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="菜单名称"></el-table-column>
            <el-table-column align="center" prop="type" label="菜单类型" :formatter="formatType"></el-table-column>
            <el-table-column align="center" prop="sort" label="顺序"></el-table-column>
            <el-table-column align="center" prop="parentName" label="父级菜单"></el-table-column>
            <el-table-column align="center" prop="state" label="状态" :formatter="formatStat"></el-table-column>
            <el-table-column align="center" prop="remark" label="备注"></el-table-column>
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
               <el-form :model="menuJson" ref="menuForm" :rules="menuRoles" label-width="100px">
                 <el-col :span="12">
                    <el-form-item label="菜单名称" prop="name">
                        <el-input v-model="menuJson.name"  placeholder="请输入菜单名称"></el-input>
                    </el-form-item>
                </el-col>
				        <el-col :span="12">
                    <el-form-item label="菜单类型" prop="type" style="width: 100%;">
                         <el-select v-model="menuJson.type" placeholder="请选择菜单类型" >
                            <el-option
                            v-for="item in menuOptions"
                            :key="item.type"
                            :label="item.menuTypeName"
                            :value="item.type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="父级菜单" prop="parentId" style="width: 100%;">
                     <el-select v-model="menuJson.parentId" placeholder="请选择父级菜单">
                            <el-option
                            v-for="item in parentMenus"
                            :key="item.parentId"
                            :label="item.parentName"
                            :value="item.parentId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="菜单顺序" prop="sort">
                        <el-input v-model.number="menuJson.sort"  placeholder="请输入菜单顺序"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="12">
                  <el-form-item label="菜单路径" prop="url">
                    <el-input v-model="menuJson.url"  placeholder="请输入菜单路径" ></el-input>
                    </el-form-item>
                 </el-col>
                <el-col :span="12">
                    <el-form-item label="菜单图标" prop="icon">
                        <el-input v-model="menuJson.icon"  placeholder="请输入菜单图标"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否启用" prop="state" style="width: 100%;">
                    <el-select v-model="menuJson.state" placeholder="请选择启用状态">
                      <el-option
                      v-for="item in statOptions"
                      :key="item.state"
                      :label="item.menuStateName"
                      :value="item.state">
                      </el-option>
                  </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注" prop="icon">
                      <el-input v-model="menuJson.remark" type="area" placeholder="请输入备注" clearable></el-input>
                    </el-form-item>
                 </el-col>
                 <div class="clearFloat"></div>
            </el-form>
            <div slot="footer" class="dialog-footer text-center">
                <el-button type="primary" @click.native="confirmSave(true)" v-if="isUpdate">保存</el-button>
                <el-button type="primary" @click.native="confirmSave(false)" v-else>确定创建</el-button>
                <el-button type="warning" @click.native="resetForm('roleForm',false)">重置</el-button>
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
                    menuId:'', // 菜单id
                    name:'', // 菜单名称
                    type:'', // 菜单类型
                    state:'' //  启用状态
                },
                pageNo: 1,
                pageSize: 10
            },
            listData:{},
            tableData: [],
            date:'',
            operateTitle:'',
            dialogFormVisible:false,
            menuJson:{
                menuId:'', // 菜单id
                name:'', // 菜单名称
                type:'', // 菜单类型
                parentId:'', // 父级菜单id
                sort:'', // 顺序
                url:"", // 菜单路径
                icon:"", // 图标
                state:""// 是否启用
            },
            menuRoles: {
                name: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' },
                ],
                url: [
                    {required: true, message: '请输入菜单路径', trigger: 'blur'},
                ],
                state: [
                    {required: true, message: '请选择是否启用', trigger: 'change'},
                ],
                type: [
                    {required: true, message: '请选择菜单状态', trigger: 'change'},
                ],
                parentId: [
                  {required: true, message: '请选择父级菜单', trigger: 'change'},
                ],
                sort: [
                  { required: true, type: 'number', message: '菜单顺序必须为数字值', trigger: 'blur'}
                ]
            },
            menuOptions:[], // 保存菜单类型的列表
            statOptions:[], // 菜单启用状态的列表
            parentMenus:[], // 父级目录的列表
            currMenuData:{}, // 选中的当前菜单的数据对象
            radio:"",
            isUpdate:null,
            menuIds:"" // 菜单id
        };
    },
    mounted() {
        this.getQuery() // 获取菜单列表
        this.getType() // 获取菜单类型
        this.getStats() // 获取菜单启用状态
        this.getParentMenus() // 获取父级菜单下拉列表
    },
    methods: {
        getQuery(val){
            if(val) this.query.pageNo = val;
            this.$axios
                .post(`${api}/ngcos/collectionSysMenu/menusList`,this.query)
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
        getStats(){
          this.$axios.get(`${api}/ngcos/collectionSysMenu/getAllMenuState`)
          .then(res => {
            let {code,message,data} = res.data;
            if(code === '200'){
            this.statOptions = data.list;
            }else{
              if(message) this.$message.error(message)
            }
          })
        },
        getType(){
          this.$axios.get(`${api}/ngcos/collectionSysMenu/getAllMenuType`)
          .then(res => {
            let {code,message,data} = res.data;
            if(code === '200'){
                this.menuOptions = data.list;
            }else{
              if(message) this.$message.error(message)
            }
          })
        },
        getParentMenus(){
          this.$axios.get(`${api}/ngcos/collectionSysMenu/getParentMenu`)
          .then(res => {
            let {code,message,data} = res.data;
            if(code === '200'){
                this.parentMenus = data.list;
            }else{
              if(message) this.$message.error(message)
            }
          })
        },
        formatType(...list){
          let filterValue = list.length > 1 ? list[2] : list[0]
          return this.filterData('menuOptions',filterValue.toString(),'type','menuTypeName')
        },
        formatStat(...list){
           let filterValue = list.length > 1 ? list[2] : list[0]
          return  this.filterData('statOptions',filterValue.toString(),'state','menuStateName')
        },

        filterData(optionName,value,matchName,resultName){
            return _.findWhere(this[optionName],{[matchName]:value}) &&  _.findWhere(this[optionName],{[matchName]:value})[resultName]
        },
        handleSizeChange: function (val) {
            this.query.pageSize = val
            this.getQuery()
        },
        handleCurrentChange: function (val) {
            this.query.pageNo = val
            this.getQuery()
        },
        // 编辑
        edit(tag){
            // @param {Boolean} tag true => 编辑 false => 新增
             this.operateTitle = tag ? '编辑菜单' : '新增菜单'
            if(!tag) {
                this.menuJson = {
                    menuId:'', // 菜单id
                    name:'', // 菜单名称
                    type:'', // 菜单类型
                    parentId:'', // 父级菜单名称
                    sort:'', // 名称
                    url:"", // 菜单路径
                    icon:"", // 图标
                    state:""// 是否启用
                }// 添加的时候将绑定对象初始化
                this.dialogFormVisible = true;
            }else if(/\d+/.test(this.radio)) {
                this.dialogFormVisible = true;
            }else {
                this.$message({
                    type: 'warning',
                    message: '请先选中某个菜单'
                });
            }
            this.getParentMenus() // 重新刷新父级菜单
            this.isUpdate = tag;
        },
        confirmSave(tag){
            // @params {Boolean} 保存还是新增; true => 保存 false => 新增
              let that = this, req_url = tag ? '/ngcos/collectionSysMenu/updateMenu' : '/ngcos/collectionSysMenu/insertMenu'

             this.$refs.menuForm.validate(valid => {
                if(valid) {
                     this.$axios.post(`${api}${req_url}`,this.menuJson)
                    .then(res => {
                        let {message,code} = res.data,info = tag ? '保存菜单成功' : '新增菜单成功'
                        if(code === '200') {
                          this.$message({
                            type: 'success',
                            message: info
                          });
                          this.dialogFormVisible = false;
                          this.getQuery()
                        }else{
                            if(message) this.$message.error(message)
                        }
                    })
                }
          })
        },
        closeForm(){
	      	this.$refs['menuForm'].resetFields() //清除验证
	      	this.dialogFormVisible = false
	      },
        choosetype(val){
          this.query.params.type = val;
          this.getQuery(1);
        },
        chooseStat(val){
          this.query.params.state = val;
          this.getQuery(1);
        },
        delMenus(){
          if(!/\d+/.test(this.radio)) {
               this.$message({
                type: 'warning',
                message: '请先选中某个菜单'
            });
            return false;
          }
           this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                 this.$axios.post(`${api}/ngcos/collectionSysMenu/deleteMenus`,{"menuIds": [this.currMenuData.id]})
                  .then(res => {
                        let {message,code} = res.data;
                        if(code === '200'){
                            this.tableData.splice(this.currMenuData.$index,1)
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.radio = ''
                        }else{
                            if(message) this.$message.error(message)
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
        chooseSingle(index,row){
            this.currMenuData = _.extend(row,{$index:index});
            _.extend(this.menuJson,_.pick(row,'menuId','name','parentId','sort','url','icon','id'));
            this.menuJson.type = row.type.toString();
            this.menuJson.state = row.state.toString();
        },
        resetForm(formName,tag) {
            if(tag) {
                this.$refs[formName].resetFields()
            }else{
              let comboinJson =  {
                    menuId:'', // 菜单id
                    name:'', // 菜单名称
                    type:'', // 菜单类型
                    parentId:'', // 父级菜单名称
                    sort:'', // 名称
                    url:"", // 菜单路径
                    icon:"", // 图标
                    state:""// 是否启用
                }
                _.extend(this.menuJson,comboinJson)
            }

        }
    }
};
</script>
