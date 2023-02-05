"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserValidator = exports.sendContactEmailValidator = exports.passwordByTokenResetValidator = exports.userForgottenPasswordValidator = exports.userVerificationValidator = exports.editUserPasswordValidator = exports.getFavoriteScript = exports.unfavoriteScriptValidator = exports.editUserScriptDataValidator = exports.editUserValidator = exports.getUserValidator = exports.createUserValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createUserValidator = [
    (0, express_validator_1.body)('email')
        .exists()
        .withMessage('email must exist')
        .isEmail()
        .withMessage('email must be email')
        .isString()
        .withMessage('email must be string')
        .trim(),
    (0, express_validator_1.body)('password')
        .exists()
        .withMessage('password must exist')
        .isString()
        .withMessage('password must be string')
        .isLength({ min: 6 })
        .withMessage('Passowrd must be atleast 6 characters')
        .trim(),
    (0, express_validator_1.body)('first_name')
        .exists()
        .withMessage('first_name must exist')
        .isString()
        .withMessage('first_name must be string')
        .trim(),
    (0, express_validator_1.body)('last_name')
        .exists()
        .withMessage('last_name must exist')
        .isString()
        .withMessage('last_name must be string')
        .trim()
];
exports.getUserValidator = [
    (0, express_validator_1.param)('user_id')
        .exists()
        .withMessage('user_id must exists')
        .isString()
        .withMessage('user id must be string')
        .trim()
];
exports.editUserValidator = [
    (0, express_validator_1.param)('user_id')
        .exists()
        .withMessage('user_id must exists')
        .isString()
        .withMessage('user id must be string')
        .trim(),
    (0, express_validator_1.body)('first_name')
        .optional()
        .isString()
        .withMessage('first name must be string')
        .trim(),
    (0, express_validator_1.body)('last_name')
        .optional()
        .isString()
        .withMessage('last name must be string')
        .trim(),
    (0, express_validator_1.body)('address')
        .optional()
        .isString()
        .withMessage('address must be string')
        .trim(),
    (0, express_validator_1.body)('university')
        .optional()
        .isString()
        .withMessage('university must be string')
        .trim(),
    (0, express_validator_1.body)('faculty')
        .optional()
        .isString()
        .withMessage('faculty must be string')
        .trim(),
    (0, express_validator_1.body)('subject')
        .optional()
        .isString()
        .withMessage('subject must be string')
        .trim(),
    (0, express_validator_1.body)('year')
        .optional()
        .isString()
        .withMessage('year must be string')
        .trim(),
    (0, express_validator_1.body)('gender')
        .optional()
        .isString()
        .withMessage('gender must be string')
        .trim(),
    (0, express_validator_1.body)('favorite_subjects')
        .optional()
        .isArray()
        .withMessage('favorite subjects must be array')
];
exports.editUserScriptDataValidator = [
    (0, express_validator_1.param)('user_id')
        .exists()
        .withMessage('user_id must exists')
        .isString()
        .withMessage('user id must be string')
        .trim(),
    (0, express_validator_1.body)('reqtype')
        .exists()
        .withMessage('reqtype must exist')
        .isInt({ min: 1, max: 2 })
        .withMessage('reqtype must be int from 1 to 2')
        .toInt(),
    (0, express_validator_1.body)('script_id')
        .exists()
        .withMessage('script_id must exist')
        .isString()
        .withMessage('script_id must be string')
];
exports.unfavoriteScriptValidator = [
    (0, express_validator_1.param)('user_id')
        .exists()
        .withMessage('user_id must exists')
        .isString()
        .withMessage('user id must be string')
        .trim(),
    (0, express_validator_1.param)('script_id')
        .exists()
        .withMessage('script_id must exist')
        .isString()
        .withMessage('script_id must be string')
];
exports.getFavoriteScript = [
    (0, express_validator_1.param)('user_id')
        .exists()
        .withMessage('user_id must exists')
        .isString()
        .withMessage('user id must be string')
        .trim(),
    (0, express_validator_1.param)('script_id')
        .exists()
        .withMessage('script_id must exist')
        .isString()
        .withMessage('script_id must be string')
];
exports.editUserPasswordValidator = [
    (0, express_validator_1.body)('password')
        .exists()
        .withMessage('new password must exist')
        .isString()
        .withMessage('new password must be string')
        .trim(),
    (0, express_validator_1.param)('user_id')
        .exists()
        .withMessage('user_id must exists')
        .isString()
        .withMessage('user id must be string')
        .trim()
];
exports.userVerificationValidator = [
    (0, express_validator_1.param)('token')
        .exists()
        .withMessage('token must exist')
        .isString()
        .withMessage('token must be string')
        .isLength({ min: 20, max: 20 })
        .withMessage('Token must be 20 characters')
        .trim()
];
exports.userForgottenPasswordValidator = [
    (0, express_validator_1.body)('email')
        .exists()
        .withMessage('email must exist')
        .isEmail()
        .withMessage('email must be email')
        .isString()
        .withMessage('email must be string')
        .trim()
];
exports.passwordByTokenResetValidator = [
    (0, express_validator_1.body)('token')
        .exists()
        .withMessage('token must exist')
        .isString()
        .withMessage('token must be string')
        .isLength({ min: 24, max: 24 })
        .withMessage('Token must be 24 characters')
        .trim(),
    (0, express_validator_1.body)('password')
        .exists()
        .withMessage('new password must exist')
        .isString()
        .withMessage('new password must be string')
        .trim()
];
exports.sendContactEmailValidator = [
    (0, express_validator_1.body)('name')
        .exists()
        .withMessage('name must exist')
        .isString()
        .withMessage('name must be string')
        .trim(),
    (0, express_validator_1.body)('email')
        .exists()
        .withMessage('email must exist')
        .isEmail()
        .withMessage('email must be string')
        .trim(),
    (0, express_validator_1.body)('message')
        .exists()
        .withMessage('message must exist')
        .isString()
        .withMessage('message must be string')
        .trim()
];
exports.deleteUserValidator = [
    (0, express_validator_1.param)('user_id')
        .exists()
        .withMessage('user_id must exists')
        .isString()
        .withMessage('user id must be string')
        .trim()
];
//# sourceMappingURL=User.validator.js.map