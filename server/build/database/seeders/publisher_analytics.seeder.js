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
exports.seedPublisherAnalytics = void 0;
const models_1 = require("../models");
const sk_1 = require("faker/locale/sk");
const seedPublisherAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('removing existing analytics');
    models_1.publisher_analytics_model.collection.drop();
    console.log('seeding analytics');
    try {
        const publishers = yield models_1.publisher_model.find();
        for (let publisher of publishers) {
            const newPublisherAnalyticsObject = new models_1.publisher_analytics_model({
                publisher_id: publisher._id,
                scripts: []
            });
            for (let script of publisher.scripts) {
                const newScriptObject = {
                    script_id: script,
                    data: []
                };
                for (let i = 2016; i <= 2021; i++) {
                    const newYearObject = {
                        year: i,
                        months: []
                    };
                    for (let a = 0; a <= 11; a++) {
                        const newMonthObject = {
                            num: a,
                            opens: sk_1.random.number({ min: 150, max: 1500 })
                        };
                        newYearObject.months.push(newMonthObject);
                    }
                    newScriptObject.data.push(newYearObject);
                }
                newPublisherAnalyticsObject.scripts.push(newScriptObject);
            }
            yield newPublisherAnalyticsObject.save();
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.seedPublisherAnalytics = seedPublisherAnalytics;
//# sourceMappingURL=publisher_analytics.seeder.js.map