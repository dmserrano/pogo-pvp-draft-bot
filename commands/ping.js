module.exports = {
    name: "ping",
    description: "Ping!",
    execute(message) {
        message.channel.send("Pong.");
    },
    cooldown: 5,
};
