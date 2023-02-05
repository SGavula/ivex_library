import { body } from 'express-validator';

export const loginValidator = [
	body('email').exists().withMessage('email must exist').isEmail().withMessage('email must be email').trim(),
	body('password')
		.exists()
		.withMessage('password must exist')
		.isString()
		.withMessage('password must be string')
		.notEmpty()
		.withMessage('password can not be empty')
		.trim()
];
