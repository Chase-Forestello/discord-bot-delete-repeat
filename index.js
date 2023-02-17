// need to run this with Node.js, check dependencies. Using Discord.js version 12.3.1
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: Discord.Intents.ALL,
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  // If the message is sent by anyone other than the bot and is not empty, contains an embed, or is not sent by the targeted users, return.
  if (
    msg.author.id === "TARGET_ID" && // If the message is sent by this user ID
    !msg.content.includes("http") && // If the message is not a link
    msg.content !== "" && // If the message is not empty
    !msg.embeds[0] && // If the message is not an embed
    msg.author.id !== "BOT_ID" // If the message is sent by the bot
  ) {
    console.log("Message: " + msg.content);
    let savedMessage = msg.content;
    let letter_arr = savedMessage.split("");
    for (var i = 0; i < letter_arr.length; i += 2) {
      letter_arr[i] = letter_arr[i].toUpperCase();
    }
    let newMessage = letter_arr.join("");
    console.log(`New message: ${newMessage}`);
    msg.delete().then(() => {
      msg.channel.send(letter_arr.join(" ")).catch((error) => {
        console.log(error);
      });
    });
  } else if (msg.author.id === "BOT_ID") {
    // console.log("Message is from the bot"); // This is just for debugging
    return;
  } else {
    console.log(
      "Error: The message is empty, contains an embed, or is not sent by the targeted users"
    );
  }
});

client.login("BOT_TOKEN");
