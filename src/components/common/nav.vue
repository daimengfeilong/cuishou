<template>
    <div class="navContainer">
        <span class="mb5" v-for="(item,index) in navList">
        	<a href='javascript:void(0)' @click="goUrl(index)" :class="{ active: item.currentActive }">
            <i class="el-icon-caret-right"></i>{{item.label}}
          </a>
          <i class="el-icon-close" @click="removeNav(index)"></i>
        </span>
    </div>

</template>
<script>
    import store from '../../vuex/store.js'
    export default {
        data() {
          return {}
        },
        computed: {
          navList () {
            return store.state.navList
          }
        },
        methods: {
        	goUrl(index){
        		let that=this
        		that.$router.push({path:that.navList[index].url,query:that.navList[index].data});
        	},
          removeNav:function(index){
            if(this.navList.length<=1)
            {
                this.$message({message:"至少保留一条快速导航", type: 'warning'})
            }
            else
            {
                store.commit('removeNav',index)
            }

          }
        }
    }
</script>
