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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUserAnalytics = void 0;
const models_1 = require("../models");
const sk_1 = require("faker/locale/sk");
const seedUserAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('removing existing analytics');
    models_1.user_analytics_model.collection.drop();
    console.log('seeding analytics');
    const users = yield models_1.user_model.find();
    const scripts = yield models_1.script_model.find({ published: true });
    for (let user of users) {
        const subscription_type = sk_1.random.number({ min: 0, max: 2 });
        const user_entry_object = new models_1.user_analytics_model({
            user_id: user._id,
            subscription_type,
            scripts: []
        });
        for (let script of scripts) {
            const script_id = script._id;
            const full_pages = sk_1.random.number({ min: 200, max: 350 });
            const max_pages = full_pages - sk_1.random.number({ min: 20, max: 75 });
            const percentile = max_pages / full_pages;
            const pages_read = [];
            for (let a = 1; a <= max_pages; a++) {
                pages_read.push(a);
            }
            const new_entry = {
                script_id,
                max_pages,
                full_pages,
                percentile,
                data: [
                    {
                        year: 2021,
                        months: []
                    }
                ]
            };
            let prev_pages = 0;
            for (let i = 0; i <= new Date().getMonth(); i++) {
                let pages = max_pages - (max_pages - 50 / (i + 1));
                if (i == new Date().getMonth()) {
                    pages = max_pages - prev_pages;
                }
                prev_pages = pages;
                let pagesArray = [];
                for (let a = 0; a < sk_1.random.number({ min: 20, max: max_pages }); a++) {
                    pagesArray.push(a);
                }
                let vpc = script.pricing * (pagesArray.length / full_pages);
                const month_entry = {
                    num: i,
                    pages: pagesArray,
                    month_pages: pagesArray.length,
                    vpc
                };
                new_entry.data[0].months.push(month_entry);
            }
            user_entry_object.scripts.push(new_entry);
        }
        try {
            yield user_entry_object.save();
        }
        catch (error) {
            console.log(error);
        }
    }
});
exports.seedUserAnalytics = seedUserAnalytics;
//# sourceMappingURL=user_analytics_seeder.js.map