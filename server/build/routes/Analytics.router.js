"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsRouter = void 0;
const express_1 = __importDefault(require("express"));
const validators_1 = require("../validators");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers/");
exports.AnalyticsRouter = express_1.default.Router();
const prefix = `/analytics`;
exports.AnalyticsRouter.post(`${prefix}`, (0, middlewares_1.AuthMiddleware)(['ADMIN', 'USER']), validators_1.createAnalyticsEntryValidator, controllers_1.createAnalyticsEntry);
exports.AnalyticsRouter.post(`${prefix}/script/:script_id`, validators_1.createScriptAnalyticsEntryValidator, controllers_1.CreateScriptAnalyticsEntry);
exports.AnalyticsRouter.get(`${prefix}/publisher/:publisher_id/script/:script_id/`, (0, middlewares_1.AuthMiddleware)(['ADMIN', 'PUBLISHER']), controllers_1.getAnalyticsForPublisher);
exports.AnalyticsRouter.get(`${prefix}/publisher/:publisher_id/month/:month_num/pay`, (0, middlewares_1.AuthMiddleware)(['ADMIN', 'PUBLISHER']), controllers_1.getPublisherPayFromAnalytics);
exports.AnalyticsRouter.get(`${prefix}/publisher/:publisher_id/months/pay`, (0, middlewares_1.AuthMiddleware)(['ADMIN', 'PUBLISHER']), controllers_1.getPublisherPayForMonths);
exports.AnalyticsRouter.get(`${prefix}/publisher/:publisher_id/views/`, (0, middlewares_1.AuthMiddleware)(['ADMIN', 'PUBLISHER']), controllers_1.getPublisherAllTimeViews);
exports.AnalyticsRouter.get(`${prefix}/admin/views/:type`, (0, middlewares_1.AuthMiddleware)(['ADMIN']), controllers_1.getAdminTotalViews);
exports.AnalyticsRouter.get(`${prefix}/admin/payments/:type`, (0, middlewares_1.AuthMiddleware)(['ADMIN']), controllers_1.getAdminTotalPayments);
exports.AnalyticsRouter.get(`${prefix}/admin/profits/:type`, controllers_1.getAdminTotalProfits);
//# sourceMappingURL=Analytics.router.js.map