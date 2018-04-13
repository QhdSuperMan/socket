const express = require('express');
const app = new express();
const routerRegister = require('./server/middle/register')
const login = require('./server/middle/login')
const mysql = require('mysql')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const LoginCheck =require('./server/middle/loginCheck')
const getHeaderImg = require('./server/middle/getHeaderImg')
const upload = require('./server/middle/upload')
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
app.get('/socket/imgdic',(req,res)=>{
  if(req.query.src){
    res.sendFile(`${__dirname}/public/upload/${req.query.src}`)
  }
})
app.use(express.static('./public'))
app.listen(8081)
console.log('8081端口已经启动')


