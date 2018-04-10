<template>
  <div class='register' ref='register' >
    <canvas ref='canvas' ></canvas>
    <transition name='el-zoom-in-center'  >
      <div class='register_form' v-show='isShow'  >
        <span v-text='!login ? "?去登录" : "?去注册"' class='constroll' @click='constrollChange'  ></span>
        <h1 v-text='login ? "登录" : "注册"' ></h1>
        <el-input  size='small' class='int'  placeholder='请输入用户名' clearable v-model='user'  >
          <i slot="prefix" class="el-icon-tickets int_icon"></i>
        </el-input>
        <el-input type='password' size='small' class='int'  placeholder="请输入密码"  v-model='password' clearable>
          <i slot='prefix' class='el-icon-view int_icon'  ></i>
        </el-input>
        <el-button plain class='btn ' type='primary'  size='small' @click='register()'  v-text='login ? "登录" : "注册"'></el-button>
      </div>
    </transition>
  </div>
</template>

<script>
import fireworks from 'assets/js/fireworks'
import { checkUser } from 'assets/js/base'
import axios from 'axios'
export default{
  data () {
    return {
      isShow: false,
      login: false,
      user: '',
      password: ''
    }
  },
  methods: {
    constrollChange () {
      this.login = !this.login
      this.isShow = false
      setTimeout(() => {
        this.isShow = true
      }, 500)
    },
    register () {
      if (!this.login) {
        // 注册功能
        if (checkUser(this.user, this.password) === '正确') {
          axios.get(`api/register?user=${this.user}&password=${this.password}`).then((data) => {
            if (data.data.code === 0) {
              this.$message({
                message: data.data.msg,
                type: 'success'
              })
              this.login = true
              this.isShow = false
              setTimeout(() => {
                this.isShow = true
              }, 500)
            } else {
              this.$message({
                message: data.data.msg,
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            message: checkUser(this.user, this.password),
            type: 'error'
          })
        }
      } else {
        // 登录功能
        axios.get(`api/login?user=${this.user}&password=${this.password}`).then((data) => {
          if (data.data.code === 0) {
            this.$message({
              message: data.data.msg,
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push('/')
            }, 500)
          } else {
            this.$message({
              message: data.data.msg,
              type: 'error'
            })
          }
        })
      }
    }
  },
  mounted () {
    console.log(this)
    fireworks(this.$refs.canvas)
    this.isShow = true
  }
}
</script>

<style lang='stylus' >
  .register
    width: 100%
    height: 100%
    background-color: rgb(51,52,53)
    .register_form
      .constroll
        cursor: pointer
        position: absolute
        top: 10px
        right: 10px
        font-size: 10px
      position:fixed
      top:0
      left:0
      right:0
      bottom:0
      width:300px
      height:200px
      margin:auto
      background-color:rgba(144,147,153,0.2)
      color:white
      text-align:center
      h1
        text-align:center
        margin:18px 0px
      .int
        width:70%
        margin:5px 0px
        .int_icon
          line-height:32px
          color:rgb(64,158,255)
          padding-left:5px
      .btn
        display:block
        width:70%
        margin:5px auto
        padding:10px 0px 10px 80px
        letter-spacing :20px
        text-align:left
</style>
