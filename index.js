// need to run this with Node.js, check dependencies. Using Discord.js version 12.3.1

// require the discord.js module
const Discord = require("discord.js");
// create a new Discord client
const client = new Discord.Client({
  intents: Discord.Intents.ALL,
});

// when the client is ready, run this code
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// listen for messages
client.on("message", (msg) => {
  if (
    msg.author.id === "TARGET_ID" && // If the message is sent by this user ID
    !msg.content.includes("http") && // If the message is not a link
    msg.content !== "" && // If the message is not empty
    !msg.embeds[0] && // If the message is not an embed
    msg.author.id !== "BOT_ID" // If the message is not sent by the bot
  ) {
    // log the message
    console.log("Message: " + msg.content);
    let savedMessage = msg.content;
    // split the message into an array of letters
    // loop through the array and capitalize every other letter
    let letter_arr = savedMessage.split("");
    for (var i = 0; i < letter_arr.length; i += 2) {
      letter_arr[i] = letter_arr[i].toUpperCase();
    }
    let newMessage = letter_arr.join("");
    // log the new message
    console.log(`New message: ${newMessage}`);
    // delete the original message
    // send the new message
    // catch any errors
    msg.delete().then(() => {
      msg.channel.send(letter_arr.join(" ")).catch((error) => {
        console.log(error);
      });
    });
  } else if (msg.author.id === "BOT_ID") {
    // console.log("Message is from the bot"); // This is just for debugging
    return;
    // log error if the message is empty, contains an embed, or is not sent by the targeted users
  } else {
    console.log(
      "Error? The message is empty, contains an embed, or is not sent by the targeted users but still fired the event?"
    );
  }
});

client.login("BOT_TOKEN");
