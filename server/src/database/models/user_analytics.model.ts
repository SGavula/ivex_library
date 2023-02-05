import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;

export interface UserAnalayticsInterface extends Document {
	user_id: string;
	subscription_type: number;
	scripts: Array<{
		script_id: string;
		max_pages: number;
		full_pages: number;
		pages_read: Array<number>;
		percentile?: number;
		data: Array<{
			year: number;
			months: Array<{
				num: number;
				pages: Array<number>;
				month_pages: number;
				vpc: number;
			}>;
		}>;
	}>;
}

export const user_analytics = new Schema<UserAnalayticsInterface>({
	user_id: { type: String, required: true },
	subscription_type: { type: Number, required: false },
	scripts: [
		{
			script_id: { type: String, required: true },
			max_pages: { type: Number, required: true, default: 0 },
			full_pages: { type: Number, required: true, default: 0 },
			pages_read: [ Number ],
			percentile: { type: Number, required: false, default: 0 },
			data: [
				{
					year: { type: Number, required: true },
					months: [
						{
							num: { type: Number, required: true }, // 0-11
							pages: [ Number ],
							month_pages: Number,
							vpc: { type: Number, required: true }
						}
					]
				}
			]
		}
	]
});

export const user_analytics_model = mongoose.model(
	'user_analytics',
	user_analytics
);
