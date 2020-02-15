var app = require('express')()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var socketMethod = require('./routes/socket')

// ejs 사용
app.set('view engine', 'ejs');

// 라우팅
app.use('/',require('./routes/index'))

// 소켓적용
socketMethod(io) 

server.listen(3000)