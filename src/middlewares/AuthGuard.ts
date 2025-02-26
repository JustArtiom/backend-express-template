// This is a template

import { NextFunction, Request, Response } from "express";
import { ForbiddenError, UnauthorizedError } from "~/managers/ErrorManager";

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

export const AuthGuard =
    <Opt extends boolean = false>(opts?: {
        optional: Opt; // If authorization is optional, user will be null if not authorized
        filter: (
            req: Request<any, any, any, any> & {
                user: Opt extends true ? User | null : User;
            }
        ) => boolean;
    }) =>
    async (
        req: Request<unknown, unknown, unknown, unknown> & {
            user: Opt extends true ? User | null : User;
        },
        res: Response,
        next: NextFunction
    ) => {
        const auth_header = req.headers.authorization;

        if (!auth_header) {
            throw new UnauthorizedError("Missing authorization header");
        }

        const typetoken = auth_header.split(" ");
        if (typetoken.length != 2) {
            throw new UnauthorizedError("Invalid authorization header");
        }

        const [type, token] = typetoken;
        if (type !== "Bearer") {
            throw new UnauthorizedError("Invalid token type");
        }

        const user_id = tokenToUserID(token);
        if (!user_id) {
            throw new UnauthorizedError("Invalid token");
        }

        const user = await findUserById(user_id);
        if (!user || !(await checkUserToken(token))) {
            throw new UnauthorizedError("Invalid token");
        }

        req.user = user;
        if (opts?.filter && !opts.filter(req)) throw new ForbiddenError();

        next();
    };

function tokenToUserID(token: string): number | null {
    return null;
}

async function findUserById(user_id: number): Promise<User | null> {
    return null;
}

async function checkUserToken(token: string): Promise<boolean> {
    return false;
}
