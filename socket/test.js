var express = require('express')

var app = new express()
app.use(express.static('./public'))

app.get('')
app.listen(8888);
