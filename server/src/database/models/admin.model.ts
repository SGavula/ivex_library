import mongoose, { Document } from 'mongoose';
import { nanoid } from 'nanoid';
const Schema = mongoose.Schema;

export interface AdminInterface extends Document {
	_id: string;
	email: string;
	password: string;
	first_name: string;
	last_name: string;
	refresh_token: string;
	unecryptedPassword?: string;
	verification_token?: { token: string; expiration: Date };
}

const admin_schema = new Schema<AdminInterface>({
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
		default: ''
	},
	last_name: {
		type: String,
		default: ''
	},
	refresh_token: {
		type: String
	},
	verification_token: {
		token: String,
		expiration: Date
	}
});

export const admin_model = mongoose.model('admins', admin_schema);
