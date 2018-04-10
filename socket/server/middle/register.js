const express = require('express');
const connect = require('../base/initmysql')
const routerRegister = express.Router()

routerRegister.get('/register',(req,res)=>{
  checkUser(req.query.user, req.query.password,res)
})
module.exports=routerRegister

function checkUser (user, password,res) {
  connect.getConnection((err,conc)=>{
    if(err) throw err;
    let sql = `SELECT id FROM user where usename=?`;
    conc.query(sql,[user],(err,result)=>{
      if(err) throw err;
      if(result.length != 0){
        res.send(JSON.stringify({code:1,msg:'该用户名已经注册'}))
      }else{
        let sql ="INSERT INTO user(id,usename,password,sex,address,headPic,frends,groups) VALUES (null,'"+user+"','"+password+"',0,'','','','')"
        conc.query(sql,(err,result)=>{
        if(err) throw err;
          res.send(JSON.stringify({code:0,msg:'注册成功'}))
        })
      }
      conc.release()
    })
  })
}