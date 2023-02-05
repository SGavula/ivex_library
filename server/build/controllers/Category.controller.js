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
exports.deleteCategory = exports.editCategory = exports.getCategoriesC = void 0;
const models_1 = require("../database/models");
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const getCategoriesC = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let categories;
    try {
        categories = yield models_1.category_model.find();
        if (!categories)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No categories found', {}));
    }
    catch (error) {
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res
        .status(200)
        .jsonp((0, helpers_1.response)(200, 'Categories getted', categories));
});
exports.getCategoriesC = getCategoriesC;
const editCategory = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let category;
    try {
        category = yield models_1.category_model.findOne({
            _id: req.params.cat_id
        });
        if (!category)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No category found', {}));
        if (req.body.name !== category.category_name) {
            const scripts = yield models_1.script_model.find({
                category: category.category_name
            });
            console.log(scripts);
            if (!scripts)
                return res
                    .status(400)
                    .jsonp((0, helpers_1.response)(400, 'No categories found', {}));
            for (let script of scripts) {
                script.category = req.body.name;
                yield script.save();
            }
        }
        category.category_name = req.body.name;
        yield category.save();
    }
    catch (error) {
        console.log(error);
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Categories getted', category));
});
exports.editCategory = editCategory;
const deleteCategory = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let category;
    try {
        category = yield models_1.category_model.findOne({
            _id: req.params.cat_id
        });
        if (!category)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No category found', {}));
        const scripts = yield models_1.script_model.find({
            category: category.category_name
        });
        if (!scripts)
            return res.status(400).jsonp((0, helpers_1.response)(400, 'No scripts found', {}));
        for (let script of scripts) {
            yield script.delete();
        }
        yield category.delete();
    }
    catch (error) {
        console.log(error);
        return res.status(400).jsonp((0, helpers_1.response)(400, 'TryCatch Error', error));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Categories getted', category));
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=Category.controller.js.map