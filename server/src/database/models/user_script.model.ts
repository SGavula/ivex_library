import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
const Schema = mongoose.Schema;
export const user_scripts = new Schema({
	_id: {
		type: String,
		default: () => nanoid(5)
	},
	script: {
		type: String,
		required: true
	},
	highlights: []
});
