const Discord = require("discord.js");
const dotenv = require("dotenv");

const { MESSAGE, READY } = require("./constants/discordEvents");
const handlers = require("./handlers/index");

dotenv.config();

const client = new Discord.Client();

client.once(READY, handlers.ready);

client.on(MESSAGE, handlers.message);

client.login(process.env.BOT_TOKEN);
