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
exports.getAdminTotalProfits = exports.getAdminTotalPayments = exports.getAdminTotalViews = exports.getPublisherPayForMonths = exports.getPublisherAllTimeViews = exports.getPublisherPayFromAnalytics = exports.getAnalyticsForPublisher = exports.CreateScriptAnalyticsEntry = exports.createAnalyticsEntry = void 0;
const models_1 = require("../database/models");
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const createAnalyticsEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let analytics;
    try {
        analytics = yield models_1.user_analytics_model.findOne({
            user_id: req.body.user_id
        });
        if (!analytics)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Analytics for this record not found', {}));
        const user = yield models_1.user_model.findOne({
            _id: req.body.user_id
        });
        if ((user.paid = false)) {
            const scriptById = yield models_1.script_model.findOne({
                _id: req.body.script_id
            });
            if (!scriptById)
                return res
                    .status(400)
                    .jsonp((0, helpers_1.response)(400, 'Script with that id not found', {}));
            let script_id = req.body.script_id;
            let pages = req.body.pages;
            let fullYear = new Date().getFullYear();
            let foundScript = false;
            analytics.scripts.forEach((script) => {
                if (script.script_id == script_id) {
                    foundScript = script;
                }
            });
            if (foundScript) {
                if (foundScript.max_pages < pages) {
                    foundScript.max_pages = pages;
                }
                if (!foundScript.pages_read.includes(pages)) {
                    foundScript.pages_read.push(pages);
                    foundScript.data.forEach((year) => {
                        if (year.year == fullYear) {
                            year.months.forEach((month) => {
                                if (month.num == new Date().getMonth()) {
                                    month.pages.push(pages);
                                    month.month_pages = month.pages.length;
                                    let percentile = month.month_pages /
                                        foundScript.full_pages;
                                    let vpc = scriptById.pricing * percentile;
                                    month.vpc = vpc;
                                }
                            });
                        }
                    });
                }
            }
            else {
                const newScriptEntry = {
                    script_id: script_id,
                    max_pages: pages,
                    pages_read: [pages],
                    full_pages: req.body.full_pages,
                    data: [
                        {
                            year: new Date().getFullYear(),
                            months: []
                        }
                    ]
                };
                for (let i = 0; i <= 11; i++) {
                    const month = {
                        num: i,
                        pages: [],
                        month_pages: 0,
                        vpc: 0
                    };
                    newScriptEntry.data[0].months.push(month);
                }
                newScriptEntry.data[0].months[new Date().getMonth()].pages.push(pages);
                let percentile = newScriptEntry.data[0].months[new Date().getMonth()].pages
                    .length / newScriptEntry.full_pages;
                let vpc = scriptById.pricing * percentile;
                newScriptEntry.data[0].months[new Date().getMonth()].vpc = vpc;
                newScriptEntry.data[0].months[new Date().getMonth()].month_pages =
                    newScriptEntry.data[0].months[new Date().getMonth()].pages.length;
                analytics.scripts.push(newScriptEntry);
            }
        }
        yield analytics.save();
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Analytics created', analytics));
});
exports.createAnalyticsEntry = createAnalyticsEntry;
const CreateScriptAnalyticsEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let analytics;
    try {
        analytics = yield models_1.publisher_analytics_model.findOne({
            publisher_id: req.body.publisher_id
        });
        if (!analytics)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Analytics for this record not found', {}));
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        for (let script of analytics.scripts) {
            if (script.script_id == req.params.script_id) {
                for (let data of script.data) {
                    if (data.year == year) {
                        for (let monthEntry of data.months) {
                            if (monthEntry.num == month) {
                                monthEntry.opens = ++monthEntry.opens;
                            }
                        }
                    }
                }
            }
        }
        yield analytics.save();
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Analytics created', analytics));
});
exports.CreateScriptAnalyticsEntry = CreateScriptAnalyticsEntry;
const getAnalyticsForPublisher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let result = [];
    try {
        let analytics = yield models_1.publisher_analytics_model.findOne({
            publisher_id: req.params.publisher_id
        });
        if (!analytics)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Analytics for this record not found', {}));
        for (let script of analytics.scripts) {
            if (script.script_id == req.params.script_id) {
                for (let year of script.data) {
                    const yearEntry = {
                        year: year.year,
                        months: []
                    };
                    for (let month of year.months) {
                        yearEntry.months.push(month.opens);
                    }
                    result.push(yearEntry);
                }
            }
        }
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Analytics getted', result));
});
exports.getAnalyticsForPublisher = getAnalyticsForPublisher;
const getPublisherPayFromAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let result = 0;
    try {
        let analytics = yield models_1.user_analytics_model.find();
        if (!analytics)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Analytics for this record not found', {}));
        const publisher = yield models_1.publisher_model.findOne({
            _id: req.params.publisher_id
        });
        if (!publisher)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Analytics for this record not found', {}));
        let scripts = publisher.scripts;
        let total_pay = 0;
        for (let user of analytics) {
            let user_scripts_data = [];
            for (let script of user.scripts) {
                if (scripts.includes(script.script_id)) {
                    for (let scriptData of script.data) {
                        if (scriptData.year == new Date().getFullYear())
                            for (let month of scriptData.months) {
                                if (month.num == req.params.month_num) {
                                    user_scripts_data.push({
                                        script_id: script.script_id,
                                        vpc: month.vpc
                                    });
                                }
                            }
                    }
                }
            }
            console.log(user_scripts_data);
            let MSVPC = 0;
            user_scripts_data.forEach((data) => {
                MSVPC = MSVPC + data.vpc;
            });
            user_scripts_data.forEach((data) => {
                let x2 = data.vpc / MSVPC;
                let x3 = x2 * 5;
                let x4 = x3 * 0.5;
                total_pay = total_pay + x4;
                console.log(total_pay);
            });
            result = total_pay.toFixed(2);
        }
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Analytics getted', result));
});
exports.getPublisherPayFromAnalytics = getPublisherPayFromAnalytics;
const getPublisherAllTimeViews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let result = 0;
    try {
        let analytics = yield models_1.publisher_analytics_model.findOne({
            publisher_id: req.params.publisher_id
        });
        if (!analytics)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Analytics for this record not found', {}));
        analytics.scripts.forEach((script) => {
            script.data.forEach((entry) => {
                entry.months.forEach((month) => {
                    result = result + month.opens;
                });
            });
        });
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Analytics getted', result));
});
exports.getPublisherAllTimeViews = getPublisherAllTimeViews;
const getPublisherPayForMonths = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let result = [];
    try {
        let analytics = yield models_1.user_analytics_model.find();
        if (!analytics)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Analytics for this record not found', {}));
        const publisher = yield models_1.publisher_model.findOne({
            _id: req.params.publisher_id
        });
        if (!publisher)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Analytics for this record not found', {}));
        let scripts = publisher.scripts;
        for (let i = 0; i <= 11; i++) {
            let total_pay = 0;
            for (let user of analytics) {
                let user_scripts_data = [];
                for (let script of user.scripts) {
                    if (scripts.includes(script.script_id)) {
                        for (let scriptData of script.data) {
                            if (scriptData.year == new Date().getFullYear())
                                for (let month of scriptData.months) {
                                    if (month.num == i) {
                                        user_scripts_data.push({
                                            script_id: script.script_id,
                                            vpc: month.vpc
                                        });
                                    }
                                }
                        }
                    }
                }
                let MSVPC = 0;
                user_scripts_data.forEach((data) => {
                    MSVPC = MSVPC + data.vpc;
                });
                user_scripts_data.forEach((data) => {
                    let x2 = data.vpc / MSVPC;
                    let x3 = x2 * 5;
                    let x4 = x3 * 0.5;
                    total_pay = total_pay + x4;
                });
            }
            result.push(parseFloat(total_pay.toFixed(2)));
        }
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Analytics getted', result));
});
exports.getPublisherPayForMonths = getPublisherPayForMonths;
const getAdminTotalViews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let result = 0;
    try {
        let analytics = yield models_1.publisher_analytics_model.find();
        if (!analytics)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Analytics for this record not found', {}));
        if (req.params.type == '1') {
            for (let analytic of analytics) {
                for (let script of analytic.scripts) {
                    for (let year of script.data) {
                        if (year.year == new Date().getFullYear()) {
                            for (let month of year.months) {
                                if (month.num == new Date().getMonth()) {
                                    result = result + month.opens;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (req.params.type == '2') {
            for (let analytic of analytics) {
                for (let script of analytic.scripts) {
                    for (let year of script.data) {
                        if (year.year == new Date().getFullYear()) {
                            for (let month of year.months) {
                                result = result + month.opens;
                            }
                        }
                    }
                }
            }
        }
        if (req.params.type == '3') {
            for (let analytic of analytics) {
                for (let script of analytic.scripts) {
                    for (let year of script.data) {
                        for (let month of year.months) {
                            result = result + month.opens;
                        }
                    }
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Analytics getted', result));
});
exports.getAdminTotalViews = getAdminTotalViews;
const getAdminTotalPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let result = 0;
    try {
        let analytics = yield models_1.user_analytics_model.find();
        if (!analytics)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Analytics for this record not found', {}));
        const publishers = yield models_1.publisher_model.find();
        if (!publishers)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'Analytics for this record not found', {}));
        if (req.params.type == '1') {
            for (let publisher of publishers) {
                let scripts = publisher.scripts;
                let total_pay = 0;
                for (let user of analytics) {
                    let user_scripts_data = [];
                    for (let script of user.scripts) {
                        if (scripts.includes(script.script_id)) {
                            for (let scriptData of script.data) {
                                if (scriptData.year == new Date().getFullYear())
                                    for (let month of scriptData.months) {
                                        if (month.num == new Date().getMonth()) {
                                            user_scripts_data.push({
                                                script_id: script.script_id,
                                                vpc: month.vpc
                                            });
                                        }
                                    }
                            }
                        }
                    }
                    let MSVPC = 0;
                    user_scripts_data.forEach((data) => {
                        MSVPC = MSVPC + data.vpc;
                    });
                    user_scripts_data.forEach((data) => {
                        let x2 = data.vpc / MSVPC;
                        let x3 = x2 * 5;
                        let x4 = x3 * 0.5;
                        total_pay = total_pay + x4;
                    });
                }
                result = result + total_pay;
            }
        }
        if (req.params.type == '2') {
            for (let publisher of publishers) {
                let scripts = publisher.scripts;
                let total_pay = 0;
                for (let i = 0; i <= 11; i++) {
                    for (let user of analytics) {
                        let user_scripts_data = [];
                        for (let script of user.scripts) {
                            if (scripts.includes(script.script_id)) {
                                for (let scriptData of script.data) {
                                    if (scriptData.year ==
                                        new Date().getFullYear())
                                        for (let month of scriptData.months) {
                                            if (month.num == i) {
                                                user_scripts_data.push({
                                                    script_id: script.script_id,
                                                    vpc: month.vpc
                                                });
                                            }
                                        }
                                }
                            }
                        }
                        let MSVPC = 0;
                        user_scripts_data.forEach((data) => {
                            MSVPC = MSVPC + data.vpc;
                        });
                        user_scripts_data.forEach((data) => {
                            let x2 = data.vpc / MSVPC;
                            let x3 = x2 * 5;
                            let x4 = x3 * 0.5;
                            total_pay = total_pay + x4;
                        });
                    }
                }
                result = result + total_pay;
            }
        }
        if (req.params.type == '3') {
            for (let publisher of publishers) {
                let scripts = publisher.scripts;
                let total_pay = 0;
                for (let a = new Date().getFullYear() - 5; a <= new Date().getFullYear(); a++) {
                    console.log(a);
                    for (let i = 0; i <= 11; i++) {
                        for (let user of analytics) {
                            let user_scripts_data = [];
                            for (let script of user.scripts) {
                                if (scripts.includes(script.script_id)) {
                                    for (let scriptData of script.data) {
                                        if (scriptData.year == a)
                                            for (let month of scriptData.months) {
                                                if (month.num == i) {
                                                    user_scripts_data.push({
                                                        script_id: script.script_id,
                                                        vpc: month.vpc
                                                    });
                                                }
                                            }
                                    }
                                }
                            }
                            let MSVPC = 0;
                            user_scripts_data.forEach((data) => {
                                MSVPC = MSVPC + data.vpc;
                            });
                            user_scripts_data.forEach((data) => {
                                let x2 = data.vpc / MSVPC;
                                let x3 = x2 * 5;
                                let x4 = x3 * 0.5;
                                total_pay = total_pay + x4;
                            });
                        }
                    }
                }
                result = result + total_pay;
            }
        }
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Analytics getted', result));
});
exports.getAdminTotalPayments = getAdminTotalPayments;
const getAdminTotalProfits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let result = 0;
    try {
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Analytics getted', result));
});
exports.getAdminTotalProfits = getAdminTotalProfits;
//# sourceMappingURL=Analytics.controller.js.map