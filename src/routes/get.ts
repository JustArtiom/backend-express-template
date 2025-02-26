import { APIHandler } from "~/utils/types";

// Export the handler
export const handler: APIHandler = (req, res, next) => {
    res.send({ message: "Hello world" });
};
