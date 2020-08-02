// Bot token to connect to server
// NOTE: After each commit to GitHub, the token gets reset, so you need to get a new token from here: https://discord.com/developers/applications/739171764046790788/bot
const token = "NzM5MTcxNzY0MDQ2NzkwNzg4.XyWlWQ.vIaKeVTydgcsFdMgKHBTex5NstM";

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

// Eports
exports.token = token;
exports.isURL = isURL;
exports.isLinkInSheets = isLinkInSheets;