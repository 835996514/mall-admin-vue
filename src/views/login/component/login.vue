<template>
    <div class="wrapper">
      <div class="login-container">
        <img src="@/assets/images/liao.jpg" />
        <div class="login-info">
          <el-input
            placeholder="用户名"
            prefix-icon="el-icon-user"
            v-model="loginUser.username"
          ></el-input>
          <el-input
            placeholder="密码"
            prefix-icon="el-icon-lock"
            show-password
            v-model="loginUser.password"
          ></el-input>
        </div>
        <div class="tip">
          <el-checkbox v-model="checked">记住密码?</el-checkbox>
          <span class="register" @click="goRegistry()">注册</span>
        </div>
        <!-- <Transition name="show" :duration="{enter: 500, leave: 800}" @enter="show" @leave="show"> -->
        <el-button
          round
          type="info"
          @mouseenter.native="show=true"
          @mouseleave.native="show=false"
          :class="show?'show-enter-active':'show-leave-active'"
          @click="logon()"
        >登录</el-button>
        <!-- </Transition> -->
      </div>
    </div>
</template>

<script>
import {encrypt,decrypt} from '@/utils/crypto'

export default {
  name: "login",
  data() {
    return {
      loginUser: {
        username: "",
        password: "",
      },
      checked: false,
      show: false,
    };
  },
  mounted(){
    let userInfo = localStorage.getItem('userInfo')
    if(userInfo){
      //解密
      let plainText = decrypt(userInfo)
      if(plainText){
        const user = JSON.parse(plainText) 
        this.loginUser = user
      }
    }
  },
  methods: {
    goRegistry(){
      this.$emit('select','register')
    },
    logon(){
      this.$store.dispatch('Login',this.loginUser).then(() => {
          this.$message({
            type: 'success',
            message: '登录成功！'
          })
          if(this.checked){
            localStorage.setItem('userInfo',encrypt(this.loginUser))
          }else{
            if(localStorage.getItem('userInfo')){
              localStorage.removeItem('userInfo')
            }
          }
          this.$router.push('/')
      }).catch((err)=>{
        console.log('login failed {}',err)
      })
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>

  .wrapper {
    height: 100%;
    overflow-y: auto;

    .login-container {
      width: 380px;
      height: 500px;
      border-radius: 10px;
      background-color: #1e3a49;
      opacity: 0.8;
      margin: 0 auto;
      margin-top: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;

      & > img {
        width: 80px;
        border-radius: 50%;
        opacity: 0.8;
        margin-top: 20px;
      }

      .login-info {
        padding: 40px 40px 10px 40px;

        .el-input {
          margin-top: 10px;
        }
      }

      .tip {
        width: 75%;
        display: flex;
        font-weight: bold;
        align-items: center;
        justify-content: space-between;
        .register {
          color: #606266;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
            color: #409eff;
          }
        }
      }
      .el-button {
        width: 200px;
        margin-top: 50px;
        // transition: all 5s ease-out;
        background: linear-gradient(to right, #409eff,#009FCC,#CCDDFF,#666666,#88AA00,#33ffaa);
        background-size: 200% 100%;
      }
    }
  }
.show-enter-active {
  animation: bgscroll 15s linear infinite;
}
.show-leave-active {
  animation: bgscroll 15s linear reverse infinite;
}

@keyframes bgscroll {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>