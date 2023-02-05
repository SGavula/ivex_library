import mongoose, { Document } from 'mongoose';
import { nanoid } from 'nanoid';
const Schema = mongoose.Schema;
export interface UserInterface extends Document {
	_id: string;
	email: string;
	password: string;
	first_name: string;
	last_name: string;
	paid: Boolean;
	last_payment: Date;
	subscription_ending: Date;
	payments: Array<Date>;
	favorite_scripts: Array<string>;
	last_scripts: Array<string>;
	subscription_type: 0 | 1 | 2;
	refresh_token: string;
	verified: Boolean;
	verification_token: { token: string; expiration: Date };
	university?: string;
	faculty?: string;
	subject?: string;
	year?: string;
	address?: string;
	credit_card?: string;
	got_email?: boolean;
	email_subscription: boolean;
	email_subscription_token?: string;
	stripeCustomerId?: string;
	stripe: object;
	user_state: string;
}

const userSchema = new Schema<UserInterface>({
	_id: {
		type: String,
		default: () => nanoid(7)
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	address: {
		type: String
	},
	credit_card: {
		type: String
	},
	paid: {
		type: Boolean,
		default: false,
		required: true
	},
	last_payment: {
		type: Date,
		default: new Date(),
		required: true
	},
	subscription_ending: {
		type: Date,
		required: true
	},
	payments: [
		{
			type: Date
		}
	],
	favorite_scripts: [
		{
			type: String
		}
	],
	last_scripts: [
		{
			type: String
		}
	],
	university: {
		type: String
	},
	faculty: {
		type: String
	},
	subject: {
		type: String
	},
	year: {
		type: String
	},
	refresh_token: {
		type: String
	},
	subscription_type: Number,
	verified: {
		type: Boolean,
		default: false
	},
	verification_token: {
		token: String,
		expiration: {
			type: Date,
			default: () => {
				let date: Date = new Date();
				date.setDate(date.getDate() + 1);
				return date;
			}
		}
	},
	got_email: {
		type: Boolean,
		default: false
	},
	email_subscription: {
		type: Boolean,
		default: true
	},
	email_subscription_token: {
		type: String,
		default: () => nanoid(25)
	},
	stripeCustomerId: {
		type: String,
		required: false
	},
	stripe: {
		type: Object
	},
	user_state: String
});

export const user_model = mongoose.model('users', userSchema);
