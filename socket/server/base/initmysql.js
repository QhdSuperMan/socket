//创建连接池

const mysql=require('mysql');
const conn=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'socket',
    connectionLimit:5
})

module.exports=conn