<template>
  <transition name="fade" mode="out-in">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>
<style lang="less">
  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    /*margin-left: 300px;*/
  }
</style>

