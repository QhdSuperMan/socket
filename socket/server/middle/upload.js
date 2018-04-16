const express = require('express');
const upLoad = express.Router();
const connect  = require('../base/initmysql')
const multer = require('multer')
const fs = require('fs')
// 配置文件目录和名字
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null, 'public/upload')
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+file.originalname)
  }
})
// 测试文件目录是否存在
// const createFolder = function(folder){
//   try{
//     fs.accessSync(folder)
//   }catch(e){
//     fs.mkdirSync(folder)
//   }
// }
// var uploadFolder = './pubilc/upload'
// createFolder(uploadFolder);
var uploadMulter = multer({storage:storage})

upLoad.post('/upload',uploadMulter.single('file'),(req,res) => {
  connect.getConnection((err, conc) => {
    if(err) throw err; 
    var sql="SELECT headPic FROM user where usename='"+req.cookies.id+"'"
    conc.query(sql,(err,result)=>{
      if(err) throw err;
      if(!result){
        return 
      };
      if(result[0].headPic){
        var url = result[0].headPic.slice(result[0].headPic.indexOf('=')+1,result[0].headPic.length)
        if(url !== 'gail.png'){
          fs.unlink(`public/upload/${url}`,(err,result)=>{
            if(err) throw err;
          })
        }
      }
    })
    var sql="UPDATE user SET headPic='api/imgdic?src="+req.file.filename+"' where usename='"+req.cookies.id+"'"
    conc.query(sql,(err,result)=>{
      if(err) throw err;
    })
    conc.release()
  })
  res.json({code:0})
})

module.exports = upLoad