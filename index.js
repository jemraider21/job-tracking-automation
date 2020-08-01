const helper = require("./helper");
const Discord = require("discord.js");
const client = new Discord.Client;

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
    // if(msg.content === "ping"){
    //     msg.reply("pong");
    // }
    let isMessageURL = helper.isURL(msg.content);
    if(isMessageURL){
        console.log("This is a url");
    } else {
        console.log("This is not a url");
    }
    // console.log(msg.content);
});

// client.login("token");
client.login(helper.token);