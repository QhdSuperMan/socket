const express = require('express')
const connect = require('../base/initmysql')
const CheckFriend = express.Router()

CheckFriend.get('/checkfriends',(req,res)=>{
  connect.getConnection((err,conc)=>{
    if(err) throw err;
    let sql = 'SELECT friends FROM user WHERE usename="'+req.cookies.id+'"'
    conc.query(sql,(err,result)=>{
      if(err) throw err;
      if(!CheckFriends(result[0].friends.split('+'), req.query.usename)){
        res.json({code:0,msg:'他还不是你的好友'})
        return
      }
      res.json({code:-1})
      conc.release()
    })
  })
})

function CheckFriends (arr, id) {
  console.log(arr)
  for(let i=0;i<arr.length;i++){
    console.log(arr[i])
    if(JSON.parse(arr[i]).usename ===id){
      return true
    }
  }
  return false
}
module.exports = CheckFriend
