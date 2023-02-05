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
exports.getUserScriptConfig = exports.saveUserScriptConfig = exports.getHighlight = exports.createHighlight = void 0;
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const models_1 = require("../database/models");
const createHighlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let highlights;
    try {
        let user = yield models_1.user_model.findOne({ _id: req.body.user_id });
        let script = yield models_1.script_model.findOne({
            _id: req.params.script_id
        });
        console.log(user, script);
        if (!user || !script)
            return res
                .status(404)
                .jsonp((0, helpers_1.response)(404, 'No user or script with that id', []));
        highlights = yield models_1.highlightsModel.findOne({
            script_id: req.params.script_id,
            user_id: req.body.user_id
        });
        if (!highlights) {
            highlights = new models_1.highlightsModel({
                script_id: req.params.script_id,
                user_id: req.body.user_id,
                highlights: [
                    {
                        page: req.body.page,
                        highlights: req.body.textLayer
                    }
                ]
            });
        }
        else if (highlights.highlights.findIndex((highlight) => highlight.page == req.body.page) !== -1) {
            let index = highlights.highlights.findIndex((highlight) => highlight.page == req.body.page);
            highlights.highlights[index].highlights = req.body.textLayer;
        }
        else {
            let highlightObject = {
                page: req.body.page,
                highlights: req.body.textLayer
            };
            highlights.highlights.push(highlightObject);
        }
        yield highlights.save();
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res
        .status(200)
        .jsonp((0, helpers_1.response)(200, 'Highlight created', highlights));
});
exports.createHighlight = createHighlight;
const getHighlight = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let result;
    try {
        let highlights = yield models_1.highlightsModel.findOne({
            script_id: req.params.script_id,
            user_id: req.params.user_id
        });
        if (!highlights)
            return res
                .status(404)
                .jsonp((0, helpers_1.response)(404, 'Highlights for this script by this user were not yet created'));
        console.log(highlights);
        result = highlights.highlights;
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Getted highlight', result));
});
exports.getHighlight = getHighlight;
const saveUserScriptConfig = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let model;
    try {
        let user = yield models_1.user_model.findOne({ _id: req.params.user_id });
        let script = yield models_1.script_model.findOne({ _id: req.params.script_id });
        if (!user || !script)
            return res
                .status(404)
                .jsonp((0, helpers_1.response)(404, 'No user or script with that id', {}));
        let page = req.body.page;
        model = yield models_1.highlightsModel.findOne({
            script_id: req.params.script_id,
            user_id: req.params.user_id
        });
        if (!model) {
            model = new models_1.highlightsModel({
                script_id: req.params.script_id,
                user_id: req.params.user_id
            });
        }
        model.last_page = page;
        model.dark_mode = req.body.dark_mode;
        model.info = req.body.info;
        model.save();
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Page saved', model));
});
exports.saveUserScriptConfig = saveUserScriptConfig;
const getUserScriptConfig = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let result;
    try {
        let model = yield models_1.highlightsModel.findOne({
            script_id: req.params.script_id,
            user_id: req.params.user_id
        });
        if (!model)
            return res.status(200).jsonp((0, helpers_1.response)(200, 'User havent opened this script', {
                page: 1,
                dark_mode: false
            }));
        result = {
            page: model.last_page,
            dark_mode: model.dark_mode
        };
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Page getted', result));
});
exports.getUserScriptConfig = getUserScriptConfig;
//# sourceMappingURL=Highlights.controller.js.map