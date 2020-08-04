// Bot token to connect to server, hashed

const { kgsearch } = require("googleapis/build/src/apis/kgsearch");

// NOTE: After each commit to GitHub, the token gets reset, so you need to get a new token from here: https://discord.com/developers/applications/739171764046790788/bot
const token = "U2FsdGVkX1/ULI7nyzRbqxBW3U+XLO3qjlrA0KXsPnEF12HjcEhQQvuCtUtmS6DnFmT5ahacN6rSekKGhMsPp2oGuC/qZlRDs0J8WlHfT5I="; 

// Checks the post to see if it is a url. Return true if post is a url, return false if post is not a url
const isURL = (str) => {
    let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
}

// Taking in the message, check to see if a url is available. If it is, return it
const cleanMsg = (data) => {
    const urlBegin = "https://"; // 8 characters
    let indexes = [];
    
    for(let i = 0; i < data.length; i++){
        indexes = []; // Clear the array of any previous values
        indexes.push(i);
        for(j = i+1; j <= i+7; j++){
            indexes.push(j);
        }

        let msgBegin = "";
        indexes.forEach(index => {
            msgBegin += data[index];
        });

        if(msgBegin === urlBegin){
            // msg = msg.substr(i, msg.length).strip
            data = data.substr(i, data.length)
            return data;
        }
    }
    return false;
}

exports.token = token;
exports.isURL = isURL;
exports.cleanMsg = cleanMsg;