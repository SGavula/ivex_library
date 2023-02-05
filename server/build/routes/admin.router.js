"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
const middlewares_1 = require("../middlewares");
require('dotenv').config({
    path: path_1.default.resolve(__dirname, '../../.env')
});
let prefix = '/admin';
exports.AdminRouter = express_1.default.Router();
exports.AdminRouter.post(`${prefix}`, (0, middlewares_1.AuthMiddleware)(['ADMIN']), validators_1.createAdminValidator, controllers_1.createAdmin);
exports.AdminRouter.put(`${prefix}/:admin_id`, (0, middlewares_1.AuthMiddleware)(['ADMIN']), validators_1.editAdminValidator, controllers_1.editAdmin);
exports.AdminRouter.get(`${prefix}/users`, (0, middlewares_1.AuthMiddleware)(['ADMIN']), controllers_1.getAllUsers);
exports.AdminRouter.get(`${prefix}/:admin_id`, (0, middlewares_1.AuthMiddleware)(['ADMIN']), validators_1.getAdminValidator, controllers_1.getAdmin);
exports.AdminRouter.post(`${prefix}/user/`, (0, middlewares_1.AuthMiddleware)(['ADMIN']), controllers_1.adminCreateUser);
//# sourceMappingURL=admin.router.js.map