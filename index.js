const helper = require("./helper");
const Discord = require("discord.js");
const client = new Discord.Client;

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
    // Check to see if post is a url
    let isMessageURL = helper.isURL(msg.content);
    if(isMessageURL){
        console.log("This is a url");
    } else {
        console.log("This is not a url");
    }
});

// client.login("token");
client.login(helper.token);