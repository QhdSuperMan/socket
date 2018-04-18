<template>
  <div class='home' >
    <div class='main'  >
      <el-row  >
        <el-col :xs='8' :xl='8' :lg='8' :sm='8' :md='8' class='Main_left' >
          <div class='l_header' >
            <headerImg class='l_title' v-if='this.getUsename' />
            <el-input class='l_search' placeholder='请输入搜索内容' prefix-icon="el-icon-search" @change='queryChange' clearable
            size='small' >
            </el-input>
            <div class='l_control'>
              <span v-for='(val,item) in icon_class' :key='item' @click='changeIndex(item)'>
                <i :class='item === icon_controll ? `${val} active`:val'></i>
              </span>
              <div class='messageCount' v-if='messageCount !== 0' >
                <span>{{ messageCount }}</span>
              </div>
            </div>
          </div>
          <linkMan v-show='icon_controll===1' :linkList='linkManData'  @openChat='openChat' />
          <div v-show='icon_controll===0' class='chatArray' >
            <div v-for='(val,key) in chatArray' :key='key' class='chatArrayItem clear' @click='openChatBox(val)'>
              <div class='chat_header'>
                <img :src="val.img" alt="头像">
              </div>
              <div class='chat_info' >
                <p>{{ val.usename }}</p>
                <p v-html='val.msg'></p>
              </div>
              <div class='chat_time' >
                <span>{{ val.time }}</span>
              </div>
            </div>
          </div>
          <searchList :searchArray='searchArray' @lookDetai='goToDetail' v-if='searchisShow' @addFriends='addFriends'  class='searchList'   />
        </el-col>
        <el-col :xs='16' :xl='16' :lg='16' :sm='16' :md='16' class='Main_right' >
          <chat v-if='chatIsShow'  :chatInfo='charData' @close='closeChat' :socket='socket' ref='char' @message='updateArray'   />
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
import { config } from 'assets/js/config'
import { mapGetters } from 'vuex'
import { getHistory, setHistory } from 'assets/js/session'
import { charHistory } from 'assets/js/chat'
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
      socket: {},
      // 会话数组 数组包括 图片。usename ，时间，最后一句话。
      chatArray: []
    }
  },
  computed: {
    messageCount () {
      let count = 0
      for (let i = 0; i < this.chatArray.length; i++) {
        count += this.chatArray[i].count
      }
      return count
    },
    ...mapGetters([
      'getHeadUrl',
      'getUsename'
    ])
  },
  created () {
    document.body.height = window.innerHeight + 'px'
    this.checkLogin()
    if (this.getUsename) {
      this.getLinkMan()
    }
    setTimeout(() => {
      this.connectSocket()
    }, 200)
  },
  methods: {
    openChatBox (val) {
      this.charData = val
      this.chatIsShow = true
      val.count = 0
      this.$refs.char.$refs.chatMain.style.transition = ''
    },
    // 获取当前时间
    getNowTime () {
      let date = new Date()
      return `${date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()} : ${date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()}`
    },
    onMessage (val) {
      for (let i = 0; i < this.chatArray.length; i++) {
        if (this.chatArray[i].usename === val.usename) {
          this.chatArray[i].history.push(val)
          setHistory(val.usename, this.chatArray[i].history)
          this.chatArray[i].msg = val.msg
          this.chatArray[i].count += 1
          this.chatArray[i].time = this.getNowTime()
          let box = this.chatArray[i]
          this.chatArray.splice(i, 1)
          this.chatArray.unshift(box)
          return
        }
      }
      let box = getHistory(val.usename)
      box.push(val)
      setHistory(val.usename, box)
      /* eslint-disable-next-line */
      this.chatArray.unshift(new charHistory({usename: val.usename, img: val.img, time: this.getNowTime(), history: box, msg: val.msg, count: 1}))
    },
    // 更新数组
    updateArray (user) {
      for (let i = 0; i < this.chatArray.length; i++) {
        if (this.chatArray[i].usename === user) {
          this.chatArray[i].history = getHistory(user)
          this.chatArray[i].msg = this.chatArray[i].history[this.chatArray[i].history.length - 1].msg
        }
      }
    },
    // 连接socket服务
    connectSocket () {
      /* eslint-disable-next-line */
      this.socket = io.connect('ws://127.0.0.1:8081')
      // socket默认配置，以及用户信息发送
      this.socket.emit('msg', Object.assign({code: 0, usename: this.getUsename, img: this.getHeadUrl}, config))
      // 监听消息
      this.socket.on('msg', (data) => {
        if (this.chatIsShow) {
          this.$refs.char.message(data)
        }
        this.onMessage(data)
        // 改变会话数组
      })
    },
    closeChat () {
      this.chatIsShow = false
    },
    openChat (val) {
      this.chatIsShow = true
      this.charData = val
      // 添加到会话数组
      for (let i = 0; i < this.chatArray.length; i++) {
        if (this.chatArray[i].usename === val.usename) {
          return ''
        }
      }
      let data = getHistory(val.usename)
      /* eslint-disable-next-line */
      this.chatArray.push(new charHistory({usename: val.usename, img: val.img, time: '', history: data, msg: data.length > 0 ? data[data.length - 1].msg : '', count: 0}))
    },
    getLinkMan () {
      axios.get(`api/linkman?user=${this.getUsename}`).then(result => {
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
        position: relative
        padding:10px 0px
        font-size:0px
        .messageCount
          position:absolute
          top:0px
          left:35px
          span
            display:block
            width:20px
            height:10px
            border-radius:10px
            background-color:rgb(153,157,159)
            font-size:10px
            color:red
        span
          font-size:18px
          display:inline-block
          color:white
          text-align:center
          width:33%
        .active
          color:green
      .chatArray
        color:white
        font-size:14px
        .chatArrayItem
          padding:10px
          .chat_header
            img
              margin-right:8px
              width:50px
              height:50px
              border-radius:50%
          .chat_info
            line-height:25px
            p:last-child
              height:25px
              font-size:10px
              text-align:left
            p
              width:80px
              text-overflow:ellipsis
              white-space:nowrap
              overflow:hidden
          .chat_time
            font-size:12px
            line-height:25px
          div
            float:left
            height:50px
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
