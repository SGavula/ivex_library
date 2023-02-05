import { body, param } from 'express-validator';

export const createHighlightValidator = [
	param('script_id')
		.exists()
		.withMessage('script id must exist')
		.isString()
		.withMessage('script id must be string')
		.trim(),

	body('user_id')
		.exists()
		.withMessage('user id must exist')
		.isString()
		.withMessage('user id must be string')
		.trim(),

	body('page')
		.exists()
		.withMessage('page number must exist')
		.isInt()
		.withMessage('page number must be integer')
		.toInt(),

	body('textLayer')
		.exists()
		.withMessage('outerHTML must exist')
		.isString()
		.withMessage('outerHTML must be string')
		.trim()
];

export const gethighlightValidator = [
	param('script_id')
		.exists()
		.withMessage('script id must exist')
		.isString()
		.withMessage('script id must be string')
		.trim(),

	param('user_id')
		.exists()
		.withMessage('user id must exist')
		.isString()
		.withMessage('user id must be string')
		.trim()
];

export const saveUserScriptPageValidator = [
	param('script_id')
		.exists()
		.withMessage('script id must exist')
		.isString()
		.withMessage('script id must be string')
		.trim(),

	param('user_id')
		.exists()
		.withMessage('user id must exist')
		.isString()
		.withMessage('user id must be string')
		.trim(),

	body('page')
		.optional()
		.isInt()
		.withMessage('page number must be integer')
		.toInt(),

	body('dark_mode')
		.optional()
		.isBoolean()
		.withMessage('dark mode must be boolean')
];

export const getUserScriptPageValidator = [
	param('script_id')
		.exists()
		.withMessage('script id must exist')
		.isString()
		.withMessage('script id must be string')
		.trim(),

	param('user_id')
		.exists()
		.withMessage('user id must exist')
		.isString()
		.withMessage('user id must be string')
		.trim()
];
