const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const { addUser, removeUser, getUser, getUsersInRoom } = require('./socketHelper')

const app = express()
app.use(cors())
app.use(express.json())

const uri = 'mongodb+srv://sina:sina@nbachat.6shcr.mongodb.net/nbachat?retryWrites=true&w=majority'

mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log('Error: ' + err))
// Importing routes
const authRoutes = require('./routes/auth')

// App Middleware
app.use(morgan('dev'));

// Middleware
app.use('/api', authRoutes)

const port = process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log("Listening on port: " + port);
});

const io = require('socket.io')(server);
io.on('connection', (socket) => {

    socket.on('join', ({ name, teamName, room, id }, next) => {
        console.log(`${name} Entered the ${teamName} Chat`)

        const userCheck = getUser(id)

        if (userCheck) {
            removeUser(id)
        }

        const { user } = addUser({ id: id, name: name, room: room })

        socket.emit('message', { user: 'Admin', text: `${user.name} Welcome to the ${teamName} Room` })

        socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} Has Joined the Chat` })
        socket.join(user.room)
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        next()
    })

    socket.on('sendMessage', (message, team, name, next) => {
        io.to(team).emit('message', { user: name, text: message })
        io.to(team).emit('roomData', { room: team, users: getUsersInRoom(team) })
        next()
    })

    socket.on('disconnectRoom', ({ name, room, id }, next) => {
        const user = removeUser(id)

        if (user) {
            io.to(room).emit('message', { user: 'Admin', text: `${name} Has Left the Chat`})
            next()
        }
    })
})

