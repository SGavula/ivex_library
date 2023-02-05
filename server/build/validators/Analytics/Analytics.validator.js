"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScriptAnalyticsEntryValidator = exports.createAnalyticsEntryValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createAnalyticsEntryValidator = [
    (0, express_validator_1.body)('script_id')
        .exists()
        .withMessage('Script_id must exist')
        .isString()
        .withMessage('script_id must be string')
        .trim(),
    (0, express_validator_1.body)('user_id')
        .exists()
        .withMessage('user_id must exist')
        .isString()
        .withMessage('user_id must be string')
        .trim(),
    (0, express_validator_1.body)('pages')
        .exists()
        .withMessage('pages must exist')
        .isInt()
        .withMessage('pages must be int')
        .toInt(),
    (0, express_validator_1.body)('full_pages')
        .exists()
        .withMessage('full_pages must exist')
        .isInt()
        .withMessage('full_pages must be int')
        .toInt()
];
exports.createScriptAnalyticsEntryValidator = [
    (0, express_validator_1.body)('publisher_id')
        .exists()
        .withMessage('publisher_id must exist')
        .isString()
        .withMessage('publisher id must be string')
        .trim(),
    (0, express_validator_1.param)('script_id')
        .exists()
        .withMessage('Script_id must exist')
        .isString()
        .withMessage('script_id must be string')
        .trim()
];
//# sourceMappingURL=Analytics.validator.js.map