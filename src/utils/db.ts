import { setTimeout as wait } from "node:timers/promises";
import { Prisma, PrismaClient } from "@prisma/client";
import logger from "./logger";

const prisma = new PrismaClient({
    log: [{ level: "error", emit: "event" }],
});

export const database_connect = () => {
    prisma
        .$connect()
        .then(() => {
            logger.success("DB", "Connected to the database");
        })
        .catch(async () => {
            logger.error("DB", "Error connecting to the database");
            await wait(1000);
            logger.info("DB", "Retrying to connect to the database . . .");
            prisma.$disconnect().then(database_connect).catch(database_connect);
        });
};

export const isUniqueConstantViolation = (e: any): boolean | null => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") return true;
        else return false;
    } else return null;
};

export default prisma;
