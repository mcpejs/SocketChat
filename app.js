var app = require('express')()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

app.set('view engine', 'ejs');

// 라우팅
app.use('/',require('./routes/index'))

// 소켓 서버
require('./routes/socket')(io) 

server.listen(3000)