const express = require('express');
const login = express.Router()
const connect = require('../base/initmysql')
const sessionParser = require('express-session');
const cookieParser = require('cookie-parser');

login.get('/login',(req,res)=>{
  checkLogin(req.query.user,req.query.password,req,res)
})
// 验证登录
function checkLogin(user,password,req,res){
  connect.getConnection((err,conc)=>{
    if(err) throw err;
    let sql = `SELECT password FROM user where usename='${user}'`
    conc.query(sql,(err,result) => {
      if(err) throw err;
      conc.release()
      if(result.length !== 0){
        if(result[0].password == password){
          res.cookie('id',user)
          req.session.user = {user:user,password:password}
          req.session.save() 
          res.send(JSON.stringify({code:0,msg:"登录成功" }))
          return 
        }
      }
      res.send(JSON.stringify({code:1,msg:"登录失败,请检查用户名或者密码" }))
    })
  })
}

module.exports = login