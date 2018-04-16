<template>
  <transition name='el-zoom-in-left' >
    <div class='menubox' >
      <div class='close' ><i  @click='close'  class='el-icon-close' ></i></div>
      <div class='menuItem' >更多资料</div>
      <div class='menuItem' @click='goToLogin'  >更换账号</div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    close () {
      this.$emit('close')
    },
    goToLogin () {
      this.$router.push('register')
    }
  }
}
</script>

<style lang='stylus'>
.menubox
  .close
    width:100%
    height:30px
    text-align:right
    line-height:30px
    i
      margin-right:10px
  .menuItem
    width:100%
    text-align:center
</style>
