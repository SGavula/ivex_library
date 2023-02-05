import mongoose, { Document } from 'mongoose';
import { nanoid } from 'nanoid';
const Schema = mongoose.Schema;

export interface PublisherInterface extends Document {
	_id: string;
	email: string;
	password: string;
	refresh_token?: string;
	scripts?: Array<string>;
	name?: string;
	verification_token?: { token: string; expiration: Date };
}

const publisher_schema = new Schema<PublisherInterface>({
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
	name: {
		type: String
	},
	scripts: {
		type: [ String ],
		default: []
	},
	refresh_token: {
		type: String
	},
	verification_token: {
		token: String,
		expiration: Date
	}
});

export const publisher_model = mongoose.model('publishers', publisher_schema);
