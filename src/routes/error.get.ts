import Joi from "joi";
import { BadRequestError, InternalServerError } from "~/managers";
import { validate } from "~/middlewares";
import { APIHandler } from "~/utils/types";

export const SCHEMA = {
    query: {
        id: Joi.number().required(),
    },
};

export const preHandlers = [validate(SCHEMA)] as const;

// This is just an example, you can throw errors anywhere in your code,
// they will be catched by the error handler and returned to the client
export const handler: APIHandler<typeof preHandlers> = (req, res, next) => {
    if (req.query.id === 1) return res.json({ message: "This is a success" });
    else if (req.query.id === 400)
        throw new BadRequestError("This is a bad request");
    else if (req.query.id === 500)
        throw new InternalServerError("This is a server error");
    else throw new Error("This is an unknown error");
};
