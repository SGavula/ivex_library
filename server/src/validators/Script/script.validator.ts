import { body, param } from 'express-validator';

export const createScriptValidator = [
	body('name')
		.exists()
		.withMessage('name must exists')
		.isString()
		.withMessage('name must be string')
		.trim(),

	body('category')
		.exists()
		.withMessage('category must exists')
		.isString()
		.withMessage('category must be string'),

	body('year')
		.exists()
		.withMessage('year must exists')
		.isInt()
		.withMessage('year must be int')
		.toInt(),

	body('info')
		.exists()
		.withMessage('info must exists')
		.isString()
		.withMessage('info must be string')
		.trim(),

	body('publishing')
		.exists()
		.withMessage('Vydavatelsto musi existovat')
		.isString()
		.withMessage('Vydavatelstvo musi byt string')
		.trim(),

	body('city')
		.exists()
		.withMessage('Mesto musi existovat')
		.isString()
		.withMessage('Mesto musi byt string')
		.trim(),

	body('author').exists().withMessage('author must exists').trim(),

	body('keywords').exists().withMessage('keywords must exists').trim()
];

export const getScriptValidator = [
	param('script_id')
		.exists()
		.withMessage('script id must exists')
		.isString()
		.withMessage('script id must be string')
		.trim()
];

export const getScriptsByCategoryValidator = [
	param('tag')
		.exists()
		.withMessage('tag must exists')
		.isString()
		.withMessage('tag must be string')
		.trim(),

	param('limit')
		.exists()
		.withMessage('tag must exists')
		.isInt()
		.withMessage('tag must be int')
		.toInt()
];

export const getScriptsByIdsValidator = [
	body('scripts')
		.exists()
		.withMessage('scripts must exist')
		.isArray()
		.withMessage('scripts must be an array')
];

export const editScriptValidator = [
	param('script_id')
		.exists()
		.withMessage('script_id must exist')
		.isString()
		.withMessage('script_id must be string')
		.trim(),

	body('name')
		.optional()
		.isString()
		.withMessage('name must be string')
		.trim(),

	body('category')
		.optional()
		.isString()
		.withMessage('category must be string')
		.trim(),

	body('year').optional().isInt().withMessage('year must be int').toInt(),

	body('isbn')
		.optional()
		.isString()
		.withMessage('isbn must be string')
		.trim(),

	body('info')
		.optional()
		.isString()
		.withMessage('info must be string')
		.trim(),

	body('publishing')
		.optional()
		.isString()
		.withMessage('Vydavatelstvo musi byt string')
		.trim(),

	body('city')
		.optional()
		.isString()
		.withMessage('Mesto musi byt string')
		.trim()
];
