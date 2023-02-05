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
exports.login = void 0;
const models_1 = require("../database/models");
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
require('dotenv').config({
    path: path_1.default.resolve(__dirname, '../../../.env')
});
const SECRET_1 = process.env.SECRET_1;
const SECRET_2 = process.env.SECRET_2;
const login = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let responseData = {};
    try {
        let jwtData = {};
        let user;
        let email = req.body.email;
        let base_user = yield models_1.user_model.findOne({ email });
        let admin = yield models_1.admin_model.findOne({ email });
        let publisher = yield models_1.publisher_model.findOne({ email });
        if (admin) {
            user = admin;
            jwtData.user_type = 'ADMIN';
            jwtData.email = user.email;
            jwtData.name = user.first_name;
        }
        else if (publisher) {
            jwtData.user_type = 'PUBLISHER';
            user = publisher;
        }
        else if (base_user) {
            user = base_user;
            jwtData.user_type = 'USER';
            jwtData.user_name = base_user.name;
        }
        else {
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Not valid user type', []));
        }
        if (user == undefined)
            return res.status(404).jsonp((0, helpers_1.response)(404, 'user not found', []));
        if (jwtData.user_type == 'USER') {
            if (user.user_state == 'awaiting_payment') {
                return res
                    .status(402)
                    .jsonp((0, helpers_1.response)(401, 'User does not have setup intent'));
            }
            if (!user.verified) {
                return res
                    .status(401)
                    .jsonp((0, helpers_1.response)(401, 'Email address not confirmed'));
            }
        }
        const valid = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!valid) {
            return res.status(400).jsonp((0, helpers_1.response)(400, 'Bad password'));
        }
        jwtData.user_id = user.id;
        responseData.user_id = user.id;
        responseData.user_type = jwtData.user_type;
        if (jwtData.user_type == 'USER' || jwtData.user_type == 'PUBLISHER') {
            jwtData.email = user.email;
            if (jwtData.user_type == 'USER') {
                console.log(user);
                responseData.name = user.first_name;
                responseData.user_state = user.user_state;
                responseData.subscription_type = user.subscription_type;
                jwtData.first_name = user.first_name;
                jwtData.last_name = user.last_name;
                jwtData.address = user.address;
                jwtData.paid = user.paid;
                jwtData.subscription_ending = user.subscription_ending;
            }
            else {
                jwtData.name = user.name;
                responseData.name = user.name;
            }
        }
        else {
            responseData.name = user.first_name;
        }
        responseData.token = jsonwebtoken_1.default.sign(jwtData, SECRET_1, {
            expiresIn: '30m'
        });
        responseData.refresh = jsonwebtoken_1.default.sign(jwtData, SECRET_2 + user.password, {
            expiresIn: '1d'
        });
        user.refresh_token = responseData.refresh;
        user.save();
    }
    catch (err) {
        console.log(err);
        return res.status(500).jsonp((0, helpers_1.response)(500, 'try catch error', err));
    }
    return res
        .status(200)
        .jsonp((0, helpers_1.response)(200, 'login successful', responseData));
});
exports.login = login;
//# sourceMappingURL=Auth.controller.js.map