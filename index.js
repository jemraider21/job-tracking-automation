const helper = require("./helper");
const Discord = require("discord.js");
const disClient = new Discord.Client;

const {google} = require('googleapis');
const keys = require("./gsheets-keys.json");
const sheetID = "1HXUE28xFrmh6EELEfZLj8F14ZQA1A7CdoudPEMbPU1k";

// Google Sheets information
const googleClient = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
);
const gsapi = google.sheets({version: "v4", auth: googleClient});
const opt= { spreadsheetId: sheetID, range: "Data!A2:F3"};
let data, dataArray;

/**
 * Discord Bot functions
 */

// Display the name of the bot to the console, as well as initialize retrieving data from the google sheets
disClient.on("ready", () => {
    console.log(`Logged in as ${disClient.user.tag}!`);
    googleClient.authorize((err, tokens) => {
        if(err){
            console.log(err);
        } else {
            gsrun();
        }
    });
});

disClient.on("message", msg => {
    // Check to see if post is a url
    let isMessageURL = helper.isURL(msg.content);
    if(isMessageURL){
        console.log("This is a url");
        helper.isLinkInSheets(msg, dataArray);
    } else {
        console.log("This is not a url");
    }
});

// disClient.login("token");
disClient.login(helper.token);











/**
 * Google Sheets functions
 */
async function gsrun(){ 
    data = await gsapi.spreadsheets.values.get(opt);
    dataArray = data.data.values;
}