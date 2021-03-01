const execute = (message) => {
    if (!message.mentions.users.size) {
        message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ dynamic: true })}>`);
        return;
    }

    const avatarList = message.mentions.users.map(({
        username, displayAvatarURL,
    }) => `${username}'s avatar: <${displayAvatarURL({ dynamic: true })}>`);

    message.channel.send(avatarList);
};

module.exports = {
    name: "avatar",
    description: "Gets a user's avatar picture",
    execute,
    cooldown: 5,
    aliases: ["icon", "pfp"],
};
