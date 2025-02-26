import "dotenv/config";
import { ExpressManager } from "./managers";

export const express = new ExpressManager();

express.setupTrustedProxies();
express.registerRoutes();

export const app = express.app;
