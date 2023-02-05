import { publisher_analytics_model, script_model } from '../database/models';
import schedule from 'node-schedule';

export function pickedScriptEveryDay() {
	console.log('Scheduling changing picked scripts for 8am every day');
	schedule.scheduleJob('* * 8 * * *', async function() {
		try {
			const pickedScripts: any = await script_model.find({
				picked: true
			});
			if (pickedScripts) {
				pickedScripts.forEach((script: any) => {
					script.picked = false;
					script.save();
				});
			}
			let allScripts: any = [];
			const publisher_analytics:any = await publisher_analytics_model.find();
			for (let publisher of publisher_analytics) {
				if (publisher.scripts) {
					for (let script of publisher.scripts) {
						for (let data of script.data) {
							if (data.year == new Date().getFullYear()) {
								for (let month of data.months) {
									if (month.num == new Date().getMonth()) {
										allScripts.push({
											id: script.script_id,
											opens: month.opens
										});
									}
								}
							}
						}
					}
				}
			}
			const topReading = allScripts
				.sort((a: any, b: any) => b.opens - a.opens)
				.slice(0, 5);
			console.log('Top reading this month:', topReading);
			const topReadingOnlyIds = topReading.map((a: any) => {
				return a.id;
			});

			const topFiveScripts = await script_model.find({
				_id: { $in: topReadingOnlyIds }
			});
			topFiveScripts.forEach((script: any) => {
				script.picked = true;
				script.save();
			});
		} catch (error) {
			console.log(error);
		}
	});
}
