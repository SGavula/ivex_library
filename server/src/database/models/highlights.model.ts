import mongoose, { Document } from 'mongoose';
import { nanoid } from 'nanoid';
const Schema = mongoose.Schema;

export interface HighlightInterface extends Document {
	_id: string;
	last_page: number;
	dark_mode: boolean;
	info: boolean;
	script_id: string;
	highlights: {
		page: number;
		highlights: string;
	};
}

// Nested position = 2. = middle
const bigHighlightSchema = new Schema(
	{
		page: Number,
		highlights: String
	},
	{ _id: false }
);
// Nested position = 1. = top
const fullHighlightsSchema = new Schema<HighlightInterface>({
	_id: {
		type: String,
		default: () => nanoid(5)
	},
	last_page: {
		type: Number
	},
	dark_mode: {
		type: Boolean
	},
	info: { type: Boolean },
	script_id: String, // id of a script
	user_id: String,
	highlights: [ bigHighlightSchema ]
});

export const highlightsModel = mongoose.model(
	'highlights',
	fullHighlightsSchema
);
