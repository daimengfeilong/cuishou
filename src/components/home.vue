
<style lang="less">
.fade-enter-active,
.fade-leave-active {
    transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>
<template>
    <section>
        <app-header></app-header>
        <section id="container">
            <main id="main">
              <app-menu></app-menu>
                <transition name="fade" mode="out-in">
                  <div>
                    <sub-nav></sub-nav>
                    <keep-alive>
                       <router-view></router-view>
                    </keep-alive>
                  </div>
                </transition>
            </main>
        </section>
    </section>
</template>

<script>
import appHeader from './common/Header'
import appMenu from './common/Menu'
import subNav from './common/nav'
export default {
    components:{
        appHeader,
        appMenu,
        subNav
    },
    data() {
        return {};
    },
    created() {
    },
    methods: {}
};
</script>
