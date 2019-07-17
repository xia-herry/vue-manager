<template>
  <div>
    <el-container>
      <el-header>
        <my-header></my-header>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse==true? '60px':'270px'">
          <Myslider></Myslider>
        </el-aside>
        <el-main :class="{'miniBox':isCollapse}">
          <h3>{{routerTitle}}</h3>
          <div class="content" ><router-view></router-view></div>
          <footer>
            <p>
              Copyright &copy; 2016-2019
              <a
                href="http://www.wolfcode.cn/"
                target="_blank"
                style="color:#409eff;"
              >叩丁狼</a>.
              All rights reserved.
            </p>
            <p class="footer-version">
              <span class="fontWeight">Version</span> 1.0.0
            </p>
          </footer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MyHeader from "./header";
import Myslider from "./slider";
import Bus from "./bus";
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  components: { MyHeader, Myslider },
  computed:{
    routerTitle(){
      return this.$route.meta.title;
    }

  },

  created() {
    Bus.$on("collapse", msg => {
      this.isCollapse = msg;
    });
  }
};
</script>

<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 70px !important;
  height: 70px !important;
  padding: 0 !important;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
  // overflow-x: hidden;
  position: absolute;
  top: 70px;
  left: 0;
  bottom: 0;
   overflow-x: hidden;
   overflow-y: scroll;
}
/* 隐藏滚动条 */
.el-aside::-webkit-scrollbar {
  width: 0;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  position: absolute;
  padding-bottom: 0;
  left: 270px;
  top: 70px;
  width: calc(~"100% - 270px");
  height: calc(~"100% - 70px");
  transition: all .4s linear;
  &.miniBox{
    width: calc(~"100% - 60px");
    left:60px;
  }
  h3 {
    height: 40px;
    line-height: 40px;
  }
  .content {
    width: 100%;
    height: calc(~"100% - 70px");
    background: #fff;

  }
  footer {
    color: #333;
    text-align: center;
    height:30px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
  }
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
