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
      viewApp()

      setTimeout(() => {
        activeAppScripst()
      }, 3000)
    }, 5000)

    setTimeout(() => {
      activeAppScripst()
    }, 7000)
  }

  const isClosed = await closeSession()

  if (isClosed) {
    console.log('sesion cerrada')
    showNotification('success', 'Sesion cerrada')

    setTimeout(() => {
      window.location.href = 'https://google.com'
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

function activeAppScripst () {
  // variables
  const btnPrimary = document.getElementById('btn-primary')
  const btnSecondary = document.getElementById('btn-secondary')

  const modal = document.getElementById('modal')
  const btnActiveFlow = document.getElementById('btn-active-flow')

  const flujo = {
    triggers: [
      {
        keyword: 'hola',
        next: 'saludo'
      },
      {
        keyword: 'menú',
        next: 'ver_menu'
      },
      {
        keyword: 'pepperoni',
        next: 'confirmar_pepperoni'
      },
      {
        keyword: 'hawaiana',
        next: 'confirmar_hawaiana'
      },
      {
        keyword: 'si_hawaiana',
        next: 'comprar_hawaiana'
      },
      {
        keyword: 'si_pepperoni',
        next: 'comprar_pepperoni'
      },
      {
        keyword: 'cancelar',
        next: 'cancelar_pedido'
      }
    ],

    actions: {
      saludo: {
        message: '¡Hola! Bienvenido a la Pizzería Delicioso. escribe "menú" para ver nuestra carta.',
        next: null
      },
      ver_menu: {
        message: 'Nuestro menú incluye pizzas de pepperoni y hawaiana. ¿Qué tipo de pizza te gustaría ordenar?',
        next: null
      },
      confirmar_pepperoni: {
        message: '¿Estás seguro de que quieres ordenar una pizza de pepperoni? ¿Escriba "si_pepperoni" para confirmar o "cancelar" para cancelar el pedido.',
        next: null
      },
      confirmar_hawaiana: {
        message: '¿Estás seguro de que quieres ordenar una pizza hawaiana? ¿Escriba "si_hawaiana" para confirmar o "cancelar" para cancelar el pedido.',
        next: null
      },
      comprar_pepperoni: {
        message: '¡Excelente! Tu pedido de pizza de pepperoni está en camino.',
        next: null
      },

      comprar_hawaiana: {
        message: '¡Excelente! Tu pedido de pizza hawaiana está en camino.',
        next: null
      },
      cancelar_pedido: {
        message: '¡Pedido cancelado! Si necesitas algo más, no dudes en preguntar.',
        next: null
      }
    }
  }

  const flujoDos = {
    triggers: [
      {
        keyword: 'ping',
        next: 'pasoDos'
      }
    ],
    actions: {
      pasoDos: {
        message: 'pong',
        next: null
      }
    }
  }

  // functions
  function renderFlow (flujo) {
    const modalContent = document.getElementById('modal-content')
    const framgent = document.createDocumentFragment()

    modalContent.innerHTML = ''

    flujo.triggers.map((trigger) => {
      const div = document.createElement('div')
      div.classList.add('flex', 'justify-between', 'items-center', 'border-b', 'border-gray-200', 'py-2', 'gap-4')

      div.innerHTML = `
          <div class=" w-[50%] text-md text-white text-center bg-gradient-to-t from-stone-800 to-black/80 hover:bg-black transition duration-300 px-4 py-3 rounded-md shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20">${trigger.keyword}</div>
          <img src="https://static.thenounproject.com/png/1920988-200.png" class="w-[40px] user-select-none pointer-events-none" />
          <div class=" relative w-[50%] text-md text-white text-center bg-gradient-to-t from-stone-800 to-black/80 hover:bg-black transition duration-300 px-4 py-3 rounded-md shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20" id="flow-actions">
            ${trigger.next}
          <div class=" w-full h-full absolute left-0 top-0 bg-[#fafafa] text-black text-sm rounded flex items-center justify-center invisible opacity-0 duration-500" id="flow-actions-onhover">
            ${flujo.actions[trigger.next].message}
          </div>
          </div>
          `
      return framgent.appendChild(div)
    })

    modalContent.appendChild(framgent)
  }

  btnPrimary.addEventListener('click', () => {
    modal.classList.add('modal-active')
    renderFlow(flujo)

    btnActiveFlow.setAttribute('data-flow', 'flujo')
  })

  btnSecondary.addEventListener('click', () => {
    modal.classList.add('modal-active')
    renderFlow(flujoDos)

    btnActiveFlow.setAttribute('data-flow', 'flujo2')
  })

  modal.addEventListener('click', (event) => {
    if (event.target.id === 'modal') {
      modal.classList.remove('modal-active')
    }
  })

  btnActiveFlow.addEventListener('click', () => {
    const flowSelected = btnActiveFlow.getAttribute('data-flow')

    if (flowSelected === 'flujo') {
      socket.emit('initFlow', flujo)
    }

    if (flowSelected === 'flujo2') {
      socket.emit('initFlow', flujoDos)
    }
  })
}
