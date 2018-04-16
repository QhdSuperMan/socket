const express = require('express')
const linkMan = express.Router()
const connect = require('../base/initmysql')

linkMan.get('/linkman',(req,res)=>{
  connect.getConnection((err,conc)=>{
    if(err) throw err;
    let sql='SELECT friends FROM user WHERE usename="'+req.cookies.id+'"'
    conc.query(sql,(err,result)=>{
      if(err) throw err;
      res.send(result[0].friends.split('+'))
      conc.release()
    })
  })
})

module.exports =linkMan