import { nanoid } from 'nanoid';
import mongoose, { Document } from 'mongoose';
export interface ScriptInterface extends Document {
	_id: string;
	name?: string;
	author?: string;
	category?: string;
	picked?: boolean;
	year?: number;
	info?: string;
	keywords?: Array<string>;
	isbn?: string;
	path?: string;
	image?: string;
	publisher?: string;
	publishing?: string;
	published?: boolean;
	pricing?: number;
	city?: string;
	lang?: string;
	free?: boolean;
	publishing_link?: string;
	licence_link?: string;
	licence?: string;
}

export const scriptSchema = new mongoose.Schema<ScriptInterface>({
	_id: {
		type: String,
		default: () => nanoid(5)
	},
	name: { type: String, required: true, index: true },
	author: { type: [ String ], index: true },
	category: String,
	picked: { type: Boolean, default: false },
	year: { type: Number, },
	info: { type: String, index: true },
	keywords: { type: [ String ], index: true },
	isbn: String,
	path: { type: String  },
	image: { type: String  },
	publisher: { type: String  },
	city: { type: String },
	publishing: { type: String },
	published: {
		type: Boolean,
		default: false
	},
	pricing: { type: Number },
	free: { type: Boolean },
	lang: { type: String },
	licence: String,
	licence_link: String,
	publishing_link: String
});

scriptSchema.index(
	{
		name: 'text',
		author: 'text',
		info: 'text',
		keywords: 'text',
		category: 'text',
		year: 'text',
		publishing: 'text',
		city: 'text',
		isbn: 'text'
	},
	{
		weights: {
			name: 1,
			author: 1,
			info: 1,
			keywords: 1,
			category: 1,
			year: 1,
			publishing: 1,
			city: 1,
			isbn: 1
		}
	}
);

export const script_model = mongoose.model('scripts', scriptSchema);
