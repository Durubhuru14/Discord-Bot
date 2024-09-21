require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
//const deleteCommands = require("./utils/deleteCommands");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

eventHandler(client);

// Code for deleting all commands
//client.on("ready", async (client) => {
//  console.log(`Logged in as ${client.user.tag}`);
//  deleteCommands(client);
//});

client.login(process.env.TOKEN);
