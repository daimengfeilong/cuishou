<style lang="less">

</style>
<template>
  <div class="annexInfo">
    <div class="annexInfo-cnt">
      <p class="annexInfo-tit">附件信息 <i class="el-icon-error pull-right" @click="closeThis"></i></p>
      <div class="photoList mt40">
        <p class="photoList-tit">1. 身份证正反面照片</p>
        <div class="photoList-cnt" v-if="imgData.idcardFront">
          <div>
            <img :src="imgData.idcardFront" alt="">
            <p>
              <span>正面</span>
              <a :href="imgData.idcardFront" download="">下载</a>
            </p>
          </div>
          <div>
            <img :src="imgData.idcardCon" alt="">
            <p>
              <span>反面</span>
              <a :href="imgData.idcardCon" download="">下载</a>
            </p>
          </div>
        </div>
      </div>
      <div class="photoList mt20">
        <p class="photoList-tit">2. 储蓄卡正反面照片</p>
        <div class="photoList-cnt" v-if="imgData.bankcardFront">
          <div>
            <img :src="imgData.bankcardFront" alt="">
            <p>
              <span>正面</span>
              <a :href="imgData.bankcardFront" download="">下载</a>
            </p>
          </div>
          <div>
            <img :src="imgData.bankcardCon" alt="">
            <p>
              <span>反面</span>
              <a :href="imgData.bankcardCon" download="">下载</a>
            </p>
          </div>
        </div>
      </div>
      <div class="photoList mt20">
        <p class="photoList-tit">3. 人脸识别照片</p>
        <div class="photoList-cnt" v-if="imgData.faceRecognition">
          <div>
            <img :src="imgData.faceRecognition" alt="">
            <p>
              <a :href="imgData.faceRecognition" download="">下载</a>
            </p>
          </div>
          <div>
            <!--<img src="../../assets/image/login_bg.png" alt="">-->
            <!--<p>-->
              <!--<a href="../../assets/image/login_bg.png" download="">下载</a>-->
            <!--</p>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'app',
    props: ["loanNo"],
    data () {
      return {
        paramJson: {
          loanNo: ""
        },
        imgData: {
//          "idcardFront": "",//身份证正面
//          "idcardCon": "",//身份证反面
//          "bankcardFront": "",//银行卡正面
//          "bankcardCon": "",//银行卡反面
//          "faceRecognition": ""//人脸识别
        }
      }
    },
    created () {
      const that = this
      that.paramJson.loanNo = that.loanNo
      that.getAnnexInfo()
    },
    methods: {
      getAnnexInfo () {
        let that = this, sendJson = {}
        sendJson.params = that.paramJson
        that.$axios.post(api+"/ngcos/collectionCaseQuery/queryCaseAttachment", sendJson).then(function (res) {
          let result = res.data
          if (result.code == "200") {
            that.imgData = result.data
          } else {
            that.$message(result.message);
          }
        }).catch()
      },
      closeThis () {
        this.$parent.handlingBtn.showAnnex = false
      }
    }
  }
</script>
