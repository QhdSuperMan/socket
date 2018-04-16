<template>
    <div class='moreMessage' >
      <div class='close' >
        <span @click='close' ><i class='el-icon-close' ></i></span>
      </div>
      <div class='DheaderImg' >
        <img :src="detailObj.headPic" alt="头像">
      </div>
      <div class='detailInfo' >
        <span>昵<i class='addspace'></i>称：</span><span>{{ detailObj.usename }}</span>
      </div>
      <div class='detailInfo'>
        <span>性<i class='addspace'></i>别：</span><span>{{ detailObj.sex ===0 ? '鼓励师' : '程序员'}}</span>
      </div>
      <div class='detailInfo'>
        <span>住<i class='addspace'></i>址：</span><span>{{ detailObj.address ? detailObj.address : '火星来的'}}</span>
      </div>
      <div class='detailInfo'>
        <span>兴<i class='addspace'></i>趣：</span><span>{{ detailObj.address ? detailObj.address : '无'}}</span>
      </div>
      <div class='detailInfo'>
        <span>交友信息：</span><span>{{ detailObj.address ? detailObj.address : '无'}}</span>
      </div>
      <el-button size='mini' @click='addFriends'  >添加好友</el-button>
    </div>
</template>

<script>
export default {
  props: {
    detailObj: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    close () {
      this.$emit('closeDetai')
    },
    addFriends () {
      this.$emit('addFriends', JSON.stringify({usename: this.detailObj.usename, img: this.detailObj.headPic}))
    }
  }
}
</script>

<style lang='stylus' >
.moreMessage
  width:100%
  height:100%
  background-color:rgb(22,22,22)
  color:white
  .DheaderImg
    padding-top:10px
    width:100%
    height:200px
    overflow:hidden
    img
      width:80%
  .close
    position:absolute
    top:10px
    right: 10px
  .detailInfo
    width:80%
    margin:10px auto
    text-align:left
    span:first-child
      display:inline-block
      width:100px
      .addspace
        display:inline-block
        width:2em
</style>
