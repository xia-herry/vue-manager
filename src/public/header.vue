<template>
  <div>
    <div class="topbar">
      <div class="left">
        <h1>叩丁狼客户管理系统<i class="el-icon-menu" @click="changeCollapse()"></i></h1>
      </div>
      <div class="right">
        <el-dropdown trigger="click" placement="top" @command="handleCommand">
          <span class="el-dropdown-link">
            admin
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='login'>退出登录</el-dropdown-item>    
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from './bus'
import {logoutApi} from '../request/api'

export default {
  data() {
    return {
       collapse: false,
     
    };
  },
  components: {},
  
  methods:{
     changeCollapse() {
      this.collapse = !this.collapse;
      Bus.$emit("collapse", this.collapse);
    },

    handleCommand(){
      console.log(123)
      logoutApi({
        token:localStorage.getItem('token')
      }).then(res=>{
        if(res.success == true){
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          this.$router.push('/login');
        }
      })

    }


  }
};
</script>

<style lang="less" scoped>
.topbar{
    display: flex;
    justify-content: space-between;
    height: 70px;
    line-height: 70px !important;
    background: #429CFF;
    padding: 0 20px;
   
    .left{
        color: #fff;
    }
    .right{
         color: #fff;
    }

}
</style>
