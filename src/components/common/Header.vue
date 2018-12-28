<style lang="less">

</style>

<template>
    <header id="header">
        <el-row>
            <el-col :span="3">
                <div class="logo">贷后管理系统</div>
            </el-col>
            <el-col :span="3" :offset="18" style="text-align: right;padding-right: 20px;">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner"><img src="../../assets/image/user.png" />{{userData.name}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </header>
</template>

<script>
export default {
    data () {
        return {
			userData: {}
        }
    },
    mounted () {
		this.getUserInfo()
    },
    methods: {
    	getUserInfo(){
    		let that = this
            that.$axios.get(api+"/ngcos/collectionUser/public/user")
    		.then(function(response){
    			if(response.data.code === "200") {
    				that.userData = response.data.data
            localStorage.userId = response.data.data.userId
    			}else{
    				if(response.data.message){
    					that.$vux.toast.text(response.data.message)
    				}
    			}
    		})
    		.catch(function(response){

    		})
    	},
        logout(){
          localStorage.clear();
        	this.$router.push('/login')
        }
    }
}
</script>
