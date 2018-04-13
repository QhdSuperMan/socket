<template>
    <div class='headerImg' >
      <div class='url' @click='bigImg' ><img :src="url" alt="头像"></div>
      <div class='Bigurl' v-if='add' @mouseleave='bigImg' >
        <img :src="url" alt="头像">
        <el-button size='small' round >更换头像</el-button>
      </div>
      <div class='user'  > {{msg}} </div>
      <upload class='upload'  @imgload='imgLoad' ref='upload' @update='HeaderImgUpdate' />
      <div class='upload_icon' ref='icon' ><i class='el-icon-star-on' ></i></div>
    </div>
</template>

<script>
import axios from 'axios'
import upload from './upload'
export default{
  data () {
    return {
      msg: '',
      url: '../assets/img/gail.png',
      add: false
    }
  },
  created () {
    this.getHeaderImg()
  },
  methods: {
    HeaderImgUpdate () {
      this.getHeaderImg()
    },
    imgLoad (e) {
      this.$refs.icon.style.transition = `all 1s cubic-bezier(1,-0.39,.36,1.44)`
      this.$refs.icon.style.visibility = `visible`
      this.$refs.icon.style.top = `25px`
      this.$refs.icon.style.left = `25px`
      this.$refs.icon.addEventListener('transitionend', () => {
        this.url = e.src
        this.$refs.icon.style.transition = ''
        this.$refs.icon.style.visibility = `hidden`
        this.$refs.icon.style.top = `40%`
        this.$refs.icon.style.left = `48%`
        this.$refs.upload.confirm()
      })
    },
    getHeaderImg () {
      axios.get('api/getImg').then((data) => {
        if (data.data.code === 0) {
          this.msg = data.data.user
          this.url = data.data.headerUrl
          console.log(data.data.headerUrl)
          if (!data.data.headerUrl) {
            if (data.data.sex === 0) {
              this.url = require('../assets/img/gail.png')
            } else {
              this.url = require('../assets/img/boy.png')
            }
          }
        }
      })
    },
    bigImg (e) {
      this.add = !this.add
    }
  },
  components: {
    upload
  }
}
</script>

<style lang='stylus' >
.headerImg
  width:100%
  height:50px
  color:white
  div
    float:left
  .url
    img
      width:50px
      cursor:pointer
  .user
    padding-left:5px
    line-height:50px
    white-space:nowrap
    text-overflow :ellipsis
    overflow:hidden
    cursor:pointer
  .Bigurl
    position:absolute
    background-color:rgb(200,200,200)
    width:150px
    height:150px
    top:40px
    left:30px
    text-align:center
    padding-top:10px
    z-index:1
    img
      width:100px
      padding-bottom:5px
  .upload
    top:35%
    left:0
    right:0
    margin:0px auto
  .upload_icon
    position:absolute
    font-size:30px
    visibility: hidden
    color:yellow
    top:40%
    left:48%
    z-index:40
    //transition:all 1s cubic-bezier(1,-0.39,.36,1.44)
</style>
