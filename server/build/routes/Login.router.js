"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers/");
const auth_validator_1 = require("../validators/Auth/auth.validator");
exports.AuthRouter = express_1.default.Router();
const prefix = `/auth`;
exports.AuthRouter.post(`${prefix}/login`, auth_validator_1.loginValidator, controllers_1.login);
//# sourceMappingURL=Login.router.js.map