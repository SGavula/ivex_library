import { user_model, publisher_model, admin_model } from '../database/models';
import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { response } from '../helpers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';

require('dotenv').config({
	path: path.resolve(__dirname, '../../../.env')
});

const SECRET_1 = process.env.SECRET_1!;
const SECRET_2 = process.env.SECRET_2!;

export const login = async (
	req: Request,
	res: Response,
	_next: NextFunction
): Promise<any> => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let responseData: any = {};
	try {
		let jwtData: any = {};
		let user: any;
		let email = req.body.email;
		let base_user: any = await user_model.findOne({ email });
		let admin = await admin_model.findOne({ email });
		let publisher = await publisher_model.findOne({ email });

		if (admin) {
			user = admin;
			jwtData.user_type = 'ADMIN';
			jwtData.email = user.email;
			jwtData.name = user.first_name;
		} else if (publisher) {
			jwtData.user_type = 'PUBLISHER';
			user = publisher;
		} else if (base_user) {
			user = base_user;
			jwtData.user_type = 'USER';
			jwtData.user_name = base_user.name;
		} else {
			return res
				.status(400)
				.jsonp(response(400, 'Not valid user type', []));
		}
		if (user == undefined)
			return res.status(404).jsonp(response(404, 'user not found', []));

		if (jwtData.user_type == 'USER') {
			if (user.user_state == 'awaiting_payment') {
				return res
					.status(402)
					.jsonp(response(401, 'User does not have setup intent'));
			}
			if (!user.verified) {
				return res
					.status(401)
					.jsonp(response(401, 'Email address not confirmed'));
			}
		}

		const valid = await bcrypt.compare(
			req.body.password,
			<string>user.password
		);
		if (!valid) {
			return res.status(400).jsonp(response(400, 'Bad password'));
		}

		jwtData.user_id = user.id;
		responseData.user_id = user.id;
		responseData.user_type = jwtData.user_type;
		if (jwtData.user_type == 'USER' || jwtData.user_type == 'PUBLISHER') {
			jwtData.email = user.email;
			if (jwtData.user_type == 'USER') {
				console.log(user);
				responseData.name = user.first_name;
				responseData.user_state = user.user_state;
				responseData.subscription_type = user.subscription_type;
				jwtData.first_name = user.first_name;
				jwtData.last_name = user.last_name;
				jwtData.address = user.address;
				jwtData.paid = user.paid;
				jwtData.subscription_ending = user.subscription_ending;
			} else {
				jwtData.name = user.name;
				responseData.name = user.name;
			}
		} else {
			responseData.name = user.first_name;
		}
		responseData.token = jwt.sign(jwtData, SECRET_1, {
			expiresIn: '30m'
		});
		responseData.refresh = jwt.sign(jwtData, SECRET_2 + user.password, {
			expiresIn: '1d'
		});
		user.refresh_token = responseData.refresh;
		user.save();
	} catch (err) {
		console.log(err);
		return res.status(500).jsonp(response(500, 'try catch error', err));
	}
	return res
		.status(200)
		.jsonp(response(200, 'login successful', responseData));
};
