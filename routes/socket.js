const readline=require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

module.exports=function(io){
io.on('connection', function (socket) {
    var nickname=socket.id
    console.log(nickname+" 연결됨")
    io.emit('join',nickname)
    socket.on('sendMsg',function(data){
        io.emit("sendMsg",{msg: data.msg,nickname: data.nickname});
        console.log(data.nickname+":"+data.msg)
    })
    
    rl.on("line", function(line) {
        socket.emit('sendMsg', {msg:line,nickname:'서버'})
    }).on("close", function() {
        process.exit()
    })
    
    socket.on('disconnect',function(socket){
        io.emit('left',nickname)
        console.log(nickname+" 접속종료");
    })
})
}