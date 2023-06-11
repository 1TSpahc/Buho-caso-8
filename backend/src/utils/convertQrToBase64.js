/*
  // importamos la dependencia qrcode
  // creamos una funcion asincrona que recibe un qr
  // y retorna el qr convertido a base64
*/

const QRCode = require('qrcode')

async function convertQrToBase64 (qr) {
  return await QRCode.toDataURL(qr)
}

module.exports = { convertQrToBase64 }
