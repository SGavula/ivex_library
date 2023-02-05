import { validationResult } from 'express-validator';
import {
	response,
	sendEmailToRelevantUsersByCategory,
	MessageInterface
} from '../helpers';
import { Request, Response } from 'express';
import {
	script_model,
	category_model,
	publisher_model,
	publisher_analytics_model,
	admin_model,
	AdminInterface,
	PublisherInterface
} from '../database/models';
import fs from 'fs';
import { transporter } from '../emails';
import path from 'path';

export const createScript = async (req: Request, res: Response) => {
	console.log(req.body);
	if ((req as any).fileValidationError != undefined)
		return res
			.status(400)
			.jsonp(response(400, (req as any).fileValidationError));

	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let script: any;
	try {
		let category = await category_model.findOne({
			category_name: req.body.category.toLowerCase()
		});

		if (!category) {
			category = new category_model({
				category_name: req.body.category.toLowerCase()
			});
			await category.save();
		}

		let publisher: any = await publisher_model.findOne({
			_id: req.body.publisher
		});
		if (!publisher)
			return res
				.status(400)
				.jsonp(response(400, 'No publisher with that id', {}));

		const publisher_analytics: any = await publisher_analytics_model.findOne(
			{
				publisher_id: publisher._id
			}
		);

		if (!publisher_analytics)
			return res
				.status(400)
				.jsonp(
					response(
						400,
						'No analytics for that publisher with that id',
						{}
					)
				);

		// @ts-expect-error
		const fileIndexer: Number = req.files.findIndex(
			(file: any) => file.mimetype == 'application/pdf'
		);
		// @ts-expect-error
		const imageIndexer: Number = req.files.findIndex(
			(file: any) =>
				file.mimetype == 'image/png' ||
				file.mimetype == 'image/jpeg' ||
				file.mimetype == 'image/jpg'
		);

		console.log(req.body);
		script = new script_model({
			name: req.body.name,
			author: JSON.parse(req.body.author),
			isbn: req.body.isbn,
			category: req.body.category,
			tags: req.body.tags,
			year: req.body.year,
			info: req.body.info,
			publisher: req.body.publisher,
			city: req.body.city,
			publishing: req.body.publishing,
			// @ts-expect-error
			image: `/${req.files[imageIndexer].filename}`,
			// @ts-expect-error
			path: req.files[fileIndexer].path,
			published: req.body.published,
			// pricing: parseInt(req.body.pricing)
			free: req.body.free,
			lang: req.body.lang,
			licence: req.body.licence,
			licence_link: req.body.licence_link,
			publishing_link: req.body.publishing_link,
			keywords: JSON.parse(req.body.keywords)
		});

		// Assign pricing based on boolean if selected book is free or not
		if (req.body.free == false) {
			script.pricing = parseInt(req.body.pricing);
		}

		publisher.scripts.push(script.id);
		publisher.save();

		script!.save();
		const newScriptAnalyticsEntry = {
			script_id: script._id,
			data: [
				{
					year: new Date().getFullYear(),
					months: []
				}
			]
		};
		for (let i = 0; i <= 11; i++) {
			const newMonth = {
				num: i,
				opens: 0
			};
			// @ts-expect-error
			newScriptAnalyticsEntry.data[0].months.push(newMonth);
		}
		publisher_analytics.scripts.push(newScriptAnalyticsEntry);
		await publisher_analytics.save();

		if (req.body.publisher_request == true) {
			const admins: Array<
				AdminInterface
			> = await admin_model.find().select('email -_id');
			const admin_emails = admins.map(
				(admin: AdminInterface) => admin.email
			);

			const publisher: PublisherInterface = await publisher_model.findOne(
				{ _id: req.body.publisher }
			);

			const message: MessageInterface = {
				to: admin_emails,
				from: 'noreply@ivexlibrary.sk',
				subject: 'Nová požiadavka na vytvorenie knihy',
				template: 'layouts/script',
				context: {
					publisher_name: publisher.name,
					script_name: script.name,
					admin_url:
						process.env.NODE_ENV == 'PROD'
							? `https://ivexlibrary.sk/script/${script._id}`
							: `http://localhost:3000/script/${script._id}`
				}
			};

			transporter.sendMail(message);
		}
		// Sending emails with metadata
		sendEmailToRelevantUsersByCategory(req.body.category, script._id);
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Script created', script));
};

export const uploadScraped = async (req: Request, res: Response) => {
	let script: any;
	try {
		let category = await category_model.findOne({
			category_name: req.body.category.toLowerCase()
		});

		if (!category) {
			category = new category_model({
				category_name: req.body.category.toLowerCase()
			});
			await category.save();
		}

		let publisher: any = await publisher_model.findOne({
			_id: req.body.publisher
		});
		if (!publisher)
			return res
				.status(400)
				.jsonp(response(400, 'No publisher with that id', {}));

		const publisher_analytics: any = await publisher_analytics_model.findOne(
			{
				publisher_id: publisher._id
			}
		);

		if (!publisher_analytics)
			return res
				.status(400)
				.jsonp(
					response(
						400,
						'No analytics for that publisher with that id',
						{}
					)
				);

		// @ts-expect-error
		const fileIndexer: Number = req.files.findIndex(
			(file: any) => file.mimetype == 'application/pdf'
		);
		// @ts-expect-error
		const imageIndexer: Number = req.files.findIndex(
			(file: any) =>
				file.mimetype == 'image/png' ||
				file.mimetype == 'image/jpeg' ||
				file.mimetype == 'image/jpg'
		);

		script = new script_model({
			name: req.body.name,
			author: JSON.parse(req.body.author),
			isbn: req.body.isbn || '',
			category: req.body.category,
			tags: req.body.tags || '',
			year: req.body.year || '',
			info: req.body.info || '',
			publisher: req.body.publisher,
			city: req.body.city || '',
			publishing: req.body.publishing || '',
			// @ts-expect-error
			image: `/${req.files[imageIndexer].filename}`,
			// @ts-expect-error
			path: req.files[fileIndexer].path,
			published: req.body.published || true,
			// pricing: parseInt(req.body.pricing)
			free: req.body.free,
			lang: req.body.lang || '',
			licence: req.body.licence || '',
			licence_link: req.body.licence_link || '',
			publishing_link: req.body.publishing_link || '',
			keywords: JSON.parse(req.body.keywords) || []
		});

		// Assign pricing based on boolean if selected book is free or not
		if (req.body.free == false) {
			script.pricing = parseInt(req.body.pricing);
		}

		publisher.scripts.push(script.id);
		publisher.save();

		script!.save();
		const newScriptAnalyticsEntry = {
			script_id: script._id,
			data: [
				{
					year: new Date().getFullYear(),
					months: []
				}
			]
		};
		for (let i = 0; i <= 11; i++) {
			const newMonth = {
				num: i,
				opens: 0
			};
			// @ts-expect-error
			newScriptAnalyticsEntry.data[0].months.push(newMonth);
		}
		publisher_analytics.scripts.push(newScriptAnalyticsEntry);
		await publisher_analytics.save();
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Script created', script));
};

export const getScript = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let script;
	try {
		script = await script_model.findOne({ _id: req.params.script_id });

		if (!script)
			return res.status(404).jsonp(response(404, 'Script not found', []));
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Script getted', script));
};

export const getPickedScripts = async (_req: Request, res: Response) => {
	let scripts;
	try {
		scripts = await script_model
			.find({ picked: true })
			.select('picked name author year image');

		if (!scripts)
			return res
				.status(404)
				.jsonp(response(404, 'Scripts not found', []));
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Script getted', scripts));
};

export const getScriptsByCategory = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let scripts;
	try {
		scripts = await script_model
			.find({ category: req.params.tag })
			.select('picked name author year image free')
			.limit(parseInt(req.params.limit));

		if (!scripts)
			return res
				.status(404)
				.jsonp(response(404, 'Scripts not found', []));
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Script getted', scripts));
};

export const searchController = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let scripts;

	try {
		scripts = await script_model
			.find(
				{
					published: true,
					$text: {
						$search: req.body.searchphrase,
						$diacriticSensitive: false
					}
				},
				{ score: { $meta: 'textScore' } }
			)
			.select('picked name author year image category')
			.sort({ score: { $meta: 'textScore' } });

		if (!scripts)
			return res
				.status(404)
				.jsonp(response(404, 'Scripts not found', []));
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Script getted', scripts));
};

export const getScriptsByIds = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let scripts;
	try {
		scripts = await script_model
			.find({ _id: { $in: req.body.scripts }, published: true })
			.select('picked name author year image');

		if (!scripts)
			return res
				.status(404)
				.jsonp(response(404, 'Scripts not found', []));
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Script getted', scripts));
};

export const getLibrary = async (_req: Request, res: Response) => {
	let scripts: any = [];
	try {
		scripts = await script_model
			.find({ published: true })
			.select('picked name author year image category free');

		if (!scripts)
			return res
				.status(404)
				.jsonp(response(404, 'Scripts not found', []));
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Script getted', scripts));
};

export const getAdminLibrary = async (_req: Request, res: Response) => {
	let scripts: any = [];
	let result: any = [];
	try {
		scripts = await script_model
			.find()
			.select('picked name author year image category published');

		let publisher_analytics = await publisher_analytics_model.find();

		// Loop through all analytics -> through all scripts - current year & month -> loop through scripts and set opens to what is opened
		publisher_analytics.forEach((analytics: any) => {
			analytics.scripts.forEach((script: any) => {
				script.data.forEach((data: any) => {
					if (data.year == new Date().getFullYear()) {
						let opens = data.months[new Date().getMonth()].opens;
						scripts.forEach((scriptEntry: any) => {
							if (scriptEntry._id == script.script_id) {
								let entry = {
									name: scriptEntry.name,
									author: scriptEntry.author,
									picked: scriptEntry.picked,
									year: scriptEntry.year,
									image: scriptEntry.image,
									category: scriptEntry.category,
									published: scriptEntry.published,
									_id: scriptEntry._id,
									opens
								};
								result.push(entry);
							}
						});
					}
				});
			});
		});

		if (!scripts)
			return res
				.status(404)
				.jsonp(response(404, 'Scripts not found', []));
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Script getted', result));
};

export const getCategories = async (_req: Request, res: Response) => {
	let categories: any;
	try {
		categories = await category_model.find().select('-_id');

		if (!categories)
			return res
				.status(404)
				.jsonp(response(404, 'categories not found', []));
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Script getted', categories));
};

export const editScript = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let script: any;
	try {
		script = await script_model.findOne({ _id: req.params.script_id });
		if (!script)
			return res.status(404).jsonp(response(404, 'Script not found', {}));

		if (req.body.category) {
			let category = await category_model.findOne({
				category_name: req.body.category
			});

			if (!category) {
				category = new category_model({
					category_name: req.body.category
				});
				await category.save();
			}
			script.category = req.body.category;
		}

		let publisher: any = await publisher_model.findOne({
			_id: req.body.publisher
		});
		if (!publisher) {
			return res
				.status(400)
				.jsonp(response(400, 'No publisher with that id', {}));
		}

		publisher.scripts.push(script._id);
		publisher.save();
		// @ts-expect-error
		if (req.files.length !== 0) {
			// @ts-expect-error
			script.image = `/${req.files[0].filename}`;
		}
		if (
			req.body.published == 'true' &&
			req.body.published !== script.published
		) {
			console.log('sent email');
			const message = {
				from: 'noreply@ivexlibrary.sk',
				to: 'misogally@gmail.com',
				subject: 'Vytvorenie prístupu do IVEX-Library',
				template: 'layouts/script_approved',
				context: {
					image: script.image,
					name: publisher.name,
					link: `${script.script_id}`
				}
			};

			transporter.sendMail(message);
		}

		const author = req.body.author
			? JSON.parse(req.body.author)
			: script.author;

		const keywords = req.body.keywords
			? JSON.parse(req.body.keywords)
			: script.keywords;

		script.author = author;
		script.keywords = keywords;
		script.name = req.body.name || script.name;
		script.year = req.body.year || script.year;
		script.info = req.body.info || script.info;
		script.isbn = req.body.isbn || script.isbn;
		script.city = req.body.city || script.city;
		script.publishing = req.body.publishing || script.publishing;
		script.publisher = req.body.publisher || script.publisher;
		script.published = req.body.published || script.published;
		script.free = req.body.free || script.free;
		script.lang = req.body.lang || script.lang;
		script.publishing_link =
			req.body.publishing_link || script.publishing_link;
		script.licence = req.body.licence || script.licence;
		script.licence_link = req.body.licence_link || script.licence_link;
		script.pricing = parseInt(req.body.pricing) || script.pricing;

		if (req.body.free == true) {
			script.pricing = '';
		} else {
			script.pricing = parseInt(req.body.pricing) || script.pricing;
		}

		script.save();
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Script getted', script));
};

export const getPdfScript = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let script: any;
	try {
		script = await script_model.findOne({ _id: req.params.script_id });
		if (!script)
			return res.status(404).jsonp(response(404, 'Script not found', {}));
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return fs.createReadStream(script.path).pipe(res);
};

export const deleteScriptById = async (req: Request, res: Response) => {
	try {
		const script: any = await script_model.findOneAndDelete({
			_id: req.params.script_id
		});
		if (!script)
			return res
				.status(400)
				.jsonp(response(400, 'No script with that id', {}));

		fs.unlinkSync(path.join(script.path));
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Script removed', {}));
};
