const { prefix } = require("../config.json");
const commandMap = require("../commands");
const { errorLog } = require("../helpers/log");

module.exports = (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!commandMap[command]) return;

    try {
        commandMap[command].execute(message, args);
    } catch (error) {
        errorLog(error);
        message.reply("There was an error trying to execute that command!");
    }
};
