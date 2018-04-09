const express = require('express');
const login = express.Router()
const connect = require('../base/initmysql')

login.get('/login',(req,res)=>{
  checkLogin(req.query.user,req.query.password,res)
})
function checkLogin(user,password,res){
  connect.getConnection((err,conc)=>{
    if(err) throw err;
    let sql = `SELECT password FROM user where usename='${user}'`
    conc.query(sql,(err,result) => {
      if(err) throw err;
      conc.release()
      if(result.length !== 0){
        if(result[0].password == password){
          res.send(JSON.stringify({code:0,msg:"登录成功" }))
          return 
        }
      }
      res.send(JSON.stringify({code:1,msg:"登录失败,请检查用户名或者密码" }))
    })
  })
}
module.exports = login