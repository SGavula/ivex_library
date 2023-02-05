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
exports.changeSubscription = exports.renewSubscription = exports.cancelSubscription = exports.Webhook = void 0;
const models_1 = require("../database/models");
const stripe_1 = __importDefault(require("stripe"));
const emails_1 = require("../emails");
const helpers_1 = require("../helpers");
let stripe;
stripe = new stripe_1.default(process.env.NODE_ENV == 'PROD'
    ? process.env.STRIPE_PK
    : process.env.STRIPE_TEST, {
    apiVersion: '2020-08-27'
});
const Webhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let event;
    const headers = req.headers['stripe-signature'];
    if (!headers || !process.env.STRIPE_WEBHOOK_SECRET) {
        return;
    }
    try {
        event = stripe.webhooks.constructEvent(req.body, headers, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        console.log(err);
        console.log(`⚠️  Webhook signature verification failed.`);
        console.log(`⚠️  Check the env file and enter the correct webhook secret.`);
        return res.send(400);
    }
    switch (event.type) {
        case 'customer.subscription.created':
            break;
        case 'customer.subscription.updated':
            console.log(event);
            if (event.data.object.status == 'trialing') {
                const customerId = event.data.object.customer;
                const user = yield models_1.user_model.findOne({
                    'stripe.customer': customerId
                });
                const stripeDate = event.data.object.trial_end;
                const date = new Date(stripeDate * 1000);
                let url = 'http://localhost:3000';
                const price = event.data.object.plan.amount / 100 + '€';
                user.subscription_ending = date;
                user.user_state = 'free-trail';
                yield user.save();
                let subscription_type = event.data.object.plan.interval == 'month'
                    ? 'mesačné (skúšobná doba)'
                    : 'semestrálne (skúšobná doba)';
                const message = {
                    from: 'noreply@ivexlibrary.sk',
                    to: user.email,
                    subject: 'Úspešná registrácia do IVEX-Library',
                    template: 'layouts/registrantion-confirm',
                    context: {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        price: price,
                        subscription: subscription_type,
                        trial: 7,
                        subscription_ending: date,
                        link: `${url}/verification/${user.verification_token
                            .token}`
                    }
                };
                yield emails_1.transporter.sendMail(message);
            }
            break;
        case 'invoice.paid':
            console.log(event);
            if (event.data.object.amount_due !== 0) {
                const customerId = event.data.object.customer;
                const user = yield models_1.user_model.findOne({
                    'stripe.customer': customerId
                });
                const subscription = yield stripe.subscriptions.retrieve(user.stripe.id);
                const stripeDate = subscription.current_period_end;
                const date = new Date(stripeDate * 1000);
                user.subscription_ending = date;
                user.user_state = 'subscribed';
                yield user.save();
            }
            break;
        case 'invoice.payment_failed':
            break;
        case 'customer.subscription.deleted':
            if (event.request != null) {
            }
            else {
            }
            break;
        default:
    }
    return res.sendStatus(200);
});
exports.Webhook = Webhook;
const cancelSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.user_model.findOne({
            _id: req.params.user_id
        });
        yield stripe.subscriptions.update(user.stripe.id, { cancel_at_period_end: true });
        user.user_state = 'awaiting-cancel';
        yield user.save();
    }
    catch (error) {
        console.log(error);
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Subscription canceled', {}));
});
exports.cancelSubscription = cancelSubscription;
const renewSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.user_model.findOne({
            _id: req.params.user_id
        });
        yield stripe.subscriptions.update(user.stripe.id, { cancel_at_period_end: false });
        user.user_state = 'subscribed';
        yield user.save();
    }
    catch (error) {
        console.log(error);
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Subscription canceled', {}));
});
exports.renewSubscription = renewSubscription;
const changeSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.user_model.findOne({
            _id: req.params.user_id
        });
        const subscription = yield stripe.subscriptions.retrieve(user.stripe.id);
        if (req.body.new_sub !== 3) {
            let price;
            if (req.body.new_sub == 1) {
                if (process.env.NODE_ENV == 'PROD') {
                    price = 'price_1JxXXrDz7YsaI1yHfUEP2glu';
                }
                else {
                    price = 'price_1Js7PyDz7YsaI1yH8DLg5tXf';
                }
            }
            else if (req.body.new_sub == 2) {
                if (process.env.NODE_ENV == 'PROD') {
                    price = 'price_1JxXZnDz7YsaI1yHWJ7wQ8eZ';
                }
                else {
                    price = 'price_1Js7QRDz7YsaI1yHpLT1JKcw';
                }
            }
            yield stripe.subscriptions.update(user.stripe.id, {
                cancel_at_period_end: false,
                items: [
                    {
                        id: subscription.items.data[0].id,
                        price: price
                    }
                ]
            });
            user.subscription_type = parseInt(req.body.new_sub);
            yield user.save();
        }
        else {
            yield stripe.subscriptions.update(user.stripe.id, { cancel_at_period_end: true });
            user.user_state = 'awaiting-cancel';
            yield user.save();
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Subscription canceled', {}));
});
exports.changeSubscription = changeSubscription;
//# sourceMappingURL=Subscription.controller.js.map