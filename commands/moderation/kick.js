const { KICK_MEMEBERS } = require("../../constants/permissions");

module.exports = {
    name: "kick",
    description: "Tag a member and kick them (but not really).",
    // NOTE: guildOnly check is not implemented currently
    guildOnly: true,
    permissions: KICK_MEMEBERS,
    execute(message) {
        if (!message.mentions.users.size) {
            message.reply("you need to tag a user in order to kick them!");
            return;
        }

        const taggedUser = message.mentions.users.first();

        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    },
};
