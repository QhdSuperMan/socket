const express = require('express')
const addFriends = express.Router()
const connect = require('../base/initmysql')

addFriends.get('/addfriends',(req,res)=>{
  connect.getConnection((err,conc)=>{
    if(err) throw err;
    let query = JSON.parse(req.query.id)
    if(query.usename == req.cookies.id){
      res.json({code:-1,msg:'太自恋了吧，不能添加自己为好友'})
      conc.release()
      return
    }
    let sql='SELECT friends FROM user where usename="'+req.cookies.id+'"'
    conc.query(sql,(err,result)=>{
      if(err) throw err;
      let item = result[0].friends.split('+')
      if(item==''){
        item=[]
      }
      for(let i=0;i<item.length;i++){
        item[i] = JSON.parse(item[i])
        if(item[i].usename==query.usename){
          res.json({code:-1,msg:'该用户已经是您的好友了'})
          conc.release()
          return
        }
        item[i] = JSON.stringify(item[i])
      }
      item.push(JSON.stringify(query))
      item=item.join('+')
      let sql = "UPDATE user SET friends='"+item+"' WHERE usename='"+req.cookies.id+"'"
      conc.query(sql,(err,result)=>{
        if(err) throw err;
        res.json({code:0,msg:'添加成功，赶快聊天吧'})
        conc.release()
      })
    })
  })
})


module.exports = addFriends