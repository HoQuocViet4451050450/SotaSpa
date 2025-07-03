const CryptoJS = require("crypto-js");
const SECRET = "sotaspa_secret"; // có thể để trong .env

// Mã hóa ID thật thành chuỗi khó đoán
function encodeId(id) {
  return CryptoJS.AES.encrypt(id.toString(), SECRET).toString();
}

// Giải mã chuỗi về ID thật
function decodeId(encoded) {
  const bytes = CryptoJS.AES.decrypt(encoded, SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = { encodeId, decodeId };
