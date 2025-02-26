import { NextFunction, Request, Response } from "express";
import { APIError } from "~/managers/ErrorManager";

export const ErrorHandler = (
    err: Error,
    _: Request,
    res: Response,
    __: NextFunction
) => {
    if (err instanceof APIError) {
        const { statusCode, error, logging } = err;

        if (logging) {
            console.error(
                JSON.stringify(
                    {
                        code: err.statusCode,
                        error: err.error,
                        stack: err.stack,
                    },
                    null,
                    2
                )
            );
        }

        res.status(statusCode).send({ error });
        return;
    }

    console.error("Unhandled Error.", err);
    res.status(500).send({ errors: { message: "Something went wrong" } });
};

export default ErrorHandler;
