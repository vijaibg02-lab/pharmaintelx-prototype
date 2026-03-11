import CryptoJS from "crypto-js"

export function encrypt(data: string) {
  return CryptoJS.AES.encrypt(data, "secretkey").toString()
}
