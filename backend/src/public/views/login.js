function viewLogin () {
  document.body.innerHTML = `
  <section class=" h-screen w-full flex  items-center justify-center gap-10">
  <div>
      <h1 class="text-[#000] text-4xl">Inicia sesion</h1>
      <ol class=" mt-2 ">
          <li class="text-[#000] text-2xl py-3">1. Abre whatsapp en tu celular.</li>
          <li class="text-[#000] text-2xl py-3">2. Click en los 3 puntos y selecciona dispositivos vinculados.
          </li>
          <li class="text-[#000] text-2xl py-3">3. Click en vincular un dispositivo.</li>
          <li class="text-[#000] text-2xl py-3">4. Escanee el código qr.</li>
      </ol>
  </div>
  <div class="w-[300px] h-[300px] rounded shadow-[#150f33] p-2 select-none flex items-center justify-center" id="qr-container">
      <div class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
          <span
              class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...
          </span>
      </div>
  </div>
</section>


<script src="/socket.io/socket.io.js"></script>
<script src="./js/socket/config/index.js"></script>
<script src="./js/socket/index.js"></script>
<script src="./js/utils/saveSession.js"></script>
<script src="./js/index.js"></script>
`
}
