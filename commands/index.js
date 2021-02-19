const argsInfo = require("./utility/args-info");
const avatar = require("./utility/avatar");
const help = require("./utility/help");
const kick = require("./moderation/kick");
const ping = require("./ping");

const commandMap = {
    [argsInfo.name]: argsInfo,
    [avatar.name]: avatar,
    [help.name]: help,
    [kick.name]: kick,
    [ping.name]: ping,
};

const getAllCommandNames = () => Object.keys(commandMap);

const getCommandByName = (commandName) => commandMap[commandName];

const getCommandByAlias = (commandName) => {
    const commandsWithAliases = Object.values(commandMap).filter(({ aliases }) => aliases);
    const alias = commandsWithAliases
        .find((command) => command.aliases.includes(commandName)) || false;
    return alias;
};

module.exports = {
    commandMap,
    getAllCommandNames,
    getCommandByAlias,
    getCommandByName,
};
