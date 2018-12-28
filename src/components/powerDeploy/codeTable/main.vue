<style lang="less">

</style>
<template>
  <div>
    <el-row>
      <el-form :inline="true" :model="paramJson" class="" label-width="80px" size="small">
        <el-col :span="8">
          <el-form-item label="用户组">
            <el-select v-model="paramJson.userGroup" placeholder="请选择">
              <el-option label="全部" value="1"></el-option>
              <el-option label="IT部" value="2"></el-option>
              <el-option label="审批部" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编号">
            <el-input v-model="paramJson.userGroupId" placeholder="用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态">
            <el-select v-model="paramJson.userState" placeholder="请选择">
              <el-option label="全部" value="1"></el-option>
              <el-option label="启用" value="2"></el-option>
              <el-option label="禁用" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row class="m15">
      <el-button type="primary" @click="">新增</el-button>
      <el-button @click="">编辑</el-button>
      <el-button @click="">用户管理</el-button>
      <el-button class="mr70" @click="">删除</el-button>
      <el-button type="primary" @click="">查询</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data () {
      return {
        paramJson: {
          "userId":"admin",//用户名
          "name":"管理员",//用户姓名
          "email":"1@9ffenqigo.com",//email
          "phonenumber":"13144659898",//电话号码
          "departmentId": "",
          "jobId": "",
          "rowAddTimeBegin":"2018-09-03",//创建时间begin
          "rowAddTimeEnd":"2018-09-03"//创建时间End
        }
      }
    }
  }
</script>
