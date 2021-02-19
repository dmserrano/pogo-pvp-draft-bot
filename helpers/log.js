const format = require("date-fns/format");
const chalk = require("chalk");

const getTimestamp = () => format(new Date(), "MMM dd hh:mm:ss XXX");

const formatMessage = (message) => `[${getTimestamp()}] ${message}`;

const log = (message) => {
    // eslint-disable-next-line
    console.log(formatMessage(message));
};

const errorLog = (message) => {
    // eslint-disable-next-line
    console.error(
        chalk.red(formatMessage(message)),
    );
};

module.exports = {
    errorLog,
    log,
};
