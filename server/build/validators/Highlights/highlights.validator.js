"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserScriptPageValidator = exports.saveUserScriptPageValidator = exports.gethighlightValidator = exports.createHighlightValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createHighlightValidator = [
    (0, express_validator_1.param)('script_id')
        .exists()
        .withMessage('script id must exist')
        .isString()
        .withMessage('script id must be string')
        .trim(),
    (0, express_validator_1.body)('user_id')
        .exists()
        .withMessage('user id must exist')
        .isString()
        .withMessage('user id must be string')
        .trim(),
    (0, express_validator_1.body)('page')
        .exists()
        .withMessage('page number must exist')
        .isInt()
        .withMessage('page number must be integer')
        .toInt(),
    (0, express_validator_1.body)('textLayer')
        .exists()
        .withMessage('outerHTML must exist')
        .isString()
        .withMessage('outerHTML must be string')
        .trim()
];
exports.gethighlightValidator = [
    (0, express_validator_1.param)('script_id')
        .exists()
        .withMessage('script id must exist')
        .isString()
        .withMessage('script id must be string')
        .trim(),
    (0, express_validator_1.param)('user_id')
        .exists()
        .withMessage('user id must exist')
        .isString()
        .withMessage('user id must be string')
        .trim()
];
exports.saveUserScriptPageValidator = [
    (0, express_validator_1.param)('script_id')
        .exists()
        .withMessage('script id must exist')
        .isString()
        .withMessage('script id must be string')
        .trim(),
    (0, express_validator_1.param)('user_id')
        .exists()
        .withMessage('user id must exist')
        .isString()
        .withMessage('user id must be string')
        .trim(),
    (0, express_validator_1.body)('page')
        .optional()
        .isInt()
        .withMessage('page number must be integer')
        .toInt(),
    (0, express_validator_1.body)('dark_mode')
        .optional()
        .isBoolean()
        .withMessage('dark mode must be boolean')
];
exports.getUserScriptPageValidator = [
    (0, express_validator_1.param)('script_id')
        .exists()
        .withMessage('script id must exist')
        .isString()
        .withMessage('script id must be string')
        .trim(),
    (0, express_validator_1.param)('user_id')
        .exists()
        .withMessage('user id must exist')
        .isString()
        .withMessage('user id must be string')
        .trim()
];
//# sourceMappingURL=highlights.validator.js.map