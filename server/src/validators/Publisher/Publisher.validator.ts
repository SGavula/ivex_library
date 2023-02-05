import { body, param } from 'express-validator';

export const createPublisherValidator = [
	body('email')
		.exists()
		.withMessage('email must exist')
		.isEmail()
		.withMessage('email must be email')
		.isString()
		.withMessage('email must be string')
		.trim(),

	body('name')
		.exists()
		.withMessage('name must exist')
		.isString()
		.withMessage('name must be string')
		.trim()
];

export const editPublisherValidator = [
	body('email')
		.optional()
		.isEmail()
		.withMessage('email must be email')
		.isString()
		.withMessage('email must be string')
		.trim(),

	body('name')
		.optional()
		.isString()
		.withMessage('name must be string')
		.trim(),

	body('password')
		.optional()
		.isString()
		.withMessage('password must be string')
		.trim()
];

export const publisherIdValidator = [
	param('publisher_id')
		.exists()
		.withMessage('param publisher id must exist')
		.isString()
		.withMessage('param publisher_id must be string')
		.trim()
];

export const editPublisherPasswordValidator = [
	param('publisher_id')
		.exists()
		.withMessage('param publisher id must exist')
		.isString()
		.withMessage('param publisher_id must be string')
		.trim(),

	body('password')
		.exists()
		.withMessage('Publisher pass must exist')
		.isString()
		.withMessage('Password must be string')
		.trim()
];

export const requestScriptChangeValidator = [
	param('publisher_id')
		.exists()
		.withMessage('param publisher id must exist')
		.isString()
		.withMessage('param publisher_id must be string')
		.trim(),

	body('script_id')
		.exists()
		.withMessage('Script_id must exist')
		.isString()
		.withMessage('Script_id must be string')
		.trim(),

	body('message')
		.exists()
		.withMessage('Message must exist')
		.isString()
		.withMessage('Message must be string')
		.trim()
];

export const deletePublisherValidator = [
	param('publisher_id')
		.exists()
		.withMessage('publisher_id must exists')
		.isString()
		.withMessage('publisher_id must be string')
		.trim()
];
