const {google} = require('googleapis');
const keys = require("../gsheets-keys.json");
const hash = require("../hashing");


const sheetID = "U2FsdGVkX1/W1qKj+/B5Vu61PduxhtXOOj6BqSZcHS6JS8Cbmdql3rHMQ7smi3IaxoZ15gZVDQ0yeMICko2keA=="; // Hashed, needs to be decrypted
const googleClient = new google.auth.JWT(
    hash.decrypt(keys.client_email),
    null,
    hash.decrypt(keys.private_key),
    ["https://www.googleapis.com/auth/spreadsheets"]
);
const gsapi = google.sheets({version: "v4", auth: googleClient});
const opt= { spreadsheetId: hash.decrypt(sheetID), range: "Data!A2:F3"};



// Checks to see if the link posted to Discord matches one in the Google Sheets file
const isLinkInSheets = (msg, rows) =>{
    let isInSheets = false;
    rows.forEach(row => {
        const content = msg.content;
        const link = row[4];
        if(content.includes(link)){
            isInSheets = true;
        }
    });
    if(isInSheets){
        console.log("This application was already submitted before");
    } else {
        console.log("This application was not submitted before. Adding to the Google Sheets");
    }
}

exports.googleClient = googleClient;
exports.gsapi = gsapi;
exports.opt = opt;
exports.isLinkInSheets = isLinkInSheets;