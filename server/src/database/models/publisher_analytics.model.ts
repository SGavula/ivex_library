import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;

export interface PublisherAnalayticsInterface extends Document {
	publisher_id: string;
	scripts: [
		{
			script_id: string;
			data: [
				{
					year: number;
					months: [
						{
							num: number;
							opens: number;
						}
					];
				}
			];
		}
	];
}

const publisher_analytics = new Schema<PublisherAnalayticsInterface>({
	publisher_id: { type: String, required: true },
	scripts: [
		{
			script_id: { type: String, required: true },
			data: [
				{
					year: { type: Number, required: true },
					months: [
						{
							num: { type: Number, required: true }, // 0-11
							opens: { type: Number, required: true }
						}
					]
				}
			]
		}
	]
});

export const publisher_analytics_model = mongoose.model(
	'publisher_analytics',
	publisher_analytics
);
