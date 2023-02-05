"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubRouter = exports.AnalyticsRouter = exports.PublisherRouter = exports.HighlightRouter = exports.AuthRouter = exports.UserRouter = void 0;
var User_router_1 = require("./User.router");
Object.defineProperty(exports, "UserRouter", { enumerable: true, get: function () { return User_router_1.UserRouter; } });
var Login_router_1 = require("./Login.router");
Object.defineProperty(exports, "AuthRouter", { enumerable: true, get: function () { return Login_router_1.AuthRouter; } });
var highlight_router_1 = require("./highlight.router");
Object.defineProperty(exports, "HighlightRouter", { enumerable: true, get: function () { return highlight_router_1.HighlightRouter; } });
var Publisher_router_1 = require("./Publisher.router");
Object.defineProperty(exports, "PublisherRouter", { enumerable: true, get: function () { return Publisher_router_1.PublisherRouter; } });
var Analytics_router_1 = require("./Analytics.router");
Object.defineProperty(exports, "AnalyticsRouter", { enumerable: true, get: function () { return Analytics_router_1.AnalyticsRouter; } });
var subscription_router_1 = require("./subscription.router");
Object.defineProperty(exports, "SubRouter", { enumerable: true, get: function () { return subscription_router_1.SubRouter; } });
//# sourceMappingURL=index.js.map