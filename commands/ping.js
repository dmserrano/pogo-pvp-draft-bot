module.exports = {
    name: "ping",
    description: "Ping!",
    execute(message) {
        const latency = Date.now() - message.createdTimestamp;
        const apiLatency = Math.round(message.client.ws.ping);

        message.channel.send(
            `🏓 Latency is ${latency}ms. API Latency is ${apiLatency}ms`,
        );
    },
    cooldown: 5,
};
