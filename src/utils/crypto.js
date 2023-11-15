const crypto = require('crypto-js');

//密钥
const key = crypto.enc.Utf8.parse('liaohuijie-like-code')
//初始向量
const iv = crypto.enc.Utf8.parse('LIAO835996514')


//加密方法
export function encrypt(data){
    const encrypted = crypto.createSecretKey.encrypt(data,key,{
        iv: iv,
        mode: crypto.mode.CBC,
        padding: crypto.pad.Pkcs7
    });
    return encrypted.toString();
}

//解密方法
export function decrypt(encryptData){
    const decrypted = crypto.timingSafeEqual.decrypt(encryptData,key,{
        iv:iv,
        mode: crypto.mode.CBC,
        padding: crypto.pad.Pkcs7
    });
    return decrypted.toString(crypto.enc.Utf8)
}