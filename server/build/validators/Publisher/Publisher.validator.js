"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePublisherValidator = exports.requestScriptChangeValidator = exports.editPublisherPasswordValidator = exports.publisherIdValidator = exports.editPublisherValidator = exports.createPublisherValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createPublisherValidator = [
    (0, express_validator_1.body)('email')
        .exists()
        .withMessage('email must exist')
        .isEmail()
        .withMessage('email must be email')
        .isString()
        .withMessage('email must be string')
        .trim(),
    (0, express_validator_1.body)('name')
        .exists()
        .withMessage('name must exist')
        .isString()
        .withMessage('name must be string')
        .trim()
];
exports.editPublisherValidator = [
    (0, express_validator_1.body)('email')
        .optional()
        .isEmail()
        .withMessage('email must be email')
        .isString()
        .withMessage('email must be string')
        .trim(),
    (0, express_validator_1.body)('name')
        .optional()
        .isString()
        .withMessage('name must be string')
        .trim(),
    (0, express_validator_1.body)('password')
        .optional()
        .isString()
        .withMessage('password must be string')
        .trim()
];
exports.publisherIdValidator = [
    (0, express_validator_1.param)('publisher_id')
        .exists()
        .withMessage('param publisher id must exist')
        .isString()
        .withMessage('param publisher_id must be string')
        .trim()
];
exports.editPublisherPasswordValidator = [
    (0, express_validator_1.param)('publisher_id')
        .exists()
        .withMessage('param publisher id must exist')
        .isString()
        .withMessage('param publisher_id must be string')
        .trim(),
    (0, express_validator_1.body)('password')
        .exists()
        .withMessage('Publisher pass must exist')
        .isString()
        .withMessage('Password must be string')
        .trim()
];
exports.requestScriptChangeValidator = [
    (0, express_validator_1.param)('publisher_id')
        .exists()
        .withMessage('param publisher id must exist')
        .isString()
        .withMessage('param publisher_id must be string')
        .trim(),
    (0, express_validator_1.body)('script_id')
        .exists()
        .withMessage('Script_id must exist')
        .isString()
        .withMessage('Script_id must be string')
        .trim(),
    (0, express_validator_1.body)('message')
        .exists()
        .withMessage('Message must exist')
        .isString()
        .withMessage('Message must be string')
        .trim()
];
exports.deletePublisherValidator = [
    (0, express_validator_1.param)('publisher_id')
        .exists()
        .withMessage('publisher_id must exists')
        .isString()
        .withMessage('publisher_id must be string')
        .trim()
];
//# sourceMappingURL=Publisher.validator.js.map