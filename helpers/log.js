const format = require("date-fns/format");
const chalk = require("chalk");

const { NODE_ENV } = process.env;
const { PRODUCTION } = require("../constants/environments");

const getTimestamp = () => format(new Date(), "MMM dd hh:mm:ss XXX");

const formatMessage = (message) => `[${getTimestamp()}] ${message}`;

const log = (message) => {
    // eslint-disable-next-line
    console.log(formatMessage(message));
};

const errorLog = (error) => {
    // eslint-disable-next-line
    console.error(
        chalk.red(formatMessage(error)),
    );

    if (error.stack && NODE_ENV !== PRODUCTION) {
        // eslint-disable-next-line
        console.error(error.stack);
    }
};

module.exports = {
    errorLog,
    log,
};
