const {google} = require('googleapis');
const keys = require("../JSON-files/gsheets-keys.json");
const hash = require("../hashing-files/hashing");


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
    let result = {
        isIn: isInSheets,
        text: ""
    };
    rows.forEach(row => {
        const link = row[4];
        if(msg.includes(link)){
            isInSheets = true;
        }
    });
    if(isInSheets){
        result.isIn = isInSheets;
        result.text = "This application was already submitted before";
    } else {
        result.isIn = isInSheets;
        result.text = "This application was not submitted before. Adding to the Google Sheets";
    }
    return result;
}

exports.googleClient = googleClient;
exports.gsapi = gsapi;
exports.opt = opt;
exports.isLinkInSheets = isLinkInSheets;