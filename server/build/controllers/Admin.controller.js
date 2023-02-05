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
exports.adminCreateUser = exports.getAllUsers = exports.getAdmin = exports.editAdmin = exports.createAdmin = void 0;
const models_1 = require("../database/models");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const helpers_1 = require("../helpers");
const faker_1 = require("faker");
const emails_1 = require("../emails");
const nanoid_1 = require("nanoid");
const salt = 10;
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let user;
    let generatedPassword = faker_1.internet.password();
    try {
        const admin_email = yield models_1.admin_model.findOne({
            email: req.body.email
        });
        if (admin_email)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'User with this email already exists', {}));
        let foundUser = yield models_1.user_model.findOne({
            email: req.body.email
        });
        if (!foundUser) {
            foundUser = yield models_1.publisher_model.findOne({
                email: req.body.email
            });
        }
        if (foundUser)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'User with this email already exists', {}));
        const password = yield bcrypt_1.default.hash(generatedPassword, salt);
        user = new models_1.admin_model({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: password
        });
        user.save();
        user.unecryptedPassword = generatedPassword;
        const message = {
            from: 'noreply@ivexlibrary.sk',
            to: req.body.email,
            subject: 'Potvrdenie vytvorenia účtu',
            template: 'layouts/admin-password',
            context: {
                email: req.body.email,
                password: generatedPassword,
                first_name: user.first_name,
                last_name: user.last_name
            }
        };
        emails_1.transporter.sendMail(message);
    }
    catch (error) {
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res
        .status(200)
        .jsonp((0, helpers_1.response)(200, 'Admin created', { user, generatedPassword }));
});
exports.createAdmin = createAdmin;
const editAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let user;
    try {
        user = yield models_1.admin_model.findOne({
            _id: req.params.admin_id
        });
        if (!user)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'User with this email doesnt exist', {}));
        user.email = req.body.email || user.email;
        user.first_name = req.body.first_name || user.first_name;
        user.last_name = req.body.last_name || user.last_name;
        if (req.body.password) {
            let password = yield bcrypt_1.default.hash(req.body.password, salt);
            user.password = password;
        }
        user.save();
    }
    catch (error) {
        console.log(error);
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Admin edited', user));
});
exports.editAdmin = editAdmin;
const getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let user;
    try {
        user = yield models_1.admin_model
            .findOne({
            _id: req.params.admin_id
        })
            .select('-password -refresh_token');
        if (!user)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Admin with that id doesnt exists', {}));
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Admin getted', user));
});
exports.getAdmin = getAdmin;
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users;
    try {
        users = yield models_1.user_model
            .find()
            .select('first_name last_name paid subscription_type subscription_ending');
        if (!users)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Admin with that id doesnt exists', {}));
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Admin getted', users));
});
exports.getAllUsers = getAllUsers;
const adminCreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let user;
    try {
        const email_token = (0, nanoid_1.nanoid)(20);
        const user_email = yield models_1.user_model.findOne({ email: req.body.email });
        if (user_email)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'User with this email already exists', {}));
        const generatedPassword = faker_1.internet.password();
        const password = yield bcrypt_1.default.hash(generatedPassword, salt);
        let date = new Date();
        date.setDate(date.getDate() + 14);
        user = new models_1.user_model({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: password,
            subscription_type: 1,
            subscription_ending: date,
            verified: true,
            verification_token: {
                token: email_token
            }
        });
        user.save();
        const message = {
            from: 'noreply@ivexlibrary.sk',
            to: user.email,
            subject: 'Úspešná registrácia do IVEX-Library',
            template: 'layouts/admin-password',
            context: {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                password: generatedPassword
            }
        };
        emails_1.transporter.sendMail(message);
        const analytics = new models_1.user_analytics_model({
            user_id: user._id,
            subscription_type: 1,
            scripts: []
        });
        analytics.save();
    }
    catch (error) {
        console.log(error);
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'User created', user));
});
exports.adminCreateUser = adminCreateUser;
//# sourceMappingURL=Admin.controller.js.map