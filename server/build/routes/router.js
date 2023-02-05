"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const _1 = require("./");
const path_1 = __importDefault(require("path"));
const scripts_router_1 = require("./scripts.router");
const admin_router_1 = require("./admin.router");
const Analytics_router_1 = require("./Analytics.router");
const Cateogies_router_1 = require("./Cateogies.router");
const subscription_router_1 = require("./subscription.router");
require('dotenv').config({
    path: path_1.default.resolve(__dirname, '../../.env')
});
const APP_ENVIRONMENT = process.env.APP_ENVIRONMENT;
let prefix;
if (APP_ENVIRONMENT === 'development')
    prefix = '/api';
else if (APP_ENVIRONMENT === 'production')
    prefix = '';
else
    prefix = '/api';
app_1.app.use(`${prefix}`, _1.UserRouter);
app_1.app.use(`${prefix}`, _1.AuthRouter);
app_1.app.use(`${prefix}`, _1.HighlightRouter);
app_1.app.use(`${prefix}`, scripts_router_1.ScriptRouter);
app_1.app.use(`${prefix}`, _1.PublisherRouter);
app_1.app.use(`${prefix}`, admin_router_1.AdminRouter);
app_1.app.use(`${prefix}`, Analytics_router_1.AnalyticsRouter);
app_1.app.use(`${prefix}`, Cateogies_router_1.CategoryRouter);
app_1.app.use(`${prefix}`, subscription_router_1.SubRouter);
exports.default = app_1.app;
//# sourceMappingURL=router.js.map