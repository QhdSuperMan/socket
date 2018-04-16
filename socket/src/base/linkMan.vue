<template>
  <div class='linkMan' >
    <div class='linkItem clear' v-for='(val,index) in linkList' :key='index'   @click='openChat(val)' >
      <div class='linkImg' >
        <img :src="val.img" alt="头像">
      </div>
      <div class='linkUsename' >
        <div class='linkTable' >{{val.usename}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    linkList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    openChat (val) {
      this.$emit('openChat', val)
    }
  }
}
</script>

<style lang='stylus' >
.linkMan
  color:white
  .linkItem
    margin:8px 0px
    cursor:pointer
    font-size:14px
    >div
      float:left
    .linkImg
      width:40%
      img
        width:50px
        height:50px
        border-radius:50%
    .linkUsename
      display:table
      height:50px
      .linkTable
        display:table-cell
        vertical-align:middle
        text-align:center
</style>
