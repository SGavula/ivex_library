import { body, param } from 'express-validator';

export const createAdminValidator = [
	body('email')
		.exists()
		.withMessage('email must exist')
		.isEmail()
		.withMessage('email must be email')
		.isString()
		.withMessage('email must be string')
		.trim()
];

export const editAdminValidator = [
	param('admin_id')
		.exists()
		.withMessage('admin id must exist')
		.isString()
		.withMessage('admin id must be string')
		.trim(),

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

export const getAdminValidator = [
	param('admin_id')
		.exists()
		.withMessage('param admin_id must exist')
		.isString()
		.withMessage('param admin_id must be string')
		.trim()
];
