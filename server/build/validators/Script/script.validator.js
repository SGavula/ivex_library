"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editScriptValidator = exports.getScriptsByIdsValidator = exports.getScriptsByCategoryValidator = exports.getScriptValidator = exports.createScriptValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createScriptValidator = [
    (0, express_validator_1.body)('name')
        .exists()
        .withMessage('name must exists')
        .isString()
        .withMessage('name must be string')
        .trim(),
    (0, express_validator_1.body)('category')
        .exists()
        .withMessage('category must exists')
        .isString()
        .withMessage('category must be string'),
    (0, express_validator_1.body)('year')
        .exists()
        .withMessage('year must exists')
        .isInt()
        .withMessage('year must be int')
        .toInt(),
    (0, express_validator_1.body)('info')
        .exists()
        .withMessage('info must exists')
        .isString()
        .withMessage('info must be string')
        .trim(),
    (0, express_validator_1.body)('publishing')
        .exists()
        .withMessage('Vydavatelsto musi existovat')
        .isString()
        .withMessage('Vydavatelstvo musi byt string')
        .trim(),
    (0, express_validator_1.body)('city')
        .exists()
        .withMessage('Mesto musi existovat')
        .isString()
        .withMessage('Mesto musi byt string')
        .trim(),
    (0, express_validator_1.body)('author').exists().withMessage('author must exists').trim(),
    (0, express_validator_1.body)('keywords').exists().withMessage('keywords must exists').trim()
];
exports.getScriptValidator = [
    (0, express_validator_1.param)('script_id')
        .exists()
        .withMessage('script id must exists')
        .isString()
        .withMessage('script id must be string')
        .trim()
];
exports.getScriptsByCategoryValidator = [
    (0, express_validator_1.param)('tag')
        .exists()
        .withMessage('tag must exists')
        .isString()
        .withMessage('tag must be string')
        .trim(),
    (0, express_validator_1.param)('limit')
        .exists()
        .withMessage('tag must exists')
        .isInt()
        .withMessage('tag must be int')
        .toInt()
];
exports.getScriptsByIdsValidator = [
    (0, express_validator_1.body)('scripts')
        .exists()
        .withMessage('scripts must exist')
        .isArray()
        .withMessage('scripts must be an array')
];
exports.editScriptValidator = [
    (0, express_validator_1.param)('script_id')
        .exists()
        .withMessage('script_id must exist')
        .isString()
        .withMessage('script_id must be string')
        .trim(),
    (0, express_validator_1.body)('name')
        .optional()
        .isString()
        .withMessage('name must be string')
        .trim(),
    (0, express_validator_1.body)('category')
        .optional()
        .isString()
        .withMessage('category must be string')
        .trim(),
    (0, express_validator_1.body)('year').optional().isInt().withMessage('year must be int').toInt(),
    (0, express_validator_1.body)('isbn')
        .optional()
        .isString()
        .withMessage('isbn must be string')
        .trim(),
    (0, express_validator_1.body)('info')
        .optional()
        .isString()
        .withMessage('info must be string')
        .trim(),
    (0, express_validator_1.body)('publishing')
        .optional()
        .isString()
        .withMessage('Vydavatelstvo musi byt string')
        .trim(),
    (0, express_validator_1.body)('city')
        .optional()
        .isString()
        .withMessage('Mesto musi byt string')
        .trim()
];
//# sourceMappingURL=script.validator.js.map