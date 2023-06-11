const socket = io('http://localhost:4000')

// functions

function initializeSession (id) {
  socket.emit('session', id)
}

function getSocketSession () {
  socket.on('socketConection', (data) => {
    console.log({
      session: data
    })

    saveSession(data)
  })
}

async function getQrCode () {
  return new Promise((resolve, reject) => {
    socket.on('qrCode', (qr) => {
      resolve(qr)
    })
  })
}

function getWhatsappSession () {
  return new Promise((resolve, reject) => {
    socket.on('wpSession', (data) => {
      resolve(data)
    })
  })
}

function closeSession () {
  return new Promise((resolve, reject) => {
    socket.on('wpSessionClose', (data) => {
      resolve(data)
    })
  })
}

function initializeFlow (flow) {
  socket.emit('initFlow', 'flow')
}
