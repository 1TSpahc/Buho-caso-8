window.addEventListener('load', async () => {
  // TODO: ver si ya esta logeado para no mostrar el qr

  console.log(sessionId)

  initializeSession(sessionId)
  getSocketSession()

  const qr = await getQrCode()
  console.log(qr)
  renderQr(qr)

  const { isLogged } = await getWhatsappSession()

  if (isLogged) {
    showNotification()
    setTimeout(() => {
      window.location.href = '/pages/home/home.html'
    }, 5000)
  }
})

// functions

// renderizar qr en el front
function renderQr (qr) {
  const qrContainer = document.getElementById('qr-container')
  const img = document.createElement('img')

  img.className = 'w-full pointer-events-none'
  img.setAttribute('src', qr)

  clearElement(qrContainer)
  qrContainer.appendChild(img)
}

function clearElement (element) {
  element.innerHTML = ''
}

function showNotification () {
  const element = document.createElement('div')
  element.className = 'w-full fixed bottom-0 left-0'

  element.innerHTML = `
  <div class=" w-full bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
    <p class="font-bold">inicio de sesión 👌</p>
    <p class="text-sm">ahora te redireccionaremos a tu espacio de trabajo.</p>
  </div>
  `
  document.body.appendChild(element)
}
