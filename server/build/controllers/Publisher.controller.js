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
exports.requestScriptChange = exports.deletePublisher = exports.getAllPublishers = exports.getPublisher = exports.editPublisher = exports.createPublisher = void 0;
const models_1 = require("../database/models");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const helpers_1 = require("../helpers");
const faker_1 = require("faker");
const emails_1 = require("../emails");
const salt = 10;
const createPublisher = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let user;
    let generatedPassword;
    try {
        const publisher_email = yield models_1.publisher_model.findOne({
            email: req.body.email
        });
        if (publisher_email)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'User with this email already exists', {}));
        generatedPassword = faker_1.internet.password();
        const password = yield bcrypt_1.default.hash(generatedPassword, salt);
        user = new models_1.publisher_model({
            email: req.body.email,
            name: req.body.name,
            password: password
        });
        const analyticsModel = new models_1.publisher_analytics_model({
            publisher_id: user._id,
            scripts: []
        });
        const message = {
            from: 'noreply@ivexlibrary.sk',
            to: req.body.email,
            subject: 'Vytvorenie prístupu do IVEX-Library',
            template: 'layouts/publisher-password',
            context: {
                name: req.body.name,
                email: req.body.email,
                password: generatedPassword
            }
        };
        emails_1.transporter.sendMail(message);
        try {
            analyticsModel.save();
            user.save();
        }
        catch (error) {
            console.log(error);
        }
    }
    catch (error) {
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Publisher created', Object.assign(Object.assign({}, user), { gpassword: generatedPassword })));
});
exports.createPublisher = createPublisher;
const editPublisher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let user;
    try {
        user = yield models_1.publisher_model.findOne({
            _id: req.params.publisher_id
        });
        if (!user)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Publisher with that id doesnt exists', {}));
        user.email = req.body.email || user.email;
        user.name = req.body.name || user.name;
        if (req.body.password) {
            let password = yield bcrypt_1.default.hash(req.body.password, salt);
            user.password = password;
        }
        user.save();
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Publisher edited', user));
});
exports.editPublisher = editPublisher;
const getPublisher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let user;
    try {
        user = yield models_1.publisher_model
            .findOne({
            _id: req.params.publisher_id
        })
            .select('-password');
        if (!user)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Publisher with that id doesnt exists', {}));
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Publisher getted', user));
});
exports.getPublisher = getPublisher;
const getAllPublishers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users;
    try {
        users = yield models_1.publisher_model.find().select('_id name');
        if (!users)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Publisher with that id doesnt exists', {}));
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Publishers getted', users));
});
exports.getAllPublishers = getAllPublishers;
const deletePublisher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    try {
        let user = yield models_1.publisher_model.findOne({
            _id: req.params.publisher_id
        });
        if (!user)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Publisher with that id doesnt exists', {}));
        yield models_1.publisher_analytics_model.findOneAndDelete({
            publisher_id: user._id
        });
        yield models_1.script_model.deleteMany({ _id: { $in: user.scripts } });
        user.remove();
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Publisher deleted', {}));
});
exports.deletePublisher = deletePublisher;
const requestScriptChange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    const admins = yield models_1.admin_model.find();
    const admin_emails = [];
    const publisher = yield models_1.publisher_model.findOne({
        _id: req.params.publisher_id
    });
    const script = yield models_1.script_model.findOne({
        _id: req.body.script_id
    });
    if (!publisher || !script || !admins)
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'No publisher || admin || script', {}));
    admins.forEach((admin) => {
        admin_emails.push(admin.email);
    });
    const message = {
        from: 'noreply@ivexlibrary.sk',
        to: admin_emails,
        subject: 'Ziadost o zmenu scriptu',
        template: 'layouts/script-change-request',
        context: {
            publisher_name: publisher.name,
            script_name: script.name,
            script_id: req.body.script_id,
            message: req.body.message
        }
    };
    try {
        emails_1.transporter.sendMail(message);
    }
    catch (error) {
        if (error)
            return res.status(400).jsonp((0, helpers_1.response)(400, errors));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Email sent', {}));
});
exports.requestScriptChange = requestScriptChange;
//# sourceMappingURL=Publisher.controller.js.map