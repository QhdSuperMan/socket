const express = require('express')
const LoginCheck = express.Router()

LoginCheck.get('/logincheck',(req,res)=>{
  if(!req.cookies.id || !req.session.user){
    res.send(JSON.stringify({code:-1,msg:"请先登录"}))
    return 
  }
  if(req.cookies.id === req.session.user.user){
    res.send(JSON.stringify({code:0,msg:"登录成功"}))
  }else{
    res.send(JSON.stringify({code:-1,msg:"请先登录"}))
  }
})

module.exports = LoginCheck