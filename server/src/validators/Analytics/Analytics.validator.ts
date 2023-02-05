import { body, param } from 'express-validator';

export const createAnalyticsEntryValidator = [
	body('script_id')
		.exists()
		.withMessage('Script_id must exist')
		.isString()
		.withMessage('script_id must be string')
		.trim(),

	body('user_id')
		.exists()
		.withMessage('user_id must exist')
		.isString()
		.withMessage('user_id must be string')
		.trim(),

	body('pages')
		.exists()
		.withMessage('pages must exist')
		.isInt()
		.withMessage('pages must be int')
		.toInt(),

	body('full_pages')
		.exists()
		.withMessage('full_pages must exist')
		.isInt()
		.withMessage('full_pages must be int')
		.toInt()
];

export const createScriptAnalyticsEntryValidator = [
	body('publisher_id')
		.exists()
		.withMessage('publisher_id must exist')
		.isString()
		.withMessage('publisher id must be string')
		.trim(),

	param('script_id')
		.exists()
		.withMessage('Script_id must exist')
		.isString()
		.withMessage('script_id must be string')
		.trim()
];
