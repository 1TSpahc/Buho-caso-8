// variables
const btnPrimary = document.getElementById('btn-primary')
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
      message: '¿Estás seguro de que quieres ordenar una pizza de pepperoni? ¿Escriba "si_pepperoni" para confirmar o "cancelar" para cancelar el pedido.'
    },
    confirmar_hawaiana: {
      message: '¿Estás seguro de que quieres ordenar una pizza hawaiana? ¿Escriba "si_hawaiana" para confirmar o "cancelar" para cancelar el pedido.'
    },
    comprar_pepperoni: {
      message: '¡Excelente! Tu pedido de pizza de pepperoni está en camino.'
    },

    comprar_hawaiana: {
      message: '¡Excelente! Tu pedido de pizza hawaiana está en camino.'
    },
    cancelar_pedido: {
      message: '¡Pedido cancelado! Si necesitas algo más, no dudes en preguntar.',
      next: null
    }
  }
}

// eventos
window.addEventListener('load', async () => {
  const isLogged = localStorage.getItem('session')

  if (isLogged !== sessionId) {
    window.location.href = '../../../index.html'
    return
  }

  const isClosed = await closeSession()

  if (isClosed) {
    // window.location.href = '../../../index.html'
    console.log(isClosed)
    console.log('sesion cerrada')
  }
})

btnPrimary.addEventListener('click', () => {
  modal.classList.add('modal-active')
  renderFlow()
})

modal.addEventListener('click', (event) => {
  if (event.target.id === 'modal') {
    modal.classList.remove('modal-active')
  }
})

btnActiveFlow.addEventListener('click', () => {
  socket.emit('initFlow', flujo)
  // console.log('click')
  // initializeFlow(flujo)

  // console.log(initializeFlow)
})
// funciones

function renderFlow () {
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
