const Discord = require("discord.js");
const disClient = new Discord.Client;
const hash = require("./hashing-files/hashing");
const discordHelper = require("./helper-files/discord-helper");
const sheetsHelper = require("./helper-files/gsheets-helper");

let dataArray;

/**
 * Discord Bot functions
 */

// Display the name of the bot to the console, as well as initialize retrieving data from the google sheets
disClient.on("ready", () => {
    console.log(`Logged in as ${disClient.user.tag}!`);
    sheetsHelper.googleClient.authorize((err, tokens) => {
        if(err){
            console.log(err);
        } else {
            gsrun();
        }
    });
});

disClient.on("message", msg => {
    // Check to see if post is a url
    let isMessageURL = discordHelper.isURL(msg.content);
    if(isMessageURL){
        console.log("This is a url");
        sheetsHelper.isLinkInSheets(msg, dataArray);
    } else {
        console.log("This is not a url");
    }
});

disClient.login(hash.decrypt(discordHelper.token));

/**
 * Google Sheets functions
 */

//  Get data from google sheets
async function gsrun(){ 
    data = await sheetsHelper.gsapi.spreadsheets.values.get(sheetsHelper.opt);
    dataArray = data.data.values;
}