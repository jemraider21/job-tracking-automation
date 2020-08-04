const CryptoJS = require("crypto-js");
const aes = require("crypto-js/aes");
const lorem = require("./lorem");
const hashKey = getKey();

function getKey(){
    const indexes = [2291,3228,1617, 9689, 16094, 11034, 6459, 12723, 18674, 6386, 14439, 13116, 5237, 10630, 396, 18709];
    let key = "";
    for(let i = 0; i < 16; i++){
        let character = lorem.lorem.charAt(indexes[i]);
        key += character;
    }
    return key;
}

const decrypt = (data) => {
    // let bytes = CryptoJS.AES.decrypt(data, hashKey);
    let bytes = aes.decrypt(data, hashKey);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

const encrypt = (data) => CryptoJS.AES.encrypt(data, hashKey).toString();

exports.decrypt = decrypt;
exports.encrypt = encrypt;