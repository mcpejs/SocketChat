module.exports=function(io){
io.on('connection', function (socket) {
    let nickname='익명'
    let room='메인'

    // 새로운 클라이언트가 방에 입장할때
    socket.on('joinsocket',function(data){
        // 기본 이름은 익명
        nickname=data.nickname
        // 기본 방은 메인
        room=data.room
        console.log(`${nickname} ${room} 으로 입장`)
        socket.join(room)
        // 자신이 들어간 모든 방 인원에게 joinnew 이벤트 보냄
        io.sockets.in(room).emit('joinnew',{
            nickname:nickname,
            count:io.sockets.adapter.rooms[room].length
        })
    })

    // 클라이언트가 채팅을 보낼때
    socket.on('sendMsg',function(data){
        let msg=data.msg
        
        // 자신을 제외한 방 인원에게 sendMsg 이벤트 보냄
        socket.broadcast.to(room).emit('sendMsg',{
            nickname:nickname,
            msg:msg
        })
    })
    
    socket.on('disconnect',function(socket){
        io.sockets.in(room).emit('leave',{
            nickname:nickname,
            count:io.sockets.adapter.rooms[room].length
        })
    })
})
}