import { AuthGuard } from "~/middlewares/AuthGuard";
import { APIHandler } from "~/utils/types";

export const preHandlers = [AuthGuard()] as const;

export const handler: APIHandler<typeof preHandlers> = (req, res, next) => {
    req.user; // This will be available because of the AuthGuard middleware
    res.send(req.user);
};
