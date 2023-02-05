import {
	admin_model,
	publisher_model,
	script_model,
	publisher_analytics_model
} from '../database/models';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { response } from '../helpers';
import { internet } from 'faker';
import { transporter } from '../emails';
const salt = 10;

export const createPublisher = async (
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let user: any;
	let generatedPassword;
	try {
		// Check if user with that email exists
		const publisher_email = await publisher_model.findOne({
			email: req.body.email
		});
		if (publisher_email)
			return res
				.status(400)
				.jsonp(
					response(400, 'User with this email already exists', {})
				);

		// Hash password
		generatedPassword = internet.password();
		const password = await bcrypt.hash(generatedPassword, salt);

		// Create user
		user = new publisher_model({
			email: req.body.email,
			name: req.body.name,
			password: password
		});

		const analyticsModel = new publisher_analytics_model({
			publisher_id: user._id,
			scripts: []
		});

		const message = {
			from: 'noreply@ivexlibrary.sk',
			to: req.body.email,
			subject: 'Vytvorenie prístupu do IVEX-Library',
			template: 'layouts/publisher-password',
			context: {
				name: req.body.name,
				email: req.body.email,
				password: generatedPassword
			}
		};

		transporter.sendMail(message);

		try {
			analyticsModel.save();
			user.save();
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(
		response(200, 'Publisher created', {
			...user,
			gpassword: generatedPassword
		})
	);
};

export const editPublisher = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let user: any;
	try {
		// Check if user with that email exists
		user = await publisher_model.findOne({
			_id: req.params.publisher_id
		});
		if (!user)
			return res
				.status(400)
				.jsonp(
					response(400, 'Publisher with that id doesnt exists', {})
				);

		user.email = req.body.email || user.email;
		user.name = req.body.name || user.name;
		if (req.body.password) {
			let password = await bcrypt.hash(req.body.password, salt);
			user.password = password;
		}

		user.save();
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Publisher edited', user));
};

export const getPublisher = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let user: any;

	try {
		// Check if user with that email exists
		user = await publisher_model
			.findOne({
				_id: req.params.publisher_id
			})
			.select('-password');
		if (!user)
			return res
				.status(400)
				.jsonp(
					response(400, 'Publisher with that id doesnt exists', {})
				);
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Publisher getted', user));
};

export const getAllPublishers = async (_req: Request, res: Response) => {
	// const errors = validationResult(req);
	// if (!errors.isEmpty())
	// 	return res.status(400).jsonp(response(400, errors.array()));
	let users: any;

	try {
		// Check if user with that email exists
		users = await publisher_model.find().select('_id name');
		if (!users)
			return res
				.status(400)
				.jsonp(
					response(400, 'Publisher with that id doesnt exists', {})
				);
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Publishers getted', users));
};

export const deletePublisher = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));

	try {
		// Check if user with that email exists
		let user: any = await publisher_model.findOne({
			_id: req.params.publisher_id
		});
		if (!user)
			return res
				.status(400)
				.jsonp(
					response(400, 'Publisher with that id doesnt exists', {})
				);

		// Delete analytics
		await publisher_analytics_model.findOneAndDelete({
			publisher_id: user._id
		});
		// Delete scripts
		await script_model.deleteMany({ _id: { $in: user.scripts } });

		user.remove();
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Publisher deleted', {}));
};

export const requestScriptChange = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));

	const admins: any = await admin_model.find();
	const admin_emails: Array<any> = [];
	const publisher: any = await publisher_model.findOne({
		_id: req.params.publisher_id
	});
	const script: any = await script_model.findOne({
		_id: req.body.script_id
	});
	if (!publisher || !script || !admins)
		return res
			.status(400)
			.jsonp(response(400, 'No publisher || admin || script', {}));

	admins.forEach((admin: any) => {
		admin_emails.push(admin.email);
	});
	const message = {
		from: 'noreply@ivexlibrary.sk',
		to: admin_emails,
		subject: 'Ziadost o zmenu scriptu',
		template: 'layouts/script-change-request',
		context: {
			publisher_name: publisher.name,
			script_name: script.name,
			script_id: req.body.script_id,
			message: req.body.message
		}
	};
	try {
		transporter.sendMail(message);
	} catch (error) {
		if (error) return res.status(400).jsonp(response(400, errors));
	}
	return res.status(200).jsonp(response(200, 'Email sent', {}));
};
