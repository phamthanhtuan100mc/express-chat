// index.js

const { createServer } = require("http");
const { Server } = require('socket.io')
const delay = require('delay')
const express = require('express')
const app = express()

const PORT = 3000
const server = createServer()

const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('on-chat', data => {
        // console.log({data})
        io.emit('user-chat', data)
    })
})

server.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})

async function broadcastPrize() {
    
    while(true) {
        // const prize = await getPrize();
        const prize = 31750 + Math.random() * 400;
        io.emit('new-price', {
            price: parseFloat(prize.toFixed(2))
        })

        await delay(3000)
    }

}

broadcastPrize()