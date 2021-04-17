<template>
  <div class="container">
    <div class="header">图书管理系统</div>
    <transition name="el-zoom-in-center" mode="out-in">
    <div class="login" v-if="isLogin">
      <div class="login_header">
        <span class="text">登录</span>
      </div>
      <div class="login_form">
        <el-input class="login_input" v-model="loginData.Uname" placeholder="用户名" style="width: 60%"></el-input>
        <el-input class="login_input" v-model="loginData.Pwd" type="password" placeholder="密码" style="width: 60%"></el-input>
      </div>
      <div class="login_botton">
        <el-button class="login_button" type="primary" style="width: 60%" @click="handleLogin">登录</el-button>
        <div class="login_change" @click="changeLogin">还未注册?</div>
      </div>
    </div>
    </transition>
    <transition name="el-zoom-in-center" mode="out-in">
    <div class="register" v-if="!isLogin">
      <div class="register_header">
        <span class="text">注册</span>
      </div>
      <div class="register_form">
        <el-input class="register_input" v-model="registerData.Uname" placeholder="用户名" style="width: 60%"></el-input>
        <el-input class="register_input" v-model="registerData.Pwd" placeholder="密码" type="password" style="width: 60%"></el-input>
        <el-input class="register_input" v-model="registerData.RePwd" placeholder="重复密码" type="password" style="width: 60%"></el-input>
      </div>
      <div class="register_botton">
        <el-button class="register_button" type="primary" style="width: 60%" @click="handleRegister">注册</el-button>
        <div class="register_change" @click="changeLogin">已有账号?</div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { post } from '../utils/request'

const useLoginEffect = () => {
  const loginData = reactive({ Uname: '', Pwd: '' })
  const handleLogin = async () => {
    try {
      const result = await post('/user/login', loginData)
      if (result?.data !== null) {
        localStorage.Login = result.data
      } else {
        ElMessage.error('密码或用户名错误')
      }
    } catch (e) {
      ElMessage.error(e)
    }
  }
  return { loginData, handleLogin }
}

const useRegisterEffect = () => {
  const registerData = reactive({ Uname: '', Pwd: '', RePwd: '' })
  const handleRegister = async () => {
    if (!registerData.Uname.trim().length || !registerData.Pwd.trim().length) {
      ElMessage.error('用户名和密码不能为空!')
      return
    }
    if (registerData.Pwd !== registerData.RePwd) {
      ElMessage.error('两次输入的密码不一致')
      return
    }
    try {
      const result = await post('/user/register', {
        Uname: registerData.Uname,
        Pwd: registerData.Pwd
      })
      if (result?.code === 200) {
        ElMessage.success('注册成功')
      } else {
        ElMessage.error('注册失败')
      }
    } catch (e) {
      ElMessage.error(e)
    }
  }
  return { registerData, handleRegister }
}

export default {
  name: 'Login',
  setup () {
    onMounted(() => {
      document.body.style.backgroundColor = '#409EFF'
    })
    const { loginData, handleLogin } = useLoginEffect()
    const { registerData, handleRegister } = useRegisterEffect()
    const isLogin = ref(true)
    const changeLogin = () => { isLogin.value = !isLogin.value }
    return { isLogin, changeLogin, loginData, handleLogin, registerData, handleRegister }
  }
}

</script>

<style lang="scss" scoped>
  .container {
    position: absolute;
    height: 60%;
    width: 40%;
    margin: 0 auto;
    top: 50%;
    right: 0;
    left: 0;
    transform: translateY(-50%);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    background-color: #fff;
  }

  .header {
    margin: 60px;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .login , .register {
    position: absolute;
    margin: 0 80px;
    width: 80%;
    height: 80%;

    &_header {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 16px;
    }

    &_input {
      margin: 16px 0;
    }

    &_button {
      margin-top: 16px;
    }

    &_change {
      margin-top: 12px;

      &:hover {
        text-decoration: underline;
        color: #409EFF;
        cursor: pointer;
      }
    }
  }

</style>
