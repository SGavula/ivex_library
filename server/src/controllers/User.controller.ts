import {
	script_model,
	user_model,
	user_analytics_model,
	UserInterface,
	AdminInterface,
	PublisherInterface,
	publisher_model,
	admin_model
} from '../database/models';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { MessageInterface, response } from '../helpers';
import { nanoid } from 'nanoid';
import { transporter } from '../emails';
import path from 'path';
require('dotenv').config({
	path: path.resolve(__dirname, '../../../.env')
});
// import path from 'path';
// TODO: Make it secret in .env
import Stripe from 'stripe';
let stripe: any;
stripe = new Stripe(
	process.env.NODE_ENV == 'PROD'
		? process.env.STRIPE_PK!
		: process.env.STRIPE_TEST!,
	{
		apiVersion: '2020-08-27'
	}
);

const salt = 10;
const url =
	process.env.NODE_ENV == 'PROD'
		? 'https://ivexlibrary.sk'
		: 'http://localhost:3000';

export const createUser = async (
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let user: UserInterface;
	let responseToSend;
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
		const password = await bcrypt.hash(req.body.password, salt);
		let date = new Date();
		date.setDate(date.getDate() + 14);
		// Create user
		user = new user_model({
			email: req.body.email,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			password: password,
			subscription_type: parseInt(req.body.sub_type),
			subscription_ending: date,
			verification_token: {
				token: email_token
			},
			user_state: req.body.sub_type == 3 ? 'freemium' : 'awaiting-payment'
		});
		await user.save();
		if (req.body.sub_type !== 3) {
			// create stripe customer
			const customer = await stripe.customers.create({
				email: req.body.email
			});
			user.stripeCustomerId = customer.id;

			await user.save();
			let price_id;

			if (process.env.NODE_ENV == 'PROD') {
				price_id =
					req.body.sub_type == 1
						? 'price_1JxXXrDz7YsaI1yHfUEP2glu'
						: 'price_1JxXZnDz7YsaI1yHWJ7wQ8eZ';
			} else {
				price_id =
					req.body.sub_type == 1
						? 'price_1Js7PyDz7YsaI1yH8DLg5tXf'
						: 'price_1Js7QRDz7YsaI1yHpLT1JKcw';
			}


			const subscription = await stripe.subscriptions.create({
				customer: customer.id,
				items: [
					{
						price: price_id
					}
				],
				payment_behavior: 'default_incomplete',
				expand: [ 'latest_invoice.payment_intent' ],
				payment_settings: {
					payment_method_types: [ 'card' ]
				},
				coupon: 'idiscount2',
				trial_from_plan: true
			});

			const setIntent = await stripe.setupIntents.retrieve(
				subscription.pending_setup_intent!
			);

			responseToSend = {
				user: user,
				payment: {
					subscriptionId: subscription.id,
					clientSecret: setIntent.client_secret
				}
			};

			user.stripe = {
				id: subscription.id,
				c_periond_end: subscription.current_period_end,
				customer: subscription.customer
			};

			await user.save();
		} else {
			// Send confirmation email
			const message: MessageInterface = {
				from: 'noreply@ivexlibrary.sk',
				to: user.email,
				subject: 'Úspešná registrácia do IVEX-Library',
				template: 'layouts/registrantion-confirm',
				context: {
					first_name: user.first_name,
					last_name: user.last_name,
					price: '0€',
					subscription: 'Freemium',
					trial: 7,
					subscription_ending: 'Navždy zadarmo',
					link: `${url}/verification/${user.verification_token.token}`
				}
			};
			await transporter.sendMail(message);

			responseToSend = 'freemium';
		}

		const analytics = new user_analytics_model({
			user_id: user._id,
			subscription_type: req.body.subscription_type,
			scripts: []
		});

		await analytics.save();
	} catch (error) {
		console.log(error);
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', responseToSend));
	}
	return res.status(200).jsonp(response(200, 'User created', responseToSend));
};

