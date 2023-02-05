import { publisher_model } from '../database/models';

export async function getPulibhserPay(publisher_id: String) {
	// @ts-expect-error
	const publisher = await publisher_model.findOne({ _id: publisher_id });

	console.log(publisher);
}
