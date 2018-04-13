<template>
  <div class='home' >
    <div class='main'  >
      <el-row  >
        <el-col :xs='8' :xl='8' :lg='8' :sm='8' :md='8' class='Main_left' >
          <div class='l_header' >
            <headerImg class='l_title' />
            <el-input class='l_search' placeholder='请输入搜索内容' prefix-icon="el-icon-search"
            size='small' >
            </el-input>
            <div class='l_control'>
              <span v-for='(val,item) in icon_class' :key='item' @click='changeIndex(item)'>
                <i :class='item === icon_controll ? `${val} active`:val'></i>
              </span>
            </div>
          </div>
        </el-col>
        <el-col :xs='16' :xl='16' :lg='16' :sm='16' :md='16' class='Main_right' >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import headerImg from '@/base/title.vue'
export default{
  data () {
    return {
      icon_controll: 0,
      icon_class: [
        'el-icon-time', 'el-icon-mobile-phone', 'el-icon-tickets'
      ]
    }
  },
  created () {
    document.body.height = window.innerHeight + 'px'
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      axios.get('api/logincheck').then((data) => {
        if (data.data.code !== 0) {
          this.$message({
            message: data.data.msg,
            type: 'error'
          })
          setTimeout(() => {
            this.$router.push('/register')
          }, 500)
        }
      })
    },
    changeIndex (item) {
      this.icon_controll = item
    }
  },
  components: {
    headerImg
  }
}

</script>

<style lang='stylus' >
.home
  width:100%
  height:100%
  .main
    position:absolute
    top:0
    bottom:0
    right:0
    left:0
    margin:auto
    width:600px
    height:500px
    .Main_left
      height:500px
      background-color:rgb(46,50,56)
      .l_header
        padding:10px
      .l_search
        padding:5px 0px
      .l_control
        padding:10px 0px
        font-size:0px
        span
          font-size:18px
          display:inline-block
          color:white
          text-align:center
          width:33%
        .active
          color:green
    .Main_right
      height:500px
      background-color:rgb(230,230,230)
</style>
