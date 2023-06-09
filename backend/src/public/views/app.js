function viewApp () {
  document.body.innerHTML = `
  <section class="py-3 flex flex-col items-center justify-start gap-10 h-screen">
        <h1 class="text-center text-3xl">Configura tu bot 🤖</h1>
        <button
            class="text-md text-white bg-gradient-to-t from-stone-800 to-black/80 hover:bg-black transition duration-300 px-4 py-3 rounded-md shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20">Crear
            flujo</button>
    </section>

    <section class=" w-full fixed bottom-0">
        <h1 class="text-left text-2xl">Utiliza algunas plantillas 👇</h1>

        <div class="left-0 flex gap-4 py-3">
            <button id="btn-primary"
                class=" text-md text-white bg-gradient-to-t from-stone-800 to-black/80 hover:bg-black transition duration-300 px-4 py-3 rounded-md shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20"
                data-id="pizza">Pizzería
            </button>

            <button id="btn-secondary"
            class=" text-md text-white bg-gradient-to-t from-stone-800 to-black/80 hover:bg-black transition duration-300 px-4 py-3 rounded-md shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20"
            data-id="pizza">Restaurante
            </button>
           
            <button
                class=" cursor-not-allowed text-md text-white bg-gradient-to-t from-stone-800 to-black/80 opacity-90 transition duration-300 px-4 py-3 rounded-md shadow-lg shadow-stone-400/10 ">Mecanico</button>
            <button
                class=" cursor-not-allowed text-md text-white bg-gradient-to-t from-stone-800 to-black/80 opacity-90 transition duration-300 px-4 py-3 rounded-md shadow-lg shadow-stone-400/10 ">Abarrotes</button>
            <button
                class=" cursor-not-allowed text-md text-white bg-gradient-to-t from-stone-800 to-black/80 opacity-90 transition duration-300 px-4 py-3 rounded-md shadow-lg shadow-stone-400/10 ">Atencion
                al cliente</button>
        </div>

        <!-- modal usar template -->

        <section class="modal" id="modal">
            <div class="flex gap-4 w-[70%]">
                <div class=" w-[50%] text-md text-white text-center bg-gradient-to-t from-stone-800 to-black/80 hover:bg-black transition duration-300 px-4 py-3 rounded-md shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20">
                    Accion que activa al bot
                </div>
                <img src="https://static.thenounproject.com/png/1920988-200.png"
                    class="w-[40px] user-select-none pointer-events-none" />
                <div class=" w-[50%] text-md text-white text-center bg-gradient-to-t from-stone-800 to-black/80 hover:bg-black transition duration-300 px-4 py-3 rounded-md shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20">
                    Respuesta del bot</div>
            </div>
            
            <div id="modal-content" class=" w-[70%]"></div>
            <button class=" text-md text-white bg-gradient-to-t from-stone-800 to-black/80 hover:bg-black transition duration-300 px-4 py-3 rounded-md shadow-lg shadow-stone-400/10 hover:shadow-stone-400/20" id="btn-active-flow">Usar este template</button>
        </section>
    </section>
`
}
/*
<script src="/socket.io/socket.io.js"></script>
    <script src="./js/socket/config/index.js"></script>
    <script src="./js/socket/index.js"></script>
    <script src="./js/utils/saveSession.js"></script>
    <script src="./js/index.js"></script>
*/
