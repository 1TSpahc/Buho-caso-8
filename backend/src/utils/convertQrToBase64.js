const QRCode = require('qrcode')

async function convertQrToBase64 (qr) {
  return await QRCode.toDataURL(qr)
}

module.exports = { convertQrToBase64 }
