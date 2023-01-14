// index.js

const delay = require('delay')
const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')

const port = process.env.PORT || 3000;
const io = new Server(server)

app.use(express.static(__dirname + '/' + 'html'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + 'html/index.html')
})

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('on-chat', data => {
        // console.log({data})
        io.emit('user-chat', data)
    })
})

server.listen(port, () => {
    console.log('listening on port ' + port)
})

async function broadcastPrize() {
    
    while(true) {
        // const prize = await getPrize();
        const prize = 30000 + Math.random() * 400;
        io.emit('new-price', {
            price: parseFloat(prize.toFixed(2))
        })

        await delay(1000)
    }

}

broadcastPrize()