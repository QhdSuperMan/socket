const express = require('express')
const getheaderImg = express.Router()
const connect = require('../base/initmysql')

getheaderImg.get('/getImg',(req,res)=>{
  connect.getConnection((err,conc)=>{
    if(err) throw err;
    let sql ='SELECT * FROM user WHERE usename= ?'
    conc.query(sql,[req.cookies.id],(err,result)=>{
      if(err) throw err;
      res.send(JSON.stringify({code:0,user:req.cookies.id,headerUrl:result[0].headPic,sex:result[0].sex}))
    })
    conc.release()
  })
})

module.exports = getheaderImg 

