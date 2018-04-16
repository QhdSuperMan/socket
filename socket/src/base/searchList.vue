<template>
  <transition name='el-zoom-in-top' >
    <div class='search clear' >
      <div class='searchItem' v-for='(val,key) in searchArray' :key='key' @click='lookDetail(val)' >
        <div >
          <img :src="val.headPic" alt="头像">
        </div>
        <div>
          <span :title='val.usename'>{{ val.usename }}</span>
          <span  @click.stop='addFriends(val)'  ><i class='el-icon-circle-plus' ></i></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    searchArray: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    addFriends (val) {
      this.$emit('addFriends', JSON.stringify({usename: val.usename, img: val.headPic}))
    },
    lookDetail (data) {
      this.$emit('lookDetai', data)
    }
  }
}
</script>

<style lang='stylus' >
.search
  .searchItem
    div
      height:50px
      float:left
      cursor:pointer
      color:white
      width:40%
      font-size:12px
    div:last-child
      width:60%
      text-align:left
      span:first-child
        display:inline-block
        width:72px
        overflow:hidden
        white-space:nowrap
        text-overflow:ellipsis
      span:last-child
        line-height:38px
        padding:10px
        color:yellow
    img
      width:40px
      height:40px
      border-radius:50%
</style>
