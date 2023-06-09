// api
const http = require('http')
const express = require('express')
const cors = require('cors')

// whatsapp js
const { Client } = require('whatsapp-web.js')
const client = new Client()

const app = express()

// socket io
const server = http.createServer(app)
const { Server } = require('socket.io')
const { convertQrToBase64 } = require('./utils/convertQrToBase64')

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
})
const port = process.env.PORT || 4000

// app.use(cors({
//   origin: 'http://localhost:5173'
// }))

// Routes
app.use(express.static(__dirname + '/public')) // eslint-disable-line

const usersConnected = new Map()

io.on('connection', async (socket) => {
  socket.on('session', async (sessionId) => {
    if (!usersConnected.has(sessionId)) {
      usersConnected.set(sessionId, socket)

      console.log('Número de usuarios conectados:', usersConnected.size)
      console.log('Usuario con id:', sessionId)
      console.log(`socket id ${socket.id}}`)

      socket.emit('socketConection', sessionId)

      client.on('qr', async (qr) => {
        const qrCode = await convertQrToBase64(qr)
        socket.emit('qrCode', qrCode)
      })

      client.on('authenticated', (session) => {
        socket.emit('wpSession', { session, isLogged: true })
      })

      client.on('disconnected', (reason) => {
        socket.emit('wpSessionClose', { session: null, isLogged: false })
      })

      client.on('initFlow', (flow) => {
        console.log('flow iniciado')
        console.log(flow)
      })
    } else {
      socket.emit('sessionError', 'Ya hay un usuario conectado')
      socket.disconnect()
    }
  })
})

client.initialize()

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
