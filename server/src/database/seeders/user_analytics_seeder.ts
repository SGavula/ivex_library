import {
	user_analytics_model,
	// publisher_model,
	script_model,
	user_model
} from '../models';
import { random } from 'faker/locale/sk';

export const seedUserAnalytics = async () => {
	console.log('removing existing analytics');
	user_analytics_model.collection.drop();
	console.log('seeding analytics');
	const users: any = await user_model.find();
	const scripts: any = await script_model.find({ published: true });
	for (let user of users) {
		const subscription_type: number = random.number({ min: 0, max: 2 });
		const user_entry_object:any = new user_analytics_model({
			user_id: user._id,
			subscription_type,
			scripts: []
		});
		for (let script of scripts) {
			const script_id = script._id;
			const full_pages: number = random.number({ min: 200, max: 350 });
			const max_pages: number =
				full_pages - random.number({ min: 20, max: 75 });
			const percentile: number = max_pages / full_pages;
			const pages_read: Array<Number> = [];
			// Push into pages read
			for (let a = 1; a <= max_pages; a++) {
				pages_read.push(a);
			}
			const new_entry = {
				script_id,
				max_pages,
				full_pages,
				percentile,
				data: [
					{
						year: 2021,
						months: []
					}
				]
			};
			let prev_pages = 0;
			for (let i: number = 0; i <= new Date().getMonth(); i++) {
				let pages = max_pages - (max_pages - 50 / (i + 1));
				if (i == new Date().getMonth()) {
					pages = max_pages - prev_pages;
				}
				prev_pages = pages;
				let pagesArray: Array<Number> = [];
				for (
					let a = 0;
					a < random.number({ min: 20, max: max_pages });
					a++
				) {
					pagesArray.push(a);
				}
				let vpc = script.pricing * (pagesArray.length / full_pages);
				const month_entry = {
					num: i,
					pages: pagesArray,
					month_pages: pagesArray.length,
					vpc
				};
				// @ts-expect-error
				new_entry.data[0].months.push(month_entry);
			}
			user_entry_object.scripts.push(new_entry);
		}
		try {
			await user_entry_object.save();
		} catch (error) {
			console.log(error);
		}
	}
	// OLD
	// const publishers: any = await publisher_model.find();
	// for (let publisher of publishers) {
	// 	const publisher_scripts: any = await script_model.find({
	// 		_id: { $in: publisher.scripts }
	// 	});
	// 	const users: any = await user_model.find();
	// 	const model = new publisher_analytics_model({
	// 		publisher_id: publisher._id,
	// 		analytics: [
	// 			{
	// 				year: 2021,
	// 				trimesters: []
	// 			}
	// 		]
	// 	});
	// 	console.log(model);
	// 	for (let i: number = 1; i <= 2; i++) {
	// 		const trimester = {
	// 			trimester: i,
	// 			paid: i == 1 ? true : false,
	// 			months: []
	// 		};
	// 		for (let a: number = i == 1 ? 0 : 2; a <= (i == 1 ? 2 : 5); a++) {
	// 			console.log(a);
	// 			const month = {
	// 				month: a,
	// 				scripts: []
	// 			};
	// 			for (let script of publisher_scripts) {
	// 				const entry = {
	// 					script_id: script,
	// 					users: []
	// 				};
	// 				for (let user of users) {
	// 					const user_entry = {
	// 						user_id: user._id,
	// 						pages: random.number({ min: 10, max: 100 })
	// 					};
	// 					// @ts-expect-error
	// 					entry.users.push({ ...user_entry });
	// 				}
	// 				// @ts-expect-error
	// 				month.scripts.push({ ...entry });
	// 			}
	// 			// @ts-expect-error
	// 			trimester.months.push({ ...month });
	// 		}
	// 		model.analytics[0].trimesters.push(trimester);
	// 	}
	// console.log(model);
	// try {
	// 	await model.save();
	// } catch (error) {
	// 	console.log(error);
	// }
	// };
};
