const express = require('express');
const app = new express();
const routerRegister = require('./server/middle/register')
const login = require('./server/middle/login')
const mysql = require('mysql')

app.get('/',(req,res)=>{
  res.send('你好')
})
app.use('/socket',routerRegister)
app.use('/socket',login)
app.listen(8081)
console.log('8081端口已经启动')


