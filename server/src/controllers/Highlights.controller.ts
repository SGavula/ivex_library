import { validationResult } from 'express-validator';
import { response } from '../helpers';
import { Request, Response } from 'express';
import { highlightsModel, script_model, user_model } from '../database/models';

export const createHighlight = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let highlights: any;
	try {
		let user = await user_model.findOne({ _id: req.body.user_id });
		let script = await script_model.findOne({
			_id: req.params.script_id
		});
		console.log(user, script);
		if (!user || !script)
			return res
				.status(404)
				.jsonp(response(404, 'No user or script with that id', []));
		// Find highlight
		highlights = await highlightsModel.findOne({
			script_id: req.params.script_id,
			user_id: req.body.user_id
		});
		// If there isnt matching highligt, create one
		if (!highlights) {
			highlights = new highlightsModel({
				script_id: req.params.script_id,
				user_id: req.body.user_id,
				highlights: [
					{
						page: req.body.page,
						highlights: req.body.textLayer
					}
				]
			});
		} else if (
			highlights.highlights.findIndex(
				(highlight: { page: Number }) => highlight.page == req.body.page
			) !== -1
		) {
			// Find index
			let index = highlights.highlights.findIndex(
				(highlight: { page: Number }) => highlight.page == req.body.page
			);
			highlights.highlights[index].highlights = req.body.textLayer;
		} else {
			let highlightObject = {
				page: req.body.page,
				highlights: req.body.textLayer
			};
			highlights.highlights.push(highlightObject);
		}
		await highlights.save();
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res
		.status(200)
		.jsonp(response(200, 'Highlight created', highlights));
};

export const getHighlight = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let result: any;
	try {
		// Find highlight
		let highlights: any = await highlightsModel.findOne({
			script_id: req.params.script_id,
			user_id: req.params.user_id
		});
		if (!highlights)
			return res
				.status(404)
				.jsonp(
					response(
						404,
						'Highlights for this script by this user were not yet created'
					)
				);

		console.log(highlights);

		result = highlights.highlights;
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Getted highlight', result));
};

export const saveUserScriptConfig = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let model: any;
	try {
		let user = await user_model.findOne({ _id: req.params.user_id });
		let script = await script_model.findOne({ _id: req.params.script_id });

		if (!user || !script)
			return res
				.status(404)
				.jsonp(response(404, 'No user or script with that id', {}));

		let page = req.body.page;
		model = await highlightsModel.findOne({
			script_id: req.params.script_id,
			user_id: req.params.user_id
		});

		if (!model) {
			model = new highlightsModel({
				script_id: req.params.script_id,
				user_id: req.params.user_id
			});
		}

		model.last_page = page;
		model.dark_mode = req.body.dark_mode;
		model.info = req.body.info;
		model.save();
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Page saved', model));
};

export const getUserScriptConfig = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let result: Object;
	try {
		let model: any = await highlightsModel.findOne({
			script_id: req.params.script_id,
			user_id: req.params.user_id
		});

		if (!model)
			return res.status(200).jsonp(
				response(200, 'User havent opened this script', {
					page: 1,
					dark_mode: false
				})
			);

		result = {
			page: model.last_page,
			dark_mode: model.dark_mode
		};
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Page getted', result));
};
