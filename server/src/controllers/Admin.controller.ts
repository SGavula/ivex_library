import {
	admin_model,
	user_model,
	AdminInterface,
	UserInterface,
	publisher_model,
	user_analytics_model
} from '../database/models';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { MessageInterface, response } from '../helpers';
import { internet } from 'faker';
import { transporter } from '../emails';
import { nanoid } from 'nanoid';
const salt = 10;

export const createAdmin = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let user: AdminInterface;
	let generatedPassword = internet.password();
	try {
		// Check if user with that email exists
		const admin_email: AdminInterface = await admin_model.findOne({
			email: req.body.email
		});
		if (admin_email)
			return res
				.status(400)
				.jsonp(
					response(400, 'User with this email already exists', {})
				);

		let foundUser:
			| UserInterface
			| AdminInterface = await user_model.findOne({
			email: req.body.email
		});
		if (!foundUser) {
			foundUser = await publisher_model.findOne({
				email: req.body.email
			});
		}

		if (foundUser)
			return res
				.status(400)
				.jsonp(
					response(400, 'User with this email already exists', {})
				);

		// Hash password
		const password = await bcrypt.hash(generatedPassword, salt);
		// Create user
		user = new admin_model({
			email: req.body.email,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			password: password
		});
		user.save();
		user.unecryptedPassword = generatedPassword;

		const message: MessageInterface = {
			from: 'noreply@ivexlibrary.sk',
			to: req.body.email,
			subject: 'Potvrdenie vytvorenia účtu',
			template: 'layouts/admin-password',
			context: {
				email: req.body.email,
				password: generatedPassword,
				first_name: user.first_name,
				last_name: user.last_name
			}
		};

		transporter.sendMail(message);
	} catch (error) {
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res
		.status(200)
		.jsonp(response(200, 'Admin created', { user, generatedPassword }));
};

export const editAdmin = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let user: AdminInterface;
	try {
		// Check if user with that email exists
		user = await admin_model.findOne({
			_id: req.params.admin_id
		});
		if (!user)
			return res
				.status(400)
				.jsonp(response(400, 'User with this email doesnt exist', {}));

		user.email = req.body.email || user.email;
		user.first_name = req.body.first_name || user.first_name;
		user.last_name = req.body.last_name || user.last_name;
		if (req.body.password) {
			let password = await bcrypt.hash(req.body.password, salt);
			user.password = password;
		}

		user.save();
	} catch (error) {
		console.log(error);
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(response(200, 'Admin edited', user));
};

export const getAdmin = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let user: AdminInterface;

	try {
		// Check if user with that email exists
		user = await admin_model
			.findOne({
				_id: req.params.admin_id
			})
			.select('-password -refresh_token');
		if (!user)
			return res
				.status(400)
				.jsonp(response(400, 'Admin with that id doesnt exists', {}));
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Admin getted', user));
};

export const getAllUsers = async (_req: Request, res: Response) => {
	let users: Array<Partial<UserInterface>>;
	try {
		// Check if user with that email exists
		users = await user_model
			.find()
			.select(
				'first_name last_name paid subscription_type subscription_ending'
			);
		if (!users)
			return res
				.status(400)
				.jsonp(response(400, 'Admin with that id doesnt exists', {}));
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Admin getted', users));
};

export const adminCreateUser = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let user: UserInterface;
	try {
		const email_token = nanoid(20);
		// Check if user with that email exists
		const user_email = await user_model.findOne({ email: req.body.email });
		if (user_email)
			return res
				.status(400)
				.jsonp(
					response(400, 'User with this email already exists', {})
				);

		// Hash password
		const generatedPassword = internet.password();
		const password = await bcrypt.hash(generatedPassword, salt);
		let date = new Date();
		date.setDate(date.getDate() + 14);
		// Create user
		user = new user_model({
			email: req.body.email,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			password: password,
			subscription_type: 1,
			subscription_ending: date,
			verified: true,
			verification_token: {
				token: email_token
			}
		});
		user.save();

		// Send confirmation email
		const message: MessageInterface = {
			from: 'noreply@ivexlibrary.sk',
			to: user.email,
			subject: 'Úspešná registrácia do IVEX-Library',
			template: 'layouts/admin-password',
			context: {
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name,
				password: generatedPassword
			}
		};
		transporter.sendMail(message);

		const analytics = new user_analytics_model({
			user_id: user._id,
			subscription_type: 1,
			scripts: []
		});

		analytics.save();
	} catch (error) {
		console.log(error);

		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(response(200, 'User created', user));
};
