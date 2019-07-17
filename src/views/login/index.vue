<template>
  <div class="login-page">
    <div class="login">
      <h3>叩丁狼管理系统</h3>

      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="account">
          <el-input v-model="loginForm.account" placeholder="账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="密码"
            @keydown.native.13="submit()"
          />
        </el-form-item>
      </el-form>
      <el-button
        class="login-submit-btn"
        type="primary"
        @click="submitForm()"
        style="{width:100%}"
      >登录</el-button>
    </div>
  </div>
</template>

<script>
import {loginApi} from '@/request/api'	// 调用loginApi方法


export default {
  data() {
    return {
      loginForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        password: {
          required: true,
          message: "密码不能为空",
          trigger: "blur"
        }
      }
    };
  },
  components: {},
  methods: {
    submitForm() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          loginApi({
            username: this.loginForm.account,
            password: this.loginForm.password
          })
            .then(res => {
              console.log(res);
              if(res.success == true){
                localStorage.setItem('token',res.data);
                localStorage.setItem('username',this.loginForm.account);
                this.$router.push('/');


              }
            })
            .catch(res => {
              console.log(error);
            });
        } else {
          //this.$message.error("错了哦，这是一条错误消息");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-color: #324057;
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    width: 330px;
    height: 210px;

    h3 {
      padding: 10px 0;
      color: #fff;
      font-size: 24px;
      text-align: center;
    }

    .login-submit-btn {
      width: 100%;
    }
  }
}
</style>
