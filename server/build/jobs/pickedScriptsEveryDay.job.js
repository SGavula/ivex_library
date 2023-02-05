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
exports.pickedScriptEveryDay = void 0;
const models_1 = require("../database/models");
const node_schedule_1 = __importDefault(require("node-schedule"));
function pickedScriptEveryDay() {
    console.log('Scheduling changing picked scripts for 8am every day');
    node_schedule_1.default.scheduleJob('* * 8 * * *', function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pickedScripts = yield models_1.script_model.find({
                    picked: true
                });
                if (pickedScripts) {
                    pickedScripts.forEach((script) => {
                        script.picked = false;
                        script.save();
                    });
                }
                let allScripts = [];
                const publisher_analytics = yield models_1.publisher_analytics_model.find();
                for (let publisher of publisher_analytics) {
                    if (publisher.scripts) {
                        for (let script of publisher.scripts) {
                            for (let data of script.data) {
                                if (data.year == new Date().getFullYear()) {
                                    for (let month of data.months) {
                                        if (month.num == new Date().getMonth()) {
                                            allScripts.push({
                                                id: script.script_id,
                                                opens: month.opens
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                const topReading = allScripts
                    .sort((a, b) => b.opens - a.opens)
                    .slice(0, 5);
                console.log('Top reading this month:', topReading);
                const topReadingOnlyIds = topReading.map((a) => {
                    return a.id;
                });
                const topFiveScripts = yield models_1.script_model.find({
                    _id: { $in: topReadingOnlyIds }
                });
                topFiveScripts.forEach((script) => {
                    script.picked = true;
                    script.save();
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    });
}
exports.pickedScriptEveryDay = pickedScriptEveryDay;
//# sourceMappingURL=pickedScriptsEveryDay.job.js.map