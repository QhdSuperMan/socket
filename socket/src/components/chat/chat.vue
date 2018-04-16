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
          <div class='chatItem' :style='val.entry ===0 ? "text-align:right" : "text-align:left"'  v-for='(val,key) in chatHistory' :key='key'>
            <span class='chatSpan' >
              <img :src="val.img" alt="" class='chatImg' :style='val.entry ===0 ? "float:right" : "float:left"' >
              <div class='chatMessage'>
                <p class='chatName'>{{ val.usename }}</p>
                <span class='chatInfo' >{{ val.msg }}</span>
              </div>
            </span>
          </div>
        </div>
      </div>
      <div class='chatFooter' >
        <div class='chatTool' >
          <input type="color">
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
import { getUsename } from 'assets/js/cookie'
export default {
  data () {
    return {
      InputMessage: '',
      chatHistory: [
        // {entry: 0, img: this.chatInfo.img, usename: this.chatInfo.usename, msg: '你好的就是结合实际黄金时代环境还是的季后赛的季后赛函数的函数见好就收大手大脚'}
      ]
    }
  },
  computed: {
    ...mapGetters([
      'getHeadUrl'
    ])
  },
  watch: {
    chatHistory (newHistory) {
      setTimeout(() => {
        if (this.$refs.chatMain.offsetHeight > this.$refs.chatBox.offsetHeight) {
          this.$refs.chatMain.style.transform = `translate3d(0, -${this.$refs.chatMain.offsetHeight - this.$refs.chatBox.offsetHeight}px, 0)`
        }
      }, 20)
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
    MouseScroll (e) {
      if (e.target.className === 'chatbody') {
        console.log(e)
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
      // 绘制
      this.chatHistory.push({entry: 0, img: this.getHeadUrl, usename: getUsename(' id'), msg: this.InputMessage})
      this.socket.emit('msg', {sendTo: this.chatInfo.usename, code: 1, entry: 1, msg: this.InputMessage, usename: getUsename(' id'), img: this.getHeadUrl})
      this.InputMessage = ''
    },
    message (msg) {
      this.chatHistory.push(msg)
    },
    close () {
      this.$emit('close')
    }
  },
  created () {
    this.socket.on('msg', (data) => {
      this.message(data)
    })
    if (document.addEventListener) {
      document.addEventListener('DOMMouseScroll', () => {
        this.MouseScroll()
      })
    }
    window.onmousewheel = document.onmousewheel = this.MouseScroll
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
      transition:all 0.5s linear
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
            display:inline-block
            max-width:200px
            padding:10px
            border-radius:10px
            background-color:blue
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