export const getUser = async (
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let user;
	try {
		user = await user_model
			.findOne({ _id: req.params.user_id })
			.select(
				'-credit_card -last_payment -payments -analytics -created_at -edited_at -last_payment'
			);
	} catch (error) {
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res
		.status(200)
		.jsonp(response(200, 'user getted succesfully', user));
};

export const editUser = async (
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let user: any;
	try {
		user = await user_model
			.findOne({ _id: req.params.user_id })
			.select(
				'-credit_card -last_payment -payments -analytics -created_at -edited_at -last_payment'
			);

		user.first_name = req.body.first_name || user.first_name;
		user.last_name = req.body.last_name || user.last_name;
		user.address = req.body.address || user.address;
		user.university = req.body.university || user.university;
		user.faculty = req.body.faculty || user.faculty;
		user.subject = req.body.subject || user.subject;
		user.year = req.body.year || user.year;
		user.gender = req.body.gender || user.gender;
		user.favorite_subjects =
			req.body.favorite_subjects || user.favorite_subjects;
		user.email = req.body.email || user.email;

		user.save();
	} catch (error) {
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(response(200, 'user edited', user));
};

export const editUserPassword = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	try {
		let user: UserInterface = await user_model.findOne({
			_id: req.params.user_id
		});

		if (!user)
			return res
				.status(422)
				.jsonp(response(422, 'No user with that id', {}));

		user.password = await bcrypt.hash(req.body.password, 10);

		user.save();
	} catch (error) {
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(response(200, 'User data edited', {}));
};

export const passwordByTokenReset = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	try {
		let user: UserInterface | AdminInterface | PublisherInterface;

		user = await user_model.findOne({
			'verification_token.token': req.body.token
		});

		if (!user) {
			user = await publisher_model.findOne({
				'verification_token.token': req.body.token
			});
		}

		if (!user) {
			user = await admin_model.findOne({
				'verification_token.token': req.body.token
			});
		}
		const oneDay = 24 * 60 * 60 * 1000;
		if (!user)
			return res
				.status(422)
				.jsonp(response(422, 'No user with that id', {}));

		let currentDate: Date = new Date();
		// @ts-expect-error
		if (currentDate - user.verification_token.expiration > oneDay) {
			user.verification_token = {
				token: '',
				expiration: new Date()
			};
			return res
				.status(400)
				.jsonp(response(400, 'Old verification token', {}));
		}
		user.password = await bcrypt.hash(req.body.password, 10);
		user.verification_token = {
			token: '',
			expiration: new Date()
		};
		user.save();
	} catch (error) {
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(response(200, 'User data edited', {}));
};

export const editUserScriptData = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	try {
		let user: any = await user_model.findOne({ _id: req.params.user_id });
		let script: any = await script_model.findOne({
			_id: req.body.script_id
		});
		if (!user)
			return res
				.status(400)
				.jsonp(response(400, 'No user with that id', {}));

		if (!script)
			return res
				.status(400)
				.jsonp(response(400, 'No script with that id', {}));

		if (req.body.reqtype === 1) {
			if (!user.favorite_scripts.includes(req.body.script_id))
				user.favorite_scripts.push(req.body.script_id);
		}

		if (req.body.reqtype === 2) {
			if (!user.last_scripts.includes(req.body.script_id))
				if (user.last_scripts.length >= 5) {
					user.last_scripts.pop();
				}
			user.last_scripts.unshift(req.body.script_id);
		}
		console.log(user.last_scripts);
		user.save();
	} catch (error) {
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(response(200, 'Script data edited', {}));
};

export const unfavoriteScript = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	try {
		let user: any = await user_model.findOne({ _id: req.params.user_id });
		if (!user)
			return res
				.status(400)
				.jsonp(response(400, 'No user with that id', {}));

		if (!user.favorite_scripts.includes(req.params.script_id))
			return res
				.status(400)
				.jsonp(response(400, 'User has not favored that script', {}));

		const index = user.favorite_scripts.findIndex(
			(el: String) => el == req.params.script_id
		);
		user.favorite_scripts.splice(index, 1);
		user.save();
	} catch (error) {
		console.log(error);

		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(response(200, 'Script data edited', {}));
};

export const isFavorite = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let result: boolean;
	try {
		let user: any = await user_model.findOne({ _id: req.params.user_id });
		let script: any = await script_model.findOne({
			_id: req.params.script_id
		});
		if (!user)
			return res
				.status(400)
				.jsonp(response(400, 'No user with that id', {}));

		if (!script)
			return res
				.status(400)
				.jsonp(response(400, 'No script with that id', {}));

		if (!user.favorite_scripts.includes(req.params.script_id)) {
			result = false;
		} else {
			result = true;
		}
	} catch (error) {
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(response(200, 'Script data edited', result));
};

export const userVerification = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let verified: Boolean;
	try {
		let user: any = await user_model.findOne({
			'verification_token.token': req.params.token
		});
		if (!user) {
			verified = false;
			return res
				.status(400)
				.jsonp(response(400, 'No user with that id', {}));
		}

		verified = true;
		user.verification_token = {};
		user.verified = true;
		user.save();
	} catch (error) {
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res
		.status(200)
		.jsonp(response(200, 'Script data edited', { verified: verified }));
};

export const userForgottenPassword = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let token: string;
	try {
		token = nanoid(24);
		let user: UserInterface | PublisherInterface | AdminInterface;

		user = await user_model.findOne({
			email: req.body.email
		});

		if (!user) {
			user = await publisher_model.findOne({
				email: req.body.email
			});
		}

		if (!user) {
			user = await admin_model.findOne({
				email: req.body.email
			});
		}

		if (!user) {
			return res
				.status(400)
				.jsonp(response(400, 'No user with that id', {}));
		}

		let expiration: Date = new Date();
		expiration.setDate(expiration.getDate() + 1);

		const message = {
			from: 'noreply@ivexlibrary.sk',
			to: req.body.email,
			subject: 'Zabudnute heslo',
			template: 'layouts/forgot-password',
			context: {
				//@ts-expect-error
				name: user._firstname || user.name,
				link: `${url}/change-password/${token}`
			}
		};
		transporter.sendMail(message);

		user.verification_token = {
			token,
			expiration
		};
		user.save();
	} catch (error) {
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res
		.status(200)
		.jsonp(response(200, 'Password reset email sent', { token: token }));
};

export const sendContactEmail = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	try {
		const admins: Array<AdminInterface> = await admin_model
			.find()
			.select('email -_id');
		const admin_emails = admins.map((admin: AdminInterface) => admin.email);

		const message: MessageInterface = {
			from: 'noreply@ivexlibrary.sk',
			to: admin_emails,
			subject: `Nová správa od ${req.body.name}`,
			template: 'layouts/contact-form',
			context: {
				name: req.body.name,
				email: req.body.email,
				message: req.body.message
			}
		};

		console.log(message);

		await transporter.sendMail(message);
	} catch (error) {
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(response(200, 'Script data edited', {}));
};
export const deleteUser = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let user: UserInterface | undefined;
	try {
		user = await user_model.findOneAndDelete({
			_id: req.params.user_id
		});

		await user_analytics_model.findOneAndDelete({
			user_id: req.params.user_id
		});
	} catch (error) {
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(response(200, 'User removed from DB', user));
};

export const unsubscribeFromEmails = async (req: Request, res: Response) => {
	try {
		let user: UserInterface | undefined;

		user = await user_model.findOne({
			email_subscription_token: req.params.token
		});

		if (!user) {
			return res
				.status(400)
				.jsonp(response(400, 'No user with that id', {}));
		}

		user.email_subscription = false;
		user.save();
	} catch (error) {
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(response(200, 'Unsubscribed', {}));
};
