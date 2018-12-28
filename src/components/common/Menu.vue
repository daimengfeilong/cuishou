<style lang="less">
</style>

<template>
  <aside id="menu">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu :default-active="defaultActive" @open="handleOpen" @close="handleClose" @select="handleSelect"
                 unique-opened router>
          <template v-for="(item,index1) in route">
            <el-submenu v-if="item.children.length>0" :index="index1+''" :key="index1">
              <template slot="title">
                <!--<i :class="item.meta.iconClass"></i>-->
                {{ item.name }}
              </template>
              <el-menu-item-group v-for="(child,index2) in item.children" :key="index2">
                <el-menu-item :index="child.url" :key="child.url">
                  {{ child.name }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item v-else="" :index="item.url" :key="item.url">
              <!--<i class="el-icon-menu"></i>-->
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </aside>
</template>

<script>
  export default {
    data() {
      return {
        defaultActive: "",
        route: JSON.parse(localStorage.getItem("menuTree"))
      };
    },
    watch:{
      $route(){
        this.setPath()
      }
    },
    mounted() {
      this.setPath()
    },
    methods: {
      setPath(){
        let path = this.$route.path.split('/')[1]
        this.defaultActive = this.$route.path
      },
      handleOpen(key, keyPath) {
//        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
//        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
//        console.log(key, keyPath);
      }
    }
  };
</script>
