<template>
    <div>
      
    </div>
</template>

<script>
import axios from 'axios'
export default{
  data () {
    return {
      msg: '',
      url: ''
    }
  },
  created () {
    this.getHeaderImg()
  },
  methods: {
    getHeaderImg () {
      axios.get('api/getImg').then((data) => {
        console.log(data)
        if (data.data.code === 0) {
          this.msg = data.data.user
          this.url = data.data.headerImg
          if (data.data.headerImg) {
            if (data.data.sex === 0) {
              this.url = 'assets/img/gail.png'
            } else {
              this.url = 'assets/img/boy.png'
            }
          }
        }
      })
    }
  }
}
</script>

<style lang='stylus' >

</style>
