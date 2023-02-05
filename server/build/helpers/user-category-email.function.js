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
exports.sendEmailToRelevantUsersByCategory = void 0;
const emails_1 = require("../emails");
const models_1 = require("../database/models");
const node_schedule_1 = __importDefault(require("node-schedule"));
const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);
const _randomslice = (ar, size) => {
    let new_ar = [...ar];
    new_ar.splice(Math.floor(Math.random() * ar.length), 1);
    return ar.length <= size + 1 ? new_ar : _randomslice(new_ar, size);
};
function sendEmailToRelevantUsersByCategory(category, script_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const eligableUsers = yield models_1.user_model
            .find({
            got_email: false,
            email_subscription: true
        })
            .select('_id');
        if (!eligableUsers)
            return false;
        const eligableUsersIds = eligableUsers.map((obj) => obj._id);
        const eligableScripts = yield models_1.script_model.find({
            category: category
        });
        if (!eligableScripts || eligableScripts.length < 3)
            return false;
        const eligableScriptIds = eligableScripts.map((obj) => obj._id);
        console.log(eligableScriptIds);
        const user_analytics_data = yield models_1.user_analytics_model.find({ user_id: { $in: eligableUsersIds } });
        const new_script = yield models_1.script_model.findOne({
            _id: script_id
        });
        const secondaryScriptIds = _randomslice(eligableScriptIds, 2);
        console.log(secondaryScriptIds);
        user_analytics_data.forEach((data) => __awaiter(this, void 0, void 0, function* () {
            const user_scripts = [];
            data.scripts.forEach((script) => {
                if (eligableScriptIds.includes(script.script_id)) {
                    user_scripts.push(true);
                }
            });
            if (user_scripts.length / eligableScripts.length >= 0.5) {
                let user = yield models_1.user_model.findOne({
                    _id: data.user_id
                });
                user.got_email = true;
                yield user.save();
                const first_script = yield models_1.script_model.findOne({
                    _id: secondaryScriptIds[0]
                });
                const second_script = yield models_1.script_model.findOne({
                    _id: secondaryScriptIds[1]
                });
                const unsubscribe_url = process.env.NODE_ENV == 'PROD'
                    ? `https://ivexlibrary.sk/unsubscribe/${user.email_subscription_token}`
                    : `http://localhost:3000/unsubscribe/${user.email_subscription_token}`;
                const message = {
                    from: 'noreply@ivexlibrary.sk',
                    to: 'misogally@gmail.com',
                    subject: `Nová kniha v kategórií ${capitalize(category)}`,
                    template: 'layouts/new_script',
                    context: {
                        first_image: new_script.image,
                        script_id: script_id,
                        second_image: first_script.image,
                        second_name: first_script.name,
                        second_author: first_script.author,
                        second_year: first_script.year,
                        second_id: first_script._id,
                        third_image: second_script.image,
                        third_name: second_script.name,
                        third_author: second_script.author,
                        third_year: second_script.year,
                        third_id: second_script._id,
                        unsubscribe_url
                    }
                };
                emails_1.transporter.sendMail(message);
                console.log('Email sent to: ', user.email, ' in event of added similar script to database! This user wont recive another email about updates in another 5 days');
                const date = new Date();
                date.setDate(date.getDate() + 5);
                node_schedule_1.default.scheduleJob(date, () => {
                    user.got_email = false;
                    user.save();
                    console.log('User ', user.email, 'can now recive emails');
                });
            }
        }));
        return true;
    });
}
exports.sendEmailToRelevantUsersByCategory = sendEmailToRelevantUsersByCategory;
//# sourceMappingURL=user-category-email.function.js.map