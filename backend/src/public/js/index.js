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
    showNotification('success', 'Ya iniciaste sesión en whatsapp! ahora te redireccionaremos a la página principal')

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

function showNotification (variant, message) {
  let bgColor

  if (variant === 'success') bgColor = 'bg-green-500'
  if (variant === 'danger') bgColor = 'bg-red-500'
  if (variant === 'info') bgColor = 'bg-blue-500'

  const element = document.createElement('div')
  element.className = `max-w-xs rounded-md ${bgColor} text-sm text-white shadow-lg fixed bottom-5 right-4`

  element.innerHTML = `
  <div class="p-4 text-white">${message}</div>
  `
  document.body.appendChild(element)
}
