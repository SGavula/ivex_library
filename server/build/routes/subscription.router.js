"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubRouter = void 0;
const Subscription_controller_1 = require("../controllers/Subscription.controller");
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers/");
const middlewares_1 = require("../middlewares");
exports.SubRouter = express_1.default.Router();
const prefix = `/webhook`;
exports.SubRouter.post(`${prefix}`, express_1.default.raw({ type: 'application/json' }), controllers_1.Webhook);
exports.SubRouter.delete(`/subscription/delete/:user_id`, (0, middlewares_1.AuthMiddleware)(['ADMIN', 'USER']), Subscription_controller_1.cancelSubscription);
exports.SubRouter.put(`/subscription/renew/:user_id`, (0, middlewares_1.AuthMiddleware)(['ADMIN', 'USER']), Subscription_controller_1.renewSubscription);
exports.SubRouter.put('/subscription/change/:user_id', (0, middlewares_1.AuthMiddleware)(['ADMIN', 'USER']), Subscription_controller_1.changeSubscription);
//# sourceMappingURL=subscription.router.js.map