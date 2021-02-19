const { errorLog } = require("../../helpers/log");

module.exports = {
    name: "prune",
    description: "Prune up to 99 messages.",
    args: true,
    execute: async (message, args) => {
        const amount = parseInt(args[0], 10) + 1;

        if (Number.isNaN(amount)) {
            message.reply("that doesn't seem to be a valid number.");
            return;
        } if (amount <= 1 || amount > 100) {
            message.reply("You need to input a number between 1 and 99.");
            return;
        }

        try {
            await message.channel.bulkDelete(amount, true);
        } catch (error) {
            errorLog(error);
            message.channel.send(
                "There was an error trying to prune messages in this channel!",
            );
        }
    },
};
