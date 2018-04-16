<template>
  <div class='home' >
    <div class='main'  >
      <el-row  >
        <el-col :xs='8' :xl='8' :lg='8' :sm='8' :md='8' class='Main_left' >
          <div class='l_header' >
            <headerImg class='l_title' />
            <el-input class='l_search' placeholder='请输入搜索内容' prefix-icon="el-icon-search" @change='queryChange' clearable
            size='small' >
            </el-input>
            <div class='l_control'>
              <span v-for='(val,item) in icon_class' :key='item' @click='changeIndex(item)'>
                <i :class='item === icon_controll ? `${val} active`:val'></i>
              </span>
            </div>
          </div>
          <linkMan v-show='icon_controll===1' :linkList='linkManData'  @openChat='openChat' />
          <searchList :searchArray='searchArray' @lookDetai='goToDetail' v-if='searchisShow' @addFriends='addFriends'  class='searchList'   />
        </el-col>
        <el-col :xs='16' :xl='16' :lg='16' :sm='16' :md='16' class='Main_right' >
          <chat v-if='chatIsShow'  :chatInfo='charData' @close='closeChat' :socket='socket'   />
          <detail  :detailObj='detailData' v-if='detailData.usename' @closeDetai='closeDetail' @addFriends='addFriends' />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import headerImg from '@/base/title.vue'
import searchList from '@/base/searchList'
import detail from '@/base/detail'
import linkMan from '@/base/linkMan'
import chat from '@/components/chat/chat'
import { getUsename } from 'assets/js/cookie'
import { config } from 'assets/js/config'
import { mapGetters } from 'vuex'
export default{
  data () {
    return {
      icon_controll: 0,
      icon_class: [
        'el-icon-time', 'el-icon-mobile-phone', 'el-icon-tickets'
      ],
      query: '',
      searchArray: [],
      searchisShow: false,
      detailData: {},
      linkManData: [],
      chatIsShow: false,
      charData: [],
      socket: {}
    }
  },
  computed: {
    ...mapGetters([
      'getHeadUrl'
    ])
  },
  created () {
    document.body.height = window.innerHeight + 'px'
    this.checkLogin()
    this.getLinkMan()
    setTimeout(() => {
      this.connectSocket()
    }, 200)
  },
  methods: {
    // 连接socket服务
    connectSocket () {
      /* eslint-disable-next-line */
      this.socket = io.connect('ws://127.0.0.1:8081')
      // socket默认配置，以及用户信息发送
      this.socket.emit('msg', Object.assign({code: 0, usename: getUsename(' id'), img: this.getHeadUrl}, config))
    },
    closeChat () {
      this.chatIsShow = false
    },
    openChat (val) {
      this.chatIsShow = true
      this.charData = val
    },
    getLinkMan () {
      axios.get('api/linkman').then(result => {
        result.data = result.data.map((val) => {
          return JSON.parse(val)
        })
        this.linkManData = result.data
      })
    },
    addFriends (id) {
      axios.get(`api/addfriends?id=${id}`).then(result => {
        if (result.data.code === 0) {
          this.$message({
            message: result.data.msg,
            type: 'success'
          })
          this.getLinkMan()
        } else {
          this.$message({
            message: result.data.msg,
            type: 'error'
          })
        }
      })
    },
    closeDetail () {
      this.detailData = {}
    },
    goToDetail (val) {
      this.detailData = val
    },
    queryChange (query) {
      this.query = query
      if (query) {
        axios.get(`api/search?query=${this.query}`).then(result => {
          this.searchArray = result.data
        })
        this.searchisShow = true
      } else {
        this.searchisShow = false
      }
    },
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
    headerImg,
    searchList,
    detail,
    linkMan,
    chat
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
    text-align:center
    .Main_left
      position:relative
      height:500px
      background-color:rgb(46,50,56)
      .l_search
        width:90%
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
      .searchList
        padding-top:10px
        position:absolute
        width:100%
        top:140px
        height:360px
        background-color:black
    .Main_right
      height:500px
      background-color:rgb(230,230,230)
</style>
