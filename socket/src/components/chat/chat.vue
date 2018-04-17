<template>
  <transition name='el-zoom-in-left' >
    <div class='char' >
      <div class='chatHeader' >
        <span @click='close' ><i class='el-icon-close' ></i></span>
        <span>{{ chatInfo.usename }}</span>
        <span><i class='icon iconfont icon-yonghu' ></i></span>
      </div>
      <div class='chatbody' ref='chatBox'>
        <div class='chatHistory' ref='chatMain' >
          <div class='chatItem' :style='val.entry ===0 ? "text-align:right" : "text-align:left"'   v-for='(val,key) in chatHistory' :key='key'>
            <span class='chatSpan' >
              <img :src="val.img" alt="" class='chatImg' :style='val.entry ===0 ? "float:right" : "float:left"' >
              <div class='chatMessage'>
                <p class='chatName'>{{ val.usename }}</p>
                <span class='chatInfo clear' :style='"color:"+val.color' v-html='val.msg' ></span>
              </div>
            </span>
          </div>
        </div>
      </div>
      <div class='chatFooter' >
        <div class='chatTool' >
          <input type="color" @change='colorChange' >
          <span><i class='icon iconfont icon-libraryicon01' ></i></span>
          <span><i class='icon iconfont icon-biaoqing' ></i></span>
        </div>
        <textarea class='chatMessage' placeholder='请输入内容' v-model='InputMessage' @keydown.13.prevent='sendMessage' ></textarea>
        <div class='sendMessage' >
          <span>注 回车键发送</span><button @click='sendMessage' >发送</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getHistory, setHistory } from 'assets/js/session'
// import { getUsename } from 'assets/js/cookie'
export default {
  data () {
    return {
      InputMessage: '',
      chatHistory: [
        // {entry: 0, img: this.chatInfo.img, usename: this.chatInfo.usename, msg: '你好的就是结合实际黄金时代环境还是的季后赛的季后赛函数的函数见好就收大手大脚'}
      ],
      color: 'black',
      translateLength: 0
    }
  },
  computed: {
    ...mapGetters([
      'getHeadUrl',
      'getUsename'
    ])
  },
  watch: {
    // 监听联系人变化存到session
    chatInfo (newChat, oldChat) {
      setHistory(oldChat.usename, this.chatHistory)
      this.chatHistory = getHistory(newChat.usename)
    },
    chatHistory (newHistory) {
      setTimeout(() => {
        if (this.$refs.chatMain.offsetHeight > this.$refs.chatBox.offsetHeight) {
          this.$refs.chatMain.style.transform = `translate3d(0, -${this.$refs.chatMain.offsetHeight - this.$refs.chatBox.offsetHeight}px, 0)`
          this.translateLength = -(this.$refs.chatMain.offsetHeight - this.$refs.chatBox.offsetHeight)
        }
      }, 20)
    },
    translateLength (newL) {
      let WH = this.$refs.chatBox.offsetHeight
      let NH = this.$refs.chatMain.offsetHeight
      if (newL + NH < WH) {
        setTimeout(() => {
          this.translateLength = WH - NH
          this.$refs.chatMain.style.transform = `translate3d(0,${this.translateLength}px,0)`
          return ''
        }, 500)
      }
      if (newL > 0) {
        setTimeout(() => {
          this.translateLength = 0
          this.$refs.chatMain.style.transform = `translate3d(0,${this.translateLength}px,0)`
        }, 500)
      }
    }
  },
  props: {
    chatInfo: {
      type: Object,
      default: () => {}
    },
    socket: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    // 颜色改变
    colorChange (e) {
      this.color = e.target.value
    },
    MouseScroll (e) {
      let WH = this.$refs.chatBox.offsetHeight
      let NH = this.$refs.chatMain.offsetHeight
      if (WH > NH) {
        return
      }
      if (e.wheelDelta) {
        if (e.wheelDelta > 0) {
          // 谷歌。向上滚动
          this.translateLength = this.translateLength - (e.wheelDelta / 1)
          this.$refs.chatMain.style.transform = `translate3d(0,${this.translateLength}px,0)`
        } else {
          // 向下滚动
          this.translateLength = this.translateLength - (e.wheelDelta / 1)
          this.$refs.chatMain.style.transform = `translate3d(0,${this.translateLength}px,0)`
        }
      } else {
        // 火狐
        if (e.detail > 0) {
          this.$refs.chatMain.style.transform = `translate3d(0,${this.translateLength}px,0)`
        } else {
          this.$refs.chatMain.style.transform = `translate3d(0,${this.translateLength}px,0)`
        }
      }
    },
    sendMessage (e) {
      if (!this.InputMessage) {
        return
      }
      if (e.keyCode === 13 && e.ctrlKey) {
        this.InputMessage += '\n'
        return 0
      }
      // 绘制 //vuex 开发用
      this.chatHistory.push({entry: 0, img: this.getHeadUrl, usename: this.getUsename, msg: this.InputMessage, color: this.color})
      this.socket.emit('msg', {sendTo: this.chatInfo.usename, code: 1, entry: 1, msg: this.InputMessage, usename: this.getUsename, img: this.getHeadUrl, color: this.color})
      this.InputMessage = ''
      setHistory(this.chatInfo.usename, this.chatHistory)
      this.$emit('message', this.chatInfo.usename)
    },
    message (msg) {
      if (msg.usename === this.chatInfo.usename) {
        this.chatHistory.push(msg)
      }
    },
    close () {
      this.$emit('close')
    }
  },
  created () {
    setTimeout(() => {
      // 从本地获取聊天记录
      this.chatHistory = getHistory(this.chatInfo.usename)
      let timer
      this.$refs.chatBox.addEventListener('mousewheel', (e) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          this.MouseScroll(e)
        }, 50)
      })
    }, 20)
  }
}
</script>

<style lang='stylus'>
.char
  position:relative
  width:100%
  height:100%
  background-color :rgb(46,50,56)
  border-left:solid 1px black
  color:white
  .chatHeader
    height:30px
    display:flex
    justify-content:space-between
    align-items:center
    span
      padding:10px
  .chatbody
    color:black
    overflow:hidden
    border:solid 1px black
    border-left:none
    height:360px
    background-color :white
    .chatHistory
      .chatItem
        padding:10px
        .chatSpan
          .chatName
            padding-bottom:5px
            font-size:12px
          .chatImg
            padding:0px 10px
            width:50px
            height:50px
            border-radius:50%
          .chatInfo
            text-align:left
            word-wrap:break-word
            word-break:break-all
            display:inline-block
            max-width:200px
            min-width:20px
            padding:10px
            border-radius:10px
            background-color:rgb(82,139,188)
  .chatFooter
    box-sizing:border-box
    width:100%
    position:absolute
    top:390px
    bottom:0px
    background-color :white
    border:solid 1px black
    border-left:none
    .chatTool
      color:black
      text-align:left
      width:100%
      height:30px
    .chatMessage
      width:95%
      height:40px
      border:none
      outline:none
    .sendMessage
      color:black
      text-align:right
      padding:0px 10px
      button
        width:50px
        border-radius:5px
</style>
