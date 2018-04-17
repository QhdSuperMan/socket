<template>
    <div class='headerImg' >
      <div class='url' @click='bigImg' ><img :src="url" @load='ImgaeLoad' alt="头像"></div>
      <div class='Bigurl' v-if='add' @mouseleave='bigImg' >
        <div class='imgControll' >
          <img :src="url" alt="头像"  >
        </div>
        <el-button size='small' round  @click='uploadChange' >更换头像</el-button>
      </div>
      <div class='user' :title='msg' > {{msg}} </div>
      <div class='menu' ><i @click='openMenu' class='el-icon-menu' ></i></div>
      <menuList class='menuList' v-if='menuListisShow' @close='closeMenu' />
      <upload class='upload' v-if='UploadisShow'  @imgload='imgLoad' ref='upload' @update='HeaderImgUpdate' />
      <div class='upload_icon' ref='icon' ><i class='el-icon-star-on' ></i></div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import axios from 'axios'
import upload from './upload'
import menuList from '@/components/menu/menu'
export default{
  data () {
    return {
      msg: '',
      url: '',
      add: false,
      UploadisShow: false,
      menuListisShow: false
    }
  },
  computed: {
    ...mapGetters([
      'getUsename'
    ])
  },
  watch: {
    url (newImg) {
      this.imgChange(newImg)
    }
  },
  created () {
    this.getHeaderImg()
  },
  methods: {
    openMenu () {
      this.menuListisShow = true
    },
    closeMenu () {
      this.menuListisShow = false
    },
    ImgaeLoad (e) {
      if (e.target.width <= e.target.height) {
        e.target.style.width = '50px'
      } else {
        e.target.style.height = '50px'
      }
    },
    uploadChange () {
      this.UploadisShow = true
    },
    HeaderImgUpdate () {
      this.getHeaderImg()
      this.UploadisShow = false
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
      this.msg = this.getUsename
      axios.get(`api/getImg?user=${this.getUsename}`).then((data) => {
        if (data.data.code === 0) {
          this.url = data.data.headerUrl
          // if (!data.data.headerUrl) {
          //   if (data.data.sex === 0) {
          //     this.url = require('../assets/img/gail.png')
          //   } else {
          //     this.url = require('../assets/img/boy.png')
          //   }
          // }
        }
      })
    },
    bigImg (e) {
      this.add = !this.add
    },
    ...mapMutations({
      'imgChange': 'HEADIMG'
    })
  },
  components: {
    upload,
    menuList
  }
}
</script>

<style lang='stylus' >
.headerImg
  width:100%
  height:50px
  color:white
  padding:10px
  box-sizing:border-box
  >div
    float:left
    line-height:50px
  .url
    width:50px
    height:50px
    overflow:hidden
    border-radius:50%
    img
      cursor:pointer
  .user
    width:80px
    padding-left:5px
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
    z-index:1
    .imgControll
      margin:10px auto
      width:100%
      text-align:center
      height:80px
      overflow:hidden
    img
      width:80px
      padding-bottom:5px
  .menu
    position:absolute
    left:160px
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
  .menuList
    position:absolute
    top:0
    left:0
    height:500px
    width:100%
    background-color:rgb(22,22,22)
    z-index:5
</style>
