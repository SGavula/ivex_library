"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const helpers_1 = require("../helpers/");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../database/models");
const path_1 = __importDefault(require("path"));
require('dotenv').config({
    path: path_1.default.resolve(__dirname, '../../.env')
});
const SECRET_1 = process.env.SECRET_1;
const SECRET_2 = process.env.SECRET_2;
const AuthMiddleware = (permission) => {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
            res.set('x-token', undefined);
            res.set('x-refresh-token', undefined);
            const token = req.headers['x-token'];
            let jwtData = {};
            if (token) {
                try {
                    const user = jsonwebtoken_1.default.verify(token, SECRET_1);
                    jwtData = user;
                    delete jwtData.iat;
                    delete jwtData.exp;
                    if (!('user_id' in jwtData)) {
                        return res.status(401).jsonp((0, helpers_1.response)(401, 'Unauthorized'));
                    }
                    if (!permission.includes(jwtData.user_type))
                        return res.status(401).jsonp((0, helpers_1.response)(401, 'Unauthorized'));
                }
                catch (err) {
                    const refreshToken = req.headers['x-refresh-token'];
                    if (!refreshToken) {
                        return res.status(401).jsonp((0, helpers_1.response)(401, 'Unauthorized'));
                    }
                    try {
                        const user = jsonwebtoken_1.default.decode(refreshToken);
                        jwtData = user;
                        delete jwtData.iat;
                        delete jwtData.exp;
                    }
                    catch (err) {
                        return res.status(401).jsonp((0, helpers_1.response)(401, 'Unauthorized'));
                    }
                    if (!('user_id' in jwtData)) {
                        return res.status(401).jsonp((0, helpers_1.response)(401, 'Unauthorized'));
                    }
                    if (!permission.includes(jwtData.user_type))
                        return res.status(401).jsonp((0, helpers_1.response)(401, 'Unauthorized'));
                    let user;
                    if (jwtData.user_type == 'ADMIN') {
                        user = models_1.admin_model.findOne({ _id: jwtData.user_id });
                    }
                    else if (jwtData.user_type == 'USER') {
                        user = models_1.user_model.findOne({ _id: jwtData.user_id });
                    }
                    else if (jwtData.user_type == 'PUBLISHER') {
                        user = models_1.publisher_model.findOne({ _id: jwtData.user_id });
                    }
                    else {
                        return res.status(401).jsonp((0, helpers_1.response)(401, 'Unauthorized'));
                    }
                    if (user == undefined || refreshToken != user.refresh_token) {
                        if (user != undefined) {
                            try {
                                user.refresh_token = '';
                                if (jwtData.user_type == 'ADMIN' ||
                                    jwtData.user_type == 'PUBLISHER' ||
                                    jwtData.user_type == 'USER') {
                                    user.save();
                                }
                                else {
                                    return res
                                        .status(401)
                                        .jsonp((0, helpers_1.response)(401, 'Unauthorized'));
                                }
                            }
                            catch (err) { }
                        }
                        return res.status(401).jsonp((0, helpers_1.response)(401, 'Unauthorized'));
                    }
                    const refreshSecret = SECRET_2 + user.password;
                    try {
                        jsonwebtoken_1.default.verify(refreshToken, refreshSecret);
                    }
                    catch (err) {
                        return res.status(401).jsonp((0, helpers_1.response)(401, 'Unauthorized'));
                    }
                    const newToken = jsonwebtoken_1.default.sign(jwtData, SECRET_1, {
                        expiresIn: '1d'
                    });
                    const newRefreshToken = jsonwebtoken_1.default.sign(jwtData, SECRET_2 + user.password, {
                        expiresIn: '10d'
                    });
                    try {
                        user.refresh_token = newRefreshToken;
                        if (jwtData.user_type == 'ADMIN' ||
                            jwtData.user_type == 'PUBLISHER' ||
                            jwtData.user_type == 'USER') {
                            user.save();
                        }
                        else {
                            return res
                                .status(401)
                                .jsonp((0, helpers_1.response)(401, 'Unauthorized'));
                        }
                    }
                    catch (err) {
                        return res
                            .status(500)
                            .jsonp((0, helpers_1.response)(500, 'Token creation failed'));
                    }
                    if (newToken && newRefreshToken) {
                        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
                        res.set('x-token', newToken);
                        res.set('x-refresh-token', newRefreshToken);
                    }
                }
            }
            else {
                return res.status(401).jsonp((0, helpers_1.response)(401, 'Unauthorized'));
            }
            req.body.jwt = jwtData;
            return next();
        });
    };
};
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=Auth.middleware.js.map