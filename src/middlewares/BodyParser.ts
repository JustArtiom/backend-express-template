import { APIHandler } from "~/utils/types"; // Assuming `ApiHandler` is your custom type (e.g., `(req, res, next) => void`)
import { Request, Response, NextFunction } from "express";
import { BadRequestError, UnprocessableEntityError } from "~/managers";
import multer from "multer";

const upload = multer();

export const BodyParser: APIHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const contentType = req.headers["content-type"];

    if (!contentType) return next();

    if (contentType.includes("application/json")) {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                req.body = JSON.parse(body);
                next();
            } catch (err) {
                next(new BadRequestError("Invalid JSON payload."));
            }
        });
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const parsedBody = new URLSearchParams(body);
            req.body = Object.fromEntries(parsedBody.entries());
            next();
        });
    } else if (contentType.includes("multipart/form-data")) {
        upload.any()(req, res, (err: any) => {
            if (err) {
                return next(new BadRequestError("Invalid form-data payload."));
            }

            next();
        });
    } else {
        throw new UnprocessableEntityError(
            "Unsupported Content-Type. Only JSON and URL-encoded formats are allowed."
        );
    }
};

export default BodyParser;
