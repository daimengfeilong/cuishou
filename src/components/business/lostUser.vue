<style lang="less">

</style>
<template>
  <div>
    <el-form :inline="true" :model="formJson" :rules="rules" ref="formJson" class="demo-form-inline">
      <el-form-item label="加密身份证号:" prop="cerNum">
        <el-input size="small" v-model="formJson.cerNum" clearable placeholder="身份证号"></el-input>
      </el-form-item>
      <el-form-item class="ml10">
        <el-button size="small" type="primary" @click="dial">拨打</el-button>
        <el-button size="small" type="primary" @click="queryResult">查询第三方返回的拨打结果</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data () {
      var checkIdCard = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入身份证号'));
        } else if (!/^(\d{15}$)|(^\d{17}([0-9]|X))$/.test(value)) {
          return callback(new Error("请输入正确的身份证号"));
        } else {
          callback()
        }
      }
      return {
        formJson: {
          cerNum: ""
        },
        rules: {
          cerNum: [
            { validator: checkIdCard, required: true, trigger: 'blur' }
          ]
        },
        queryResultJson: {
          "cerNum": "",
          "requestNo": ""
        }
      }
    },
    methods: {
      dial () {
        let that = this
        that.$refs['formJson'].validate(function (valid) {
          if (valid) {
            that.$axios.post(api + "/ngcos/ovdu/elevenBei/call", that.formJson).then(function (res) {
              let result = res.data, { code, msg } = result
              if (code == "0000") {
                that.queryResultJson.requestNo = result.requestNo
                that.$message.success(msg)
              } else {
                that.$message.warning(msg)
              }
            }).catch()
          } else {
            return false;
          }
        })
      },
      queryResult () {
        let that = this
        that.queryResultJson.cerNum = that.formJson.cerNum
        that.$axios.post(api + "/ovdu/elevenBei/getCallResult", that.queryResultJson).then(function (res) {
          let result = res.data, { code, msg } = result
          if (code == "0000") {
            that.$message.success(msg)
          } else {
            that.$message.warning(msg)
          }
        }).catch()
      }
    }
  }
</script>
