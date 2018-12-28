<template>
  <el-row>
    <el-col :span="24">
      <el-button v-for="(item,index) in btnList" :key="index" type="primary" :plain="index!=currentBtn" item.active size="small"  @click="goUrl(item.urlName)">{{item.btnTitle}}</el-button>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data () {
      return {
          btnList:[
            {btnTitle:"待录入贷款",urlName:"rateList"},
            {btnTitle:"历史减免查询",urlName:"historyList"}
          ]
      }
    },
    props:{currentBtn: {default: 0}},
    mounted () { },
    methods: {
      goUrl(urlName){
          let that=this
          that.$router.push({name:urlName})
      }
    }
  }
</script>
