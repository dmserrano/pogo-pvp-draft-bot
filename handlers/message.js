const Discord = require("discord.js");
const { prefix } = require("../config.json");
const {
    getCommandByAlias,
    getCommandByName,
    getAllCommandNames,
} = require("../commands");
const { errorLog } = require("../helpers/log");

const cooldowns = new Discord.Collection();

const handleArgsValidation = (message, command) => {
    let reply = "You didn't provide any arguments!";

    if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
    message.channel.send(reply);
};

const handleCooldownValidation = (message, command) => {
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            return true;
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    return false;
};

const handlePermissionsValidation = (message, command) => {
    // NOTE: message.channel.permissionsFor does not exist for all channels
    if (command.permissions && message.channel.permissionsFor) {
        const authorPerms = message.channel.permissionsFor(message.author);

        if (!authorPerms || !authorPerms.has(command.permissions)) {
            message.reply("You do not have permissions for this command");
            return false;
        }
    }

    return true;
};

const parseArgs = (message) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    return [args, commandName];
};

module.exports = (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const [args, commandName] = parseArgs(message);
    const command = getCommandByName(commandName) || getCommandByAlias(commandName);

    if (!command) return;

    if (command.guildOnly && message.channel.type === "dm") {
        message.reply("I can't execute that command inside DMs!");
        return;
    }

    const authorHasPermissions = handlePermissionsValidation(message, command);
    if (!authorHasPermissions) {
        return;
    }

    const userHasActiveCooldown = handleCooldownValidation(message, command);
    if (userHasActiveCooldown) {
        return;
    }

    if (command.args && !args.length) {
        handleArgsValidation(message, command);
        return;
    }

    try {
        const options = {
            command, getCommandByAlias, getCommandByName, getAllCommandNames,
        };
        command.execute(message, args, options);
    } catch (error) {
        errorLog(error);
        message.reply("There was an error trying to execute that command!");
    }
};
