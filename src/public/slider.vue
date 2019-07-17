<template>
  <div class="slider">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      router
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      :collapse="isCollapse"
    >
      <el-submenu :index="myIndex+''" v-for="(items,myIndex) in SliderMenu" :key="items.title">
        <template slot="title">
          <i :class="items.icon"></i>
          <span>{{items.title}}</span>
        </template>
        <el-menu-item
          :index="item.path"
          v-for="item in items.children"
          :key="item.path"
        >{{item.title}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Bus from "./bus";
import SliderMenu from "../config/sliderMenu.js";
export default {
  data() {
    return {
      isCollapse: false,
      SliderMenu: SliderMenu
    };
  },
  components: {},
  computed: {
    onRoutes() {
      return this.$route.meta.name;
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
.slider {
  width: 100%;
  .el-menu {
    width: 100%;
    .el-submenu {
      text-align: left;
      padding-left: 0 !important;
      .el-menu-item {
        text-align: left;
        padding-left: 20px;
      }
    }
  }
}
</style>
