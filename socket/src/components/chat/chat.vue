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
                <span class='chatInfo clear' @dblclick ='glass' :style='"color:"+val.color' v-html='val.msg' ></span>
              </div>
            </span>
          </div>
        </div>
        <div class='addFriend' v-if='isAddFriend' >是否添加好友
          <el-button size='small' >添加</el-button>
          <el-button size='small' @click='isAddFriend=false' >取消</el-button>
        </div>
      </div>
      <div class='chatFooter' >
        <div class='chatTool' >
          <input type="color" @change='colorChange' >
          <span ><i class='icon iconfont icon-libraryicon01' ></i></span>
          <input type='file' @change='sendImg' class='selectImg' />
          <span><i class='icon iconfont icon-biaoqing' ></i></span>
        </div>
        <div class='chatMessageFather'>
          <div  class='chatMessage' ref='editor' contenteditable='true' @keydown.13.prevent='sendMessage' v-html='InputMessage' ></div>
        </div>
        <!-- <textarea class='chatMessage' placeholder='请输入内容' v-model='InputMessage' @keydown.13.prevent='sendMessage' ></textarea> -->
        <div class='sendMessage' >
          <span>注 回车键发送</span><button @click='sendTo' >发送</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { getHistory, setHistory } from 'assets/js/session'
import { addClass, removeClass } from 'assets/js/dom'
// import { getUsename } from 'assets/js/cookie'
export default {
  data () {
    return {
      isAddFriend: false,
      InputMessage: '',
      chatHistory: [
        // {entry: 0, img: this.chatInfo.img, usename: this.chatInfo.usename, msg: '你好的就是结合实际黄金时代环境还是的季后赛的季后赛函数的函数见好就收大手大脚'}
      ],
      color: 'black',
      translateLength: 0,
      iSglass: false
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
      this.$refs.chatMain.style.transition = ''
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
    // 检查是不是好友
    checkFriends () {
      axios.get(`api/checkfriends?usename=${this.chatInfo.usename}`, (result) => {
        if (result.code === 0) {
          this.isAddFriend = true
        }
      })
    },
    // 发送img
    glass (e) {
      if (e.target.nodeName === 'IMG') {
        if (this.iSglass) {
          removeClass(e.target, 'glassImg')
          this.iSglass = false
          e.target.style.transform = ''
        } else {
          e.target.style.transform = this.$refs.chatMain.style.transform.replace('-', '')
          addClass(e.target, 'glassImg')
          this.iSglass = true
        }
      }
    },
    sendImg (e) {
      if (e.target.files[0].type.indexOf('image') !== -1) {
        let fs = new FileReader()
        fs.readAsDataURL(e.target.files[0])
        fs.onload = (e) => {
          let img = new Image()
          img.src = e.target.result
          img.className = 'sendImg'
          this.$refs.editor.appendChild(img)
        }
      }
    },
    // 颜色改变
    colorChange (e) {
      this.color = e.target.value
    },
    MouseScroll (e) {
      this.$refs.chatMain.style.transition = 'all 0.5s linear'
      let WH = this.$refs.chatBox.offsetHeight
      let NH = this.$refs.chatMain.offsetHeight
      if (WH > NH) {
        return
      }
      if (e.wheelDelta) {
        if (e.wheelDelta > 0) {
          // 谷歌。向上滚动
          this.translateLength = this.translateLength - (e.wheelDelta / 0.5)
          this.$refs.chatMain.style.transform = `translate3d(0,${this.translateLength}px,0)`
        } else {
          // 向下滚动
          this.translateLength = this.translateLength - (e.wheelDelta / 0.5)
          this.$refs.chatMain.style.transform = `translate3d(0,${this.translateLength}px,0)`
        }
      } else {
        // 火狐
        // if (e.detail > 0) {
        //   this.$refs.chatMain.style.transform = `translate3d(0,${this.translateLength}px,0)`
        // } else {
        //   this.$refs.chatMain.style.transform = `translate3d(0,${this.translateLength}px,0)`
        // }
      }
    },
    sendMessage (e) {
      this.$refs.chatMain.style.transition = 'all 0.5s linear'
      if (e.keyCode === 13 && e.ctrlKey) {
        e.target.innerHTML += '<br>'
        return 0
      }
      // 绘制 //vuex 开发用
      this.sendTo()
    },
    sendTo () {
      this.InputMessage = this.$refs.editor.innerHTML
      let item = this.InputMessage
      if (!this.InputMessage) {
        return
      }
      this.chatHistory.push({entry: 0, img: this.getHeadUrl, usename: this.getUsename, msg: item, color: this.color})
      this.socket.emit('msg', {sendTo: this.chatInfo.usename, code: 1, entry: 1, msg: item, usename: this.getUsename, img: this.getHeadUrl, color: this.color})
      this.InputMessage = ''
      this.$refs.editor.innerHTML = this.InputMessage
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
      this.$refs.chatMain.style.transition = ''
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
    position:relative
    color:black
    overflow:hidden
    border:solid 1px black
    border-left:none
    height:360px
    background-color :white
    .chatHistory
      position:static
      .chatItem
        padding:10px
        .chatSpan
          .chatName
            padding-bottom:5px
            font-size:12px
          .chatImg
            padding:0px 20px
            width:50px
            height:50px
            border-radius:50%
          .chatInfo
            .sendImg
              width:100px
            .glassImg
              position:absolute
              top:0px
              left:0px
              width:100%
              z-index:10
            text-align:left
            word-wrap:break-word
            word-break:break-all
            display:inline-block
            max-width:200px
            min-width:20px
            padding:10px
            border-radius:10px
            background-color:rgb(82,139,188)
    .addFriend
      position:absolute
      top:0px
      width:100%
      height:50px
      line-height:50px
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
      .selectImg
        font-size:0px
        left:48px
        padding:0
        margin:0
        width:30px
        height:30px
        position:absolute
        opacity:0
      span
        padding:0px 5px
    .chatMessageFather
      width:90%
      height:50px
      margin:0px auto
      overflow-x:hidden
      overflow-y:scroll
      .chatMessage
        margin:0px auto
        text-align:left
        line-height:25px
        color:black
        width:100%
        height:50px
        border:none
        outline:none
        .sendImg
          width:50px
    .copyInput
      padding:0px 10px
      position:absolute
      color:black
      text-align:left
    .sendMessage
      color:black
      text-align:right
      padding:0px 10px
      button
        width:50px
        border-radius:5px
</style>
