<template>
  <div class='home' >
    <div class='main'  >
      <el-row  >
        <el-col :xl='8' :lg='8' :sm='8' :md='8' class='Main_left' >
          <div class='l_header' >
            <headerImg class='l_title' />

            <div class='l_search' >

            </div>
            <div class='l_control' >

            </div>
          </div>
        </el-col>
        <el-col :xl='16' :lg='16' :sm='16' :md='16' class='Main_right' >

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
      msg: 1
    }
  },
  created () {
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
      background-color:rgb(153,157,159)
    .Main_right
      height:500px
      background-color:rgb(230,230,230)
</style>
