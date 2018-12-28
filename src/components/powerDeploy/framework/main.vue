<style lang="less">

</style>
<template>
  <div>
    <el-row>
      <el-form :inline="true" :model="paramJson" class="" label-width="80px" size="small">
        <el-col :span="6">
          <el-form-item label="菜单名称">
            <el-input v-model="paramJson.menuName" placeholder="菜单名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="菜单类型">
            <el-select v-model="paramJson.menuType" placeholder="请选择">
              <el-option label="全部" value="1"></el-option>
              <el-option label="目录" value="2"></el-option>
              <el-option label="页面" value="3"></el-option>
              <el-option label="功能" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select v-model="paramJson.menuState" placeholder="请选择">
              <el-option label="全部" value="1"></el-option>
              <el-option label="启用" value="2"></el-option>
              <el-option label="禁用" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="submitQuery()">查询</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data () {
      return {
        paramJson: {
          "menuName": "",
          "menuType": "",
          "menuState": ""
        }
      }
    },
    methods: {
      submitQuery () {

      }
    }
  }
</script>
