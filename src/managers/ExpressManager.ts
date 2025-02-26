import express, { Express } from "express";
import { FileRouter } from "~/managers";
import { BodyParser, ErrorHandler } from "~/middlewares";
import "express-async-errors";

export class ExpressManager {
    app: Express;
    fileRouter: FileRouter;

    constructor() {
        this.app = express();
        this.fileRouter = new FileRouter("dist/routes");
    }

    setupTrustedProxies(proxies?: string) {
        const _proxies = proxies || process.env.TRUSTED_PROXIES;
        const TRUSTED_PROXIES = !_proxies?.includes("*")
            ? _proxies?.split(",")
            : "*";

        this.app.set("trust proxy", TRUSTED_PROXIES);
    }

    registerRoutes = () => {
        const endpoints = this.fileRouter.build().sort().getEndpoints();

        this.app.use(BodyParser);

        for (let endpoint of endpoints) {
            console.log(
                `Express > Registering ${endpoint.method.toUpperCase()} ${endpoint.route}`
            );

            this.app[endpoint.method](
                endpoint.route,
                ...endpoint.preHandlers,
                endpoint.handler
            );
        }

        this.app.use(ErrorHandler);
    };
}

export default ExpressManager;
