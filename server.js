var express = require('express')
var app = express()
var server = app.listen(3000)
var io = require('socket.io').listen(server)

app.use(express.static('public'))
users = []
io.on('connection', socket => {
    console.log("Connected!", socket.id)
    socket.on('setUsername', data => {
        if(users.indexOf(data) > -2) {
            users.push(data)
            socket.emit('userSet', {username: data})
        }
        else {
            socket.emit('userExists', data + ` nazwa jest zajeta.`)
        }
    })
    socket.on('msg', (data) => {
        io.sockets.emit('newmsg', data)
    })
    

    
    
})


server
console.log('http://localhost:3000')