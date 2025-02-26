import Joi from "joi";
import { validate } from "~/middlewares";
import { APIHandler } from "~/utils/types";

export const SCHEMA = {
    params: {
        dynamic: Joi.string().required(),
    },
};

export const preHandlers = [validate(SCHEMA)] as const;

// This is an example of dynamic routing
// The value of req.params.dynamic will be the value of the dynamic part of the route
// For example, if the route is /test/hello, req.params.dynamic will be "hello"
export const handler: APIHandler<typeof preHandlers> = (req, res, next) => {
    res.send({ message: `Hello ${req.params.dynamic}` });
};
