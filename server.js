var express = require('express')
var app = express()
var server = app.listen(3000)
var io = require('socket.io').listen(server)

app.use(express.static('public'))
var users = []
io.on('connection', socket => {
    console.log(`+ Uzytkownik o ID ${socket.id} polaczony!`)
    socket.on('setUsername', data => {
        if(!users.includes(data)) {
            users.push(data)
            socket.emit('userSet', {username: data})
            console.log(`• ${socket.id} zmienił nick na ${data}`)
            io.sockets.emit('userlistupdate', users)
        }
        else {
            socket.emit('userExists', data + ` nazwa jest zajeta.`)
        }
    })
    socket.on('msg', (data) => {
        io.emit('newmsg', data)
        console.log(`>> ${data.user}: ${data.message}`)
        
    })
    socket.on('userleft', data => {
        users.splice( users.indexOf(data), 1)
        io.sockets.emit('userlistupdate', users)
        console.log(`- ${data} opuścił czat.`)
    } )

    
    
})


server
console.log('http://localhost:3000')