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
exports.unsubscribeFromEmails = exports.deleteUser = exports.sendContactEmail = exports.userForgottenPassword = exports.userVerification = exports.isFavorite = exports.unfavoriteScript = exports.editUserScriptData = exports.passwordByTokenReset = exports.editUserPassword = exports.editUser = exports.getUser = exports.createUser = void 0;
const models_1 = require("../database/models");
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const helpers_1 = require("../helpers");
const nanoid_1 = require("nanoid");
const emails_1 = require("../emails");
const path_1 = __importDefault(require("path"));
require('dotenv').config({
    path: path_1.default.resolve(__dirname, '../../../.env')
});
const stripe_1 = __importDefault(require("stripe"));
let stripe;
stripe = new stripe_1.default(process.env.NODE_ENV == 'PROD'
    ? process.env.STRIPE_PK
    : process.env.STRIPE_TEST, {
    apiVersion: '2020-08-27'
});
const salt = 10;
const url = process.env.NODE_ENV == 'PROD'
    ? 'https://ivexlibrary.sk'
    : 'http://localhost:3000';
const createUser = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let user;
    let responseToSend;
    try {
        const email_token = (0, nanoid_1.nanoid)(20);
        const user_email = yield models_1.user_model.findOne({ email: req.body.email });
        if (user_email)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'User with this email already exists', {}));
        const password = yield bcrypt_1.default.hash(req.body.password, salt);
        let date = new Date();
        date.setDate(date.getDate() + 14);
        user = new models_1.user_model({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: password,
            subscription_type: parseInt(req.body.sub_type),
            subscription_ending: date,
            verification_token: {
                token: email_token
            },
            user_state: req.body.sub_type == 3 ? 'freemium' : 'awaiting-payment'
        });
        yield user.save();
        if (req.body.sub_type !== 3) {
            const customer = yield stripe.customers.create({
                email: req.body.email
            });
            user.stripeCustomerId = customer.id;
            yield user.save();
            let price_id;
            if (process.env.NODE_ENV == 'PROD') {
                price_id =
                    req.body.sub_type == 1
                        ? 'price_1JxXXrDz7YsaI1yHfUEP2glu'
                        : 'price_1JxXZnDz7YsaI1yHWJ7wQ8eZ';
            }
            else {
                price_id =
                    req.body.sub_type == 1
                        ? 'price_1Js7PyDz7YsaI1yH8DLg5tXf'
                        : 'price_1Js7QRDz7YsaI1yHpLT1JKcw';
            }
            const subscription = yield stripe.subscriptions.create({
                customer: customer.id,
                items: [
                    {
                        price: price_id
                    }
                ],
                payment_behavior: 'default_incomplete',
                expand: ['latest_invoice.payment_intent'],
                payment_settings: {
                    payment_method_types: ['card']
                },
                coupon: 'idiscount2',
                trial_from_plan: true
            });
            const setIntent = yield stripe.setupIntents.retrieve(subscription.pending_setup_intent);
            responseToSend = {
                user: user,
                payment: {
                    subscriptionId: subscription.id,
                    clientSecret: setIntent.client_secret
                }
            };
            user.stripe = {
                id: subscription.id,
                c_periond_end: subscription.current_period_end,
                customer: subscription.customer
            };
            yield user.save();
        }
        else {
            const message = {
                from: 'noreply@ivexlibrary.sk',
                to: user.email,
                subject: 'Úspešná registrácia do IVEX-Library',
                template: 'layouts/registrantion-confirm',
                context: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    price: '0€',
                    subscription: 'Freemium',
                    trial: 7,
                    subscription_ending: 'Navždy zadarmo',
                    link: `${url}/verification/${user.verification_token.token}`
                }
            };
            yield emails_1.transporter.sendMail(message);
            responseToSend = 'freemium';
        }
        const analytics = new models_1.user_analytics_model({
            user_id: user._id,
            subscription_type: req.body.subscription_type,
            scripts: []
        });
        yield analytics.save();
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', responseToSend));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'User created', responseToSend));
});
exports.createUser = createUser;
const getUser = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let user;
    try {
        user = yield models_1.user_model
            .findOne({ _id: req.params.user_id })
            .select('-credit_card -last_payment -payments -analytics -created_at -edited_at -last_payment');
    }
    catch (error) {
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res
        .status(200)
        .jsonp((0, helpers_1.response)(200, 'user getted succesfully', user));
});
exports.getUser = getUser;
const editUser = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let user;
    try {
        user = yield models_1.user_model
            .findOne({ _id: req.params.user_id })
            .select('-credit_card -last_payment -payments -analytics -created_at -edited_at -last_payment');
        user.first_name = req.body.first_name || user.first_name;
        user.last_name = req.body.last_name || user.last_name;
        user.address = req.body.address || user.address;
        user.university = req.body.university || user.university;
        user.faculty = req.body.faculty || user.faculty;
        user.subject = req.body.subject || user.subject;
        user.year = req.body.year || user.year;
        user.gender = req.body.gender || user.gender;
        user.favorite_subjects =
            req.body.favorite_subjects || user.favorite_subjects;
        user.email = req.body.email || user.email;
        user.save();
    }
    catch (error) {
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'user edited', user));
});
exports.editUser = editUser;
const editUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    try {
        let user = yield models_1.user_model.findOne({
            _id: req.params.user_id
        });
        if (!user)
            return res
                .status(422)
                .jsonp((0, helpers_1.response)(422, 'No user with that id', {}));
        user.password = yield bcrypt_1.default.hash(req.body.password, 10);
        user.save();
    }
    catch (error) {
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'User data edited', {}));
});
exports.editUserPassword = editUserPassword;
const passwordByTokenReset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    try {
        let user;
        user = yield models_1.user_model.findOne({
            'verification_token.token': req.body.token
        });
        if (!user) {
            user = yield models_1.publisher_model.findOne({
                'verification_token.token': req.body.token
            });
        }
        if (!user) {
            user = yield models_1.admin_model.findOne({
                'verification_token.token': req.body.token
            });
        }
        const oneDay = 24 * 60 * 60 * 1000;
        if (!user)
            return res
                .status(422)
                .jsonp((0, helpers_1.response)(422, 'No user with that id', {}));
        let currentDate = new Date();
        if (currentDate - user.verification_token.expiration > oneDay) {
            user.verification_token = {
                token: '',
                expiration: new Date()
            };
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Old verification token', {}));
        }
        user.password = yield bcrypt_1.default.hash(req.body.password, 10);
        user.verification_token = {
            token: '',
            expiration: new Date()
        };
        user.save();
    }
    catch (error) {
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'User data edited', {}));
});
exports.passwordByTokenReset = passwordByTokenReset;
const editUserScriptData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    try {
        let user = yield models_1.user_model.findOne({ _id: req.params.user_id });
        let script = yield models_1.script_model.findOne({
            _id: req.body.script_id
        });
        if (!user)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No user with that id', {}));
        if (!script)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No script with that id', {}));
        if (req.body.reqtype === 1) {
            if (!user.favorite_scripts.includes(req.body.script_id))
                user.favorite_scripts.push(req.body.script_id);
        }
        if (req.body.reqtype === 2) {
            if (!user.last_scripts.includes(req.body.script_id))
                if (user.last_scripts.length >= 5) {
                    user.last_scripts.pop();
                }
            user.last_scripts.unshift(req.body.script_id);
        }
        console.log(user.last_scripts);
        user.save();
    }
    catch (error) {
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Script data edited', {}));
});
exports.editUserScriptData = editUserScriptData;
const unfavoriteScript = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    try {
        let user = yield models_1.user_model.findOne({ _id: req.params.user_id });
        if (!user)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No user with that id', {}));
        if (!user.favorite_scripts.includes(req.params.script_id))
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'User has not favored that script', {}));
        const index = user.favorite_scripts.findIndex((el) => el == req.params.script_id);
        user.favorite_scripts.splice(index, 1);
        user.save();
    }
    catch (error) {
        console.log(error);
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Script data edited', {}));
});
exports.unfavoriteScript = unfavoriteScript;
const isFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let result;
    try {
        let user = yield models_1.user_model.findOne({ _id: req.params.user_id });
        let script = yield models_1.script_model.findOne({
            _id: req.params.script_id
        });
        if (!user)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No user with that id', {}));
        if (!script)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No script with that id', {}));
        if (!user.favorite_scripts.includes(req.params.script_id)) {
            result = false;
        }
        else {
            result = true;
        }
    }
    catch (error) {
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Script data edited', result));
});
exports.isFavorite = isFavorite;
const userVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let verified;
    try {
        let user = yield models_1.user_model.findOne({
            'verification_token.token': req.params.token
        });
        if (!user) {
            verified = false;
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No user with that id', {}));
        }
        verified = true;
        user.verification_token = {};
        user.verified = true;
        user.save();
    }
    catch (error) {
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res
        .status(200)
        .jsonp((0, helpers_1.response)(200, 'Script data edited', { verified: verified }));
});
exports.userVerification = userVerification;
const userForgottenPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let token;
    try {
        token = (0, nanoid_1.nanoid)(24);
        let user;
        user = yield models_1.user_model.findOne({
            email: req.body.email
        });
        if (!user) {
            user = yield models_1.publisher_model.findOne({
                email: req.body.email
            });
        }
        if (!user) {
            user = yield models_1.admin_model.findOne({
                email: req.body.email
            });
        }
        if (!user) {
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No user with that id', {}));
        }
        let expiration = new Date();
        expiration.setDate(expiration.getDate() + 1);
        const message = {
            from: 'noreply@ivexlibrary.sk',
            to: req.body.email,
            subject: 'Zabudnute heslo',
            template: 'layouts/forgot-password',
            context: {
                name: user._firstname || user.name,
                link: `${url}/change-password/${token}`
            }
        };
        emails_1.transporter.sendMail(message);
        user.verification_token = {
            token,
            expiration
        };
        user.save();
    }
    catch (error) {
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res
        .status(200)
        .jsonp((0, helpers_1.response)(200, 'Password reset email sent', { token: token }));
});
exports.userForgottenPassword = userForgottenPassword;
const sendContactEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    try {
        const admins = yield models_1.admin_model
            .find()
            .select('email -_id');
        const admin_emails = admins.map((admin) => admin.email);
        const message = {
            from: 'noreply@ivexlibrary.sk',
            to: admin_emails,
            subject: `Nová správa od ${req.body.name}`,
            template: 'layouts/contact-form',
            context: {
                name: req.body.name,
                email: req.body.email,
                message: req.body.message
            }
        };
        console.log(message);
        yield emails_1.transporter.sendMail(message);
    }
    catch (error) {
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Script data edited', {}));
});
exports.sendContactEmail = sendContactEmail;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let user;
    try {
        user = yield models_1.user_model.findOneAndDelete({
            _id: req.params.user_id
        });
        yield models_1.user_analytics_model.findOneAndDelete({
            user_id: req.params.user_id
        });
    }
    catch (error) {
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'User removed from DB', user));
});
exports.deleteUser = deleteUser;
const unsubscribeFromEmails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user;
        user = yield models_1.user_model.findOne({
            email_subscription_token: req.params.token
        });
        if (!user) {
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No user with that id', {}));
        }
        user.email_subscription = false;
        user.save();
    }
    catch (error) {
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Unsubscribed', {}));
});
exports.unsubscribeFromEmails = unsubscribeFromEmails;
//# sourceMappingURL=User.controller.js.map