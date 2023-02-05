import {
	publisher_analytics_model,
	publisher_model
	// script_model,
	// user_model
} from '../models';
import { random } from 'faker/locale/sk';

export const seedPublisherAnalytics = async () => {
	console.log('removing existing analytics');
	publisher_analytics_model.collection.drop();
	console.log('seeding analytics');
	try {
		const publishers = await publisher_model.find();
		for (let publisher of publishers) {
			const newPublisherAnalyticsObject:any = new publisher_analytics_model({
				publisher_id: publisher._id,
				scripts: []
			});
			// @ts-ignore
			for (let script of publisher.scripts) {
				const newScriptObject = {
					script_id: script,
					data: []
				};
				for (let i = 2016; i <= 2021; i++) {
					const newYearObject = {
						year: i,
						months: []
					};
					for (let a = 0; a <= 11; a++) {
						const newMonthObject = {
							num: a,
							opens: random.number({ min: 150, max: 1500 })
						};
						// @ts-expect-error
						newYearObject.months.push(newMonthObject);
					}
					// @ts-expect-error
					newScriptObject.data.push(newYearObject);
				}
				newPublisherAnalyticsObject.scripts.push(newScriptObject);
			}
			await newPublisherAnalyticsObject.save();
		}
	} catch (error) {
		console.log(error);
	}
};
