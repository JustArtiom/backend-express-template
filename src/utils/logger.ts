import chalk from "chalk";

function logWithSymbol(
    symbol: string,
    message: string,
    color: (message: string) => string = (m) => m
): void {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    const logMessage = `${color(formattedDate + " " + symbol)}  > ${message}`;

    console.log(logMessage);
}

const logger = {
    info: (message: string): void => {
        logWithSymbol(" ⓘ ", message, chalk.blue.bold);
    },
    error: (message: string): void => {
        logWithSymbol(" ✖ ", message, chalk.red.bold);
    },
    warn: (message: string): void => {
        logWithSymbol(" ⚠ ", message, chalk.yellow.bold);
    },
    success: (message: string): void => {
        logWithSymbol(" ✔ ", message, chalk.green.bold);
    },
    debug: (message: string): void => {
        logWithSymbol(" ↺ ", message, chalk.gray.bold);
    },
    crit: (message: string): void => {
        logWithSymbol(" ☢ ", message, chalk.redBright);
    },
    user: (
        who: string,
        message: string,
        color?: "green" | "red" | "yellow" | "blue" | "gray" | "redBright"
    ) => {
        logWithSymbol(
            ` [ ${who} ]`,
            message,
            color ? chalk[color].bold : undefined
        );
    },
};

export default logger;
