<style lang="less" scoped>
  .login-container {
    margin-top: 10%;

  .login-box {
    margin-top: 70px;
    border-radius: 5px;
    width: 360px;
    padding: 65px 35px 15px 35px;
    background: #fff;
    position: relative;

  .title {
    margin: 10px 0 20px;
    text-align: center;
    color: #505458;
  }
	.el-form-item{
		margin-bottom: 16px;
	}
  .login-icon {
    width: 120px;
    height: 120px;
    border: 5px solid #93defe;
    border-radius: 100px;
    background: #fff;
    text-align: center;
    line-height: 110px;
    position: absolute;
    top: -65px;
    right: 120px;

  img {
    width: 60px
  }

  }
  }
  }
</style>
<template>
  <el-row class="login-container">
    <el-col :span="9" :offset="4">
      <div class="login-bg">
        <img src="@/assets/image/login_bg.png" alt="">
      </div>
    </el-col>
    <el-col :span="8">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon label-width="0px" class="login-box">
        <h3 class="title">催收系统登录</h3>
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" placeholder="账号" @keyup.enter.native="submit"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="密码"
                    @keyup.enter.native="submit"></el-input>
        </el-form-item>
        <el-form-item prop="verificationCode" v-if="showImgCaptcha">
          <el-row>
            <el-col :span="13">
              <el-input type="text" v-model="ruleForm.verificationCode" placeholder="图形验证码"></el-input>
            </el-col>
            <el-col :span="10" :offset="1" class="pointer">
              <img :src="captchaSrc" @click="getCaptcha" style="width:100%" alt="">
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="mobile"  v-if="showImgCaptcha">
          <el-input type="text" v-model="ruleForm.mobile" placeholder="手机号" @keyup.enter.native="getSmsCaptcha"></el-input>
        </el-form-item>
        <el-form-item prop="smsCode" v-if="showCodeCaptcha">
          <el-row>
            <el-col :span="13">
              <el-input type="text" v-model="ruleForm.smsCode" placeholder="短信验证码"
                        @keyup.enter.native="submit"></el-input>
            </el-col>
            <el-col :span="10" :offset="1" class="pointer">
              <el-button type="primary" @click="getSmsCaptcha" v-if="!disabledSms">获取验证码</el-button>
              <el-button disabled v-else>{{timeNumSms}}s 后重发</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="submit('ruleForm')">登录</el-button>
        </el-form-item>
        <div class="login-icon">
          <img src="@/assets/image/login_icon.png" alt="">
        </div>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  //import routes from '../../routesAll.js'
  //import { filterRouter } from '../../assets/js/utils.js'

  export default {
    data() {
      return {
        ruleForm: {
          username: '',
          password: '',
          grant_type: 'password',
          scope: 'all',
          verificationCode: '',
          mobile: '',
          smsCode: ''
        },
        sendSmsParams: {
          phone: '',
          sourceOsType: '30500005',
          verificationCode: ''
        },
        rules: {
          username: [
            {required: true, validator: this.checkLoginName, trigger: 'blur'}
          ],
          password: [
            {required: true, validator: this.checkLoginPwd, trigger: 'blur'}
          ],
          verificationCode: [
            {required: true, message: '请输入图形验证码', trigger: 'blur'}
//          {type: 'string', min: 4, max: 4, message: '请输入4位图形验证码', trigger: 'blur'}
          ],
          mobile: [
            {required: true,validator: this.checkMobile, trigger: 'blur'}
          ],
          smsCode: [
            {required: true, message: '请输入短信验证码', trigger: 'blur'}
//          {type: 'string', min: 6, max: 6, message: '请输入6位短信验证码', trigger: 'blur'}
          ]
        },
        showImgCaptcha: false,
        showCodeCaptcha: false,
        captchaSrc: '',
        disabledSms: false, //禁用短信验证码
        smsTimer: null, //短信验证码定时器
        timeNumSms: 60 //短信验证码倒计时
      };
    },
    mounted () {
      document.querySelector('body').style.background = '#93defe'
      this.getCaptcha()
    },
    beforeDestroy(){
      document.querySelector('body').style.background = '#fff'
    },
    methods: {
      checkLoginName(rule, value, callback){
        let reg = /^\w{8,10}$/
        if (value === "") {
          callback(new Error("请输入帐号"))
//      } else if(!reg.test(value)){
//      	callback(new Error("输入的帐号格式有误"))
        }else {
          callback()
        }
      },
      checkLoginPwd(rule, value, callback){
        let reg = /^\w{6,10}$/

        if (value === "") {
          callback(new Error("请输入密码"))
        } else {
          this.$refs.ruleForm.validateField('username', vaild => {
            if (!vaild) {
              this.showImgCaptcha = true
              this.showCodeCaptcha = true
            }
          })
          callback()
        }
      },
      checkMobile(rule, value, callback){
        let reg = /^1[3456789]\d{9}$/

        if (value === "") {
          callback(new Error("请输入手机号"))
        } else if(!reg.test(value)){
        	callback(new Error("输入的手机号格式有误"))
        } else {
          callback()
        }
      },
      getCaptcha(){
        this.captchaSrc = api+`/ngcos/public/captcha?ts=${new Date().getTime()}`
      },
      getSmsCaptcha(){
        this.$refs.ruleForm.validateField('verificationCode', vaild => {
          if (!vaild) {
            this.$axios.get(api+`/ngcos/public/sendCode?username=${this.ruleForm.username}&mobile=${this.ruleForm.mobile}`,
              {},{withCredentials : true}).then(res => {
              if (res.data.code == '200') {
                this.$message({type: "success", message: "验证码已发送，请注意查收"})
                this.sendSmsCode();
              } else {
                this.$message.error(res.data.message)
                this.getCaptcha()
              }
            })
          }
        })
      },
      sendSmsCode() {
        let that = this;

        that.disabledSms = true;

        that.smsTimer = window.setInterval(function () {
          if (that.timeNumSms-- <= 1) {
            window.clearInterval(that.smsTimer);
            that.timeNumSms = 60;
            that.disabledSms = false;
          }
        }, 1000);
      },
      submit(formName) {
        let that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            that.$axios({
	            method: 'post',
	            url: api+'/ngcos/oauth/token',
	            params: that.ruleForm,
	            auth: {
	              username: 'client',
	              password: 'secret'
	            }
	          }).then(function (res) {
	            let result = res.data
	            localStorage.setItem("token", `${result.token_type} ${result.access_token}`)
	            that.getMenu(`${result.token_type} ${result.access_token}`)
	          }).catch(function (err) {
	            that.$message.error(err.data.error_description)
	          })
          } else {
            return false;
          }
        })
      },
      getMenu (token) {
        let that = this
        that.$axios.get(api+"/ngcos/collectionSysMenu/menuListu", {
          headers: {
            Authorization: token
          }
        }).then(function (res) {
          let result = res.data
          if (result.code == "200") {
            localStorage.setItem("menuTree", JSON.stringify(result.data.list))
            that.$router.push('/main')
          }
        }).catch()
      }
    }
  };
</script>
