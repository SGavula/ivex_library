"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminValidator = exports.editAdminValidator = exports.createAdminValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createAdminValidator = [
    (0, express_validator_1.body)('email')
        .exists()
        .withMessage('email must exist')
        .isEmail()
        .withMessage('email must be email')
        .isString()
        .withMessage('email must be string')
        .trim()
];
exports.editAdminValidator = [
    (0, express_validator_1.param)('admin_id')
        .exists()
        .withMessage('admin id must exist')
        .isString()
        .withMessage('admin id must be string')
        .trim(),
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
exports.getAdminValidator = [
    (0, express_validator_1.param)('admin_id')
        .exists()
        .withMessage('param admin_id must exist')
        .isString()
        .withMessage('param admin_id must be string')
        .trim()
];
//# sourceMappingURL=Admin.validator.js.map