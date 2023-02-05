import {
	CategoryInterface,
	category_model,
	ScriptInterface,
	script_model
} from '../database/models';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { response } from '../helpers';

export const getCategoriesC = async (
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let categories: Array<CategoryInterface> | undefined;
	try {
		categories = await category_model.find();

		if (!categories)
			return res
				.status(400)
				.jsonp(response(400, 'No categories found', {}));
	} catch (error) {
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res
		.status(200)
		.jsonp(response(200, 'Categories getted', categories));
};

export const editCategory = async (
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let category: CategoryInterface | undefined;
	try {
		category = await category_model.findOne({
			_id: req.params.cat_id
		});

		if (!category)
			return res
				.status(400)
				.jsonp(response(400, 'No category found', {}));

		// Edit existing scripts
		if (req.body.name !== category.category_name) {
			const scripts: Array<ScriptInterface> = await script_model.find({
				category: category.category_name
			});

			console.log(scripts);

			if (!scripts)
				return res
					.status(400)
					.jsonp(response(400, 'No categories found', {}));

			for (let script of scripts) {
				script.category = req.body.name;
				await script.save();
			}
		}

		category.category_name = req.body.name;
		await category.save();
	} catch (error) {
		console.log(error);
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(response(200, 'Categories getted', category));
};

export const deleteCategory = async (
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let category: CategoryInterface | undefined;
	try {
		category = await category_model.findOne({
			_id: req.params.cat_id
		});

		if (!category)
			return res
				.status(400)
				.jsonp(response(400, 'No category found', {}));

		// Delete existing scripts
		const scripts: Array<ScriptInterface> = await script_model.find({
			category: category.category_name
		});

		if (!scripts)
			return res.status(400).jsonp(response(400, 'No scripts found', {}));

		for (let script of scripts) {
			await script.delete();
		}

		await category.delete();
	} catch (error) {
		console.log(error);
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(response(200, 'Categories getted', category));
};
