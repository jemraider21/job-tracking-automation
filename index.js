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
    // Change the value inside for the text channel you want the bot to work in
    const textChannel = "bot-tester";

    if(msg.channel.name === textChannel){ 
        // Checks to see if the post was not made by the bot
        if(msg.author.username !== "job-tracker"){
            // Check to see if post has a url inside
            let msgText = discordHelper.cleanMsg(msg.content);
            if(msgText === false){
                console.log("This message does not have a link inside");
            } else {
                console.log(`Here is the link inside of the message: ${msgText}`);

                // Check to see if the url is in the spreadsheet, then display the result to the console and the discord channel
                let result = sheetsHelper.isLinkInSheets(msgText, dataArray);
                console.log(result.text);
                msg.reply(result.text);

                if(!result.isIn){
                    // Start web scrapping stuff
                }
            }
        }
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