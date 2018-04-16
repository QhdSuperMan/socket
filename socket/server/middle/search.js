const express = require('express')
const connect = require('../base/initmysql')
const search = express.Router()



search.get('/search',(req,res)=>{
  connect.getConnection((err,conc)=>{
    if(err) throw err;
    let sql = 'SELECT * FROM user WHERE usename LIKE "'+ req.query.query+'%"'
    conc.query(sql,(err,result)=>{
      if(err) throw err;
      result.map((val)=>{
        return val['password']=''
      })
      res.json(result)
    })
    conc.release()
  })
})

module.exports = search