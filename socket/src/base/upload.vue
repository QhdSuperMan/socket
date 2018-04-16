<template>
  <div class='upload' >
    <div class='upload_img' ref='uploadBox' >
        <i class='el-icon-upload' ></i>
        <p>讲文件拖到此处或者<span>点击上传</span></p>
    </div>
    <form  ref='file' enctype="multipart/form-data" >
      <input type='file' name='file' @change='change' />
    </form>
    <el-dialog title='温馨提示' :visible='again' class='dialog' width='300px' append-to-body
          :close-on-press-escape='true'
          :modal='false'
     >
      <span>是否上传</span>
      <span slot='footer'  class="dialog-footer" >
        <el-button size='small' @click='upload' >确认</el-button>
        <el-button size='small' type="primary" @click='cancle' >取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      msg: 1,
      again: false
    }
  },
  props: {
    type: {
      type: String,
      default: 'image'
    }
  },
  methods: {
    cancle () {
      this.$emit('update')
      this.again = false
    },
    change (e) {
      this.file = e.target.files[0]
      this.readFile(this.file)
    },
    readFile (file) {
      if (file.type.indexOf(this.type) !== -1) {
        let fr = new FileReader()
        fr.readAsDataURL(file)
        if (file.type.indexOf('image') !== -1) {
          fr.onload = (e) => {
            let img = new Image()
            img.src = e.target.result
            this.$emit('imgload', img)
          }
        // 文件事件
        }
      } else {
        this.$message({
          message: `上传类型不是${(this.type.indexOf('image') !== -1 ? '图片' : '文件')}`,
          type: 'error'
        })
      }
    },
    confirm () {
      this.again = true
    },
    upload () {
      let fs = new FormData(this.$refs.file)
      axios.post('api/upload', fs, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        this.again = false
        this.$emit('update')
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style lang='stylus' >
.upload
    z-index:20
    position:absolute
    background-color :white
    width:300px
    height:150px
    input,.upload_img
      opacity:0
      position:absolute
      top:0
      left:0
      width:300px
      height:150px
    .upload_img
      border:dashed 1px black
      opacity:1
      color:black
      text-align:center
      i
        padding:20px 0px
        font-size:60px
      p
        span
          color:blue
</style>
