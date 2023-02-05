"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightRouter = void 0;
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers/");
const validators_1 = require("../validators/");
exports.HighlightRouter = express_1.default.Router();
const prefix = `/highlight`;
exports.HighlightRouter.post(`${prefix}/script/:script_id`, (0, middlewares_1.AuthMiddleware)(['ADMIN', 'USER']), validators_1.createHighlightValidator, controllers_1.createHighlight);
exports.HighlightRouter.get(`${prefix}/script/:script_id/user/:user_id`, (0, middlewares_1.AuthMiddleware)(['USER', 'ADMIN']), validators_1.gethighlightValidator, controllers_1.getHighlight);
exports.HighlightRouter.post(`${prefix}/script/:script_id/user/:user_id/config`, (0, middlewares_1.AuthMiddleware)(['ADMIN', 'USER']), validators_1.saveUserScriptPageValidator, controllers_1.saveUserScriptConfig);
exports.HighlightRouter.get(`${prefix}/script/:script_id/user/:user_id/config`, (0, middlewares_1.AuthMiddleware)(['ADMIN', 'USER']), validators_1.getUserScriptPageValidator, controllers_1.getUserScriptConfig);
//# sourceMappingURL=highlight.router.js.map