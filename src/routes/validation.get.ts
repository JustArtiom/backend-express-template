import Joi from "joi";
import { BadRequestError, InternalServerError } from "~/managers";
import { validate } from "~/middlewares";
import { APIHandler } from "~/utils/types";

// Create a schema object to validate the request body
export const SCHEMA = {
    query: {
        id: Joi.number().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        confirmPassword: Joi.ref("password"),
        age: Joi.number().min(18).max(99).required(),
    },
};

// Export the preHandlers and the handler
export const preHandlers = [validate(SCHEMA)] as const;

export const handler: APIHandler<typeof preHandlers> = (req, res, next) => {
    res.json({ message: "This is a success" });
};
