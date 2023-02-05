"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidator = [
    (0, express_validator_1.body)('email').exists().withMessage('email must exist').isEmail().withMessage('email must be email').trim(),
    (0, express_validator_1.body)('password')
        .exists()
        .withMessage('password must exist')
        .isString()
        .withMessage('password must be string')
        .notEmpty()
        .withMessage('password can not be empty')
        .trim()
];
//# sourceMappingURL=auth.validator.js.map