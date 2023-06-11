// api
const http = require('http')
const express = require('express')

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

// Routes
app.use(express.static(__dirname + '/public')) // eslint-disable-line

const usersConnected = new Map() // conexion de usuarios

// conexion del sockte io
io.on('connection', async (socket) => {
  /*
    // escuchamos el evento session para crear una nueva sesion
    // y guardamos el socket del usuario en el mapa = {sessionId: socket}
  */
  socket.on('session', async (sessionId) => {
    /*
      // en el socket solo tendremos un usuario por sesion
      // escuchamos el evento session para crear una nueva sesion
      // y guardamos el socket del usuario en el mapa = {sessionId: socket}
    */

    if (!usersConnected.has(sessionId)) {
      usersConnected.set(sessionId, socket)
      /*
        // cuando un usario este conectado
        // en la terminal aparecera el numero de usuarios conectados
        // y el id del usuario que se conecto
      */

      console.log('Número de usuarios conectados:', usersConnected.size)
      console.log('Usuario con id:', sessionId)
      console.log(`socket id ${socket.id}}`)

      /*
        // En la linea 58 creamos un evento para enviar el sessionId del usuario.
      */
      socket.emit('socketConection', sessionId)

      /*
        // En la linea 65 usando la libreria de whatsapp-web.js le pedimos que genere un codigo QR
        // luego lo convertimos a base64 el qr para enviarlo al cliente
        // y creamos un evento "qrCode" para enviar el qr al cliente
      */

      client.on('qr', async (qr) => {
        const qrCode = await convertQrToBase64(qr)
        socket.emit('qrCode', qrCode)
      })

      /*
        // En la linea 76 cuando la libreria de whatsapp-web.js detecte cuando el usario escanee el codigo QR
        // si inicio sesion correctamente se ejecutara el evento "authenticated"
        // luego creamos un evento "wpSession" para avisalr al cliente que el usuario inicio sesion correctamente
      */

      client.on('authenticated', (session) => {
        socket.emit('wpSession', { session, isLogged: true })
      })

      /*
        // En la linea 86 cuando la libreria de whatsapp-web.js detecte cuando el usario cierre sesion
        // si el usuario cierra sesion correctamente se ejecutara el evento "disconnected"
        // luego creamos un evento "wpSessionClose" para avisalr al cliente que el usuario cerró sesion correctamente
      */

      client.on('disconnected', (reason) => {
        socket.emit('wpSessionClose', { session: null, isLogged: false })
      })

      /*
        // cuando el socket escuche el evento "initFlow" cuando el cliente elija un flujo recibiremos el flujo
        // usando la destructuracion de objetos guardamos los triggers y actions en variables
        // escuchamos el evento "message" cuando un usuario x de whatsapp nos envie un mensaje
        // buscamos si el mensaje del usuario coincide con algun trigger
        // buscamos el action que coincida con el trigger
        // enviamos el mensaje del action al usuario x de whatsapp
      */

      socket.on('initFlow', async (flow) => {
        const flowContent = flow

        const { triggers, actions } = flowContent

        client.on('message', async (userMsg) => {
          const findMatch = triggers.find((item) => item.keyword === userMsg.body)
          const findAction = actions[findMatch?.next]

          console.log({
            findMatch,
            findAction
          })

          client.sendMessage(userMsg.from, findAction?.message)
        })

        // console.log('flow iniciado')
        console.log({
          triggers,
          actions
        })
      })
    } else {
      socket.emit('sessionError', 'Ya hay un usuario conectado')
      socket.disconnect()
    }
  })
})

/*
  // Inicializamos el cliente de whatsapp
*/

client.initialize()

/*
  // Inicializamos el servidor
*/

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
