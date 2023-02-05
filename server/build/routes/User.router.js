"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
const middlewares_1 = require("../middlewares");
require('dotenv').config({
    path: path_1.default.resolve(__dirname, '../../.env')
});
let prefix = '/user';
exports.UserRouter = express_1.default.Router();
exports.UserRouter.post(`${prefix}`, validators_1.createUserValidator, controllers_1.createUser);
exports.UserRouter.post(`${prefix}/verification/:token`, validators_1.userVerificationValidator, controllers_1.userVerification);
exports.UserRouter.post(`${prefix}/forgotten-password/`, validators_1.userForgottenPasswordValidator, controllers_1.userForgottenPassword);
exports.UserRouter.post(`${prefix}/password-reset-by-token`, validators_1.passwordByTokenResetValidator, controllers_1.passwordByTokenReset);
exports.UserRouter.get(`${prefix}/:user_id/script/:script_id/favorites`, (0, middlewares_1.AuthMiddleware)(['USER', 'ADMIN']), middlewares_1.UserProfileMiddleware, validators_1.getFavoriteScript, controllers_1.isFavorite);
exports.UserRouter.get(`${prefix}/:user_id`, (0, middlewares_1.AuthMiddleware)(['USER', 'ADMIN']), validators_1.getUserValidator, controllers_1.getUser);
exports.UserRouter.put(`${prefix}/:user_id`, (0, middlewares_1.AuthMiddleware)(['USER', 'ADMIN']), middlewares_1.UserProfileMiddleware, validators_1.editUserValidator, controllers_1.editUser);
exports.UserRouter.put(`${prefix}/:user_id/password`, (0, middlewares_1.AuthMiddleware)(['USER', 'ADMIN']), middlewares_1.UserProfileMiddleware, validators_1.editUserPasswordValidator, controllers_1.editUserPassword);
exports.UserRouter.put(`${prefix}/:user_id/scriptdata`, (0, middlewares_1.AuthMiddleware)(['USER', 'ADMIN']), middlewares_1.UserProfileMiddleware, validators_1.editUserScriptDataValidator, controllers_1.editUserScriptData);
exports.UserRouter.delete(`${prefix}/:user_id`, (0, middlewares_1.AuthMiddleware)(['ADMIN']), middlewares_1.UserProfileMiddleware, validators_1.deleteUserValidator, controllers_1.deleteUser);
exports.UserRouter.delete(`${prefix}/:user_id/script/:script_id/favorites`, (0, middlewares_1.AuthMiddleware)(['USER', 'ADMIN']), middlewares_1.UserProfileMiddleware, validators_1.unfavoriteScriptValidator, controllers_1.unfavoriteScript);
exports.UserRouter.post(`/contact`, validators_1.sendContactEmailValidator, controllers_1.sendContactEmail);
exports.UserRouter.put(`${prefix}/unsubcribe-emails/:token`, controllers_1.unsubscribeFromEmails);
//# sourceMappingURL=User.router.js.map