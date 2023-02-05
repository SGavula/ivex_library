import { body, param } from 'express-validator';

export const createUserValidator = [
	body('email')
		.exists()
		.withMessage('email must exist')
		.isEmail()
		.withMessage('email must be email')
		.isString()
		.withMessage('email must be string')
		.trim(),

	body('password')
		.exists()
		.withMessage('password must exist')
		.isString()
		.withMessage('password must be string')
		.isLength({ min: 6 })
		.withMessage('Passowrd must be atleast 6 characters')
		.trim(),

	body('first_name')
		.exists()
		.withMessage('first_name must exist')
		.isString()
		.withMessage('first_name must be string')
		.trim(),

	body('last_name')
		.exists()
		.withMessage('last_name must exist')
		.isString()
		.withMessage('last_name must be string')
		.trim()
];

export const getUserValidator = [
	param('user_id')
		.exists()
		.withMessage('user_id must exists')
		.isString()
		.withMessage('user id must be string')
		.trim()
];

export const editUserValidator = [
	param('user_id')
		.exists()
		.withMessage('user_id must exists')
		.isString()
		.withMessage('user id must be string')
		.trim(),
	body('first_name')
		.optional()
		.isString()
		.withMessage('first name must be string')
		.trim(),
	body('last_name')
		.optional()
		.isString()
		.withMessage('last name must be string')
		.trim(),
	body('address')
		.optional()
		.isString()
		.withMessage('address must be string')
		.trim(),
	body('university')
		.optional()
		.isString()
		.withMessage('university must be string')
		.trim(),
	body('faculty')
		.optional()
		.isString()
		.withMessage('faculty must be string')
		.trim(),
	body('subject')
		.optional()
		.isString()
		.withMessage('subject must be string')
		.trim(),
	body('year')
		.optional()
		.isString()
		.withMessage('year must be string')
		.trim(),
	body('gender')
		.optional()
		.isString()
		.withMessage('gender must be string')
		.trim(),
	body('favorite_subjects')
		.optional()
		.isArray()
		.withMessage('favorite subjects must be array')
];

export const editUserScriptDataValidator = [
	param('user_id')
		.exists()
		.withMessage('user_id must exists')
		.isString()
		.withMessage('user id must be string')
		.trim(),

	body('reqtype')
		.exists()
		.withMessage('reqtype must exist')
		.isInt({ min: 1, max: 2 })
		.withMessage('reqtype must be int from 1 to 2')
		.toInt(),

	body('script_id')
		.exists()
		.withMessage('script_id must exist')
		.isString()
		.withMessage('script_id must be string')
];

export const unfavoriteScriptValidator = [
	param('user_id')
		.exists()
		.withMessage('user_id must exists')
		.isString()
		.withMessage('user id must be string')
		.trim(),

	param('script_id')
		.exists()
		.withMessage('script_id must exist')
		.isString()
		.withMessage('script_id must be string')
];

export const getFavoriteScript = [
	param('user_id')
		.exists()
		.withMessage('user_id must exists')
		.isString()
		.withMessage('user id must be string')
		.trim(),

	param('script_id')
		.exists()
		.withMessage('script_id must exist')
		.isString()
		.withMessage('script_id must be string')
];

export const editUserPasswordValidator = [
	body('password')
		.exists()
		.withMessage('new password must exist')
		.isString()
		.withMessage('new password must be string')
		.trim(),

	param('user_id')
		.exists()
		.withMessage('user_id must exists')
		.isString()
		.withMessage('user id must be string')
		.trim()
];

export const userVerificationValidator = [
	param('token')
		.exists()
		.withMessage('token must exist')
		.isString()
		.withMessage('token must be string')
		.isLength({ min: 20, max: 20 })
		.withMessage('Token must be 20 characters')
		.trim()
];

export const userForgottenPasswordValidator = [
	body('email')
		.exists()
		.withMessage('email must exist')
		.isEmail()
		.withMessage('email must be email')
		.isString()
		.withMessage('email must be string')
		.trim()
];

export const passwordByTokenResetValidator = [
	body('token')
		.exists()
		.withMessage('token must exist')
		.isString()
		.withMessage('token must be string')
		.isLength({ min: 24, max: 24 })
		.withMessage('Token must be 24 characters')
		.trim(),

	body('password')
		.exists()
		.withMessage('new password must exist')
		.isString()
		.withMessage('new password must be string')
		.trim()
];

export const sendContactEmailValidator = [
	body('name')
		.exists()
		.withMessage('name must exist')
		.isString()
		.withMessage('name must be string')
		.trim(),

	body('email')
		.exists()
		.withMessage('email must exist')
		.isEmail()
		.withMessage('email must be string')
		.trim(),

	body('message')
		.exists()
		.withMessage('message must exist')
		.isString()
		.withMessage('message must be string')
		.trim()
];

export const deleteUserValidator = [
	param('user_id')
		.exists()
		.withMessage('user_id must exists')
		.isString()
		.withMessage('user id must be string')
		.trim()
];
