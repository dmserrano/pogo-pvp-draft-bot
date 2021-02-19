const { prefix } = require("../../config.json");
const { errorLog } = require("../../helpers/log");

const handleDisplayAllCommands = async (message, { getAllCommandNames }) => {
    const helpMessage = [
        `Here's a list of all my commands: ${getAllCommandNames().join(", ")}`,
        `You can send \`${prefix}help [command name]\` to get info on a specific command!`,
    ];

    try {
        await message.author.send(helpMessage, { split: true });
        if (message.channel.type === "dm") return;
        message.reply("I've sent you a DM with all my commands!");
    } catch (error) {
        errorLog(`Could not send help DM to ${message.author.tag}.\n`, error);
        message.reply("it seems like I can't DM you! Do you have DMs disabled?");
    }
};

const handleSingleHelpCommand = (
    message,
    args,
    { getCommandByAlias, getCommandByName },
) => {
    const [name] = args;
    const commandName = name.toLowerCase();
    const command = getCommandByName(commandName) || getCommandByAlias(commandName);

    if (!command) {
        message.reply("That's not a valid command!");
        return;
    }

    const messages = [];
    messages.push(`**Name:** ${command.name}`);

    if (command.aliases) messages.push(`**Aliases:** ${command.aliases.join(", ")}`);
    if (command.description) messages.push(`**Description:** ${command.description}`);
    if (command.usage) messages.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

    messages.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    message.channel.send(messages, { split: true });
};

const execute = (
    message,
    args,
    options,
) => {
    if (!args.length) {
        handleDisplayAllCommands(message, options);
        return;
    }

    handleSingleHelpCommand(message, args, options);
};

module.exports = {
    name: "help",
    description: "List all of my commands or info about a specific command.",
    aliases: ["commands"],
    usage: "[command name]",
    cooldown: 5,
    execute,
};
