<style lang="less">

</style>
<template>
  <div class="caiwuPage">
    <iframe :src="contentUrl" :height="iframeHei" frameborder="0" width="100%"></iframe>
  </div>
</template>
<script>
    export default {
      name: 'app',
      data () {
        return {
          contentUrl: public_URL,
          iframeHei: ""
        }
      },
      created () {
        let windowHei = document.documentElement.clientHeight
        this.iframeHei = windowHei - 140 + 'px'
      }
    }
</script>
