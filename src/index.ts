import { database_connect } from "~/utils/db";
import logger from "~/utils/logger";
import dotenv from "dotenv";
import app from "~/app";

// Initialise the config from .env
dotenv.config();
// Connect to the database
database_connect();

logger.info("API", "Initiating listening to the port...");
app.listen(process.env.PORT, () => {
    logger.success(
        "API",
        `API nest created and started listening to the specified port in the config`
    );
    logger.info(
        "API",
        `You can access the api on http://localhost:${process.env.PORT}${process.env.PREFIX}`
    );
    console.log("");
});
