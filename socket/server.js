const express = require('express');
const app = new express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const routerRegister = require('./server/middle/register')
const login = require('./server/middle/login')
const mysql = require('mysql')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const LoginCheck =require('./server/middle/loginCheck')
const getHeaderImg = require('./server/middle/getHeaderImg')
const upload = require('./server/middle/upload')
const search = require('./server/middle/search')
const addFriends = require('./server/middle/addFrends')
const linkMan = require('./server/middle/linkMan')
app.use(cookieParser('id'));
app.use(session({
 secret: 'id',//与cookieParser中的一致
 resave: true,
 saveUninitialized:true
}));
app.get('/',(req,res)=>{
  res.send('好')
})
app.use('/socket',getHeaderImg)
app.use('/socket',routerRegister)
app.use('/socket',login)
app.use('/socket',LoginCheck)
app.use('/socket',upload)
app.use('/socket',search)
app.use('/socket',addFriends)
app.use('/socket',linkMan)
app.get('/socket/imgdic',(req,res)=>{
  if(req.query.src){
    res.sendFile(`${__dirname}/public/upload/${req.query.src}`)
  }
})
app.use(express.static('./public'))
server.listen(8081)
console.log('8081端口已经启动')
module.exports = app
// socket逻辑
console.log('socket服务器启动')
// 在线状态的连接池
let connecBox = []
io.on('connection',(socket)=>{
  // console.log(socket.id)
  socket.on('msg',(msg)=>{
    // code等于0 登录。写入身份信息
    if(msg.code ===0 ){
      connecBox = connecBox.filter((val)=>{
        return val.usename !== msg.usename
      })
      connecBox.push(Object.assign({app:socket,id:socket.id},msg))
    // code 等于1 聊天
    } else if(msg.code ===1) {
      console.log(connecBox)
      connecBox.forEach(val => {
        if (val.usename === msg.sendTo){
          // console.log(val)
          val.app.emit('msg',msg)
          // val.emit('msg',msg)
        }
      })
    }
  })
  socket.on('disconnect',(data)=>{
    connecBox = connecBox.filter((val)=>{
      if(val.id !== socket.id){
        return val
      }
    })
  })
})