import {
	publisher_analytics_model,
	// PublisherAnalayticsInterface,
	publisher_model,
	// PublisherInterface,
	script_model,
	ScriptInterface,
	user_analytics_model,
	UserAnalayticsInterface,
	UserInterface,
	user_model
} from '../database/models';
import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { response } from '../helpers';

export const createAnalyticsEntry = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let analytics: UserAnalayticsInterface;
	try {
		analytics = await user_analytics_model.findOne({
			user_id: req.body.user_id
		});
		if (!analytics)
			return res
				.status(400)
				.jsonp(
					response(400, 'Analytics for this record not found', {})
				);

		const user: UserInterface = await user_model.findOne({
			_id: req.body.user_id
		});
		if ((user.paid = false)) {
			const scriptById: ScriptInterface = await script_model.findOne({
				_id: req.body.script_id
			});
			if (!scriptById)
				return res
					.status(400)
					.jsonp(response(400, 'Script with that id not found', {}));

			let script_id: string = req.body.script_id;
			// let user_id: string = req.body.user_id;
			let pages: number = req.body.pages;
			// let trimester = getTrimester();
			let fullYear: number = new Date().getFullYear();
			let foundScript: boolean | any = false;
			analytics.scripts.forEach((script: any) => {
				if (script.script_id == script_id) {
					foundScript = script;
				}
			});
			if (foundScript) {
				if (foundScript.max_pages < pages) {
					foundScript.max_pages = pages;
				}
				if (!foundScript.pages_read.includes(pages)) {
					foundScript.pages_read.push(pages);
					// TODO: Rewrite year forEach to for... of... or findIndex and add creating new entry when false
					foundScript.data.forEach((year: any) => {
						if (year.year == fullYear) {
							year.months.forEach((month: any) => {
								if (month.num == new Date().getMonth()) {
									month.pages.push(pages);
									month.month_pages = month.pages.length;
									let percentile =
										month.month_pages /
										foundScript.full_pages;
									//@ts-expect-error
									let vpc = scriptById.pricing * percentile;
									month.vpc = vpc;
								}
							});
						}
					});
				}
			} else {
				const newScriptEntry: UserAnalayticsInterface['scripts'][0] = {
					script_id: script_id,
					max_pages: pages,
					pages_read: [ pages ],
					full_pages: req.body.full_pages,
					data: [
						{
							year: new Date().getFullYear(),
							months: []
						}
					]
				};
				for (let i = 0; i <= 11; i++) {
					const month = {
						num: i,
						pages: [],
						month_pages: 0,
						vpc: 0
					};
					newScriptEntry.data[0].months.push(month);
				}

				// Modify new created entry to have new data

				newScriptEntry.data[0].months[new Date().getMonth()].pages.push(
					pages
				);
				let percentile: number =
					newScriptEntry.data[0].months[new Date().getMonth()].pages
						.length / newScriptEntry.full_pages;
				// @ts-expect-error
				let vpc: number = scriptById.pricing * percentile;
				newScriptEntry.data[0].months[new Date().getMonth()].vpc = vpc;
				newScriptEntry.data[0].months[
					new Date().getMonth()
				].month_pages =
					newScriptEntry.data[0].months[
						new Date().getMonth()
					].pages.length;

				analytics.scripts.push(newScriptEntry);
			}
		}

		await analytics.save();
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Analytics created', analytics));
};

export const CreateScriptAnalyticsEntry = async (
	req: Request,
	res: Response
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let analytics: any;
	try {
		analytics = await publisher_analytics_model.findOne({
			publisher_id: req.body.publisher_id
		});
		if (!analytics)
			return res
				.status(400)
				.jsonp(
					response(400, 'Analytics for this record not found', {})
				);

		const year = new Date().getFullYear();
		const month: number = new Date().getMonth();
		for (let script of analytics.scripts) {
			if (script.script_id == req.params.script_id) {
				for (let data of script.data) {
					if (data.year == year) {
						for (let monthEntry of data.months) {
							if (monthEntry.num == month) {
								monthEntry.opens = ++monthEntry.opens;
							}
						}
					}
				}
			}
		}
		await analytics.save();
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Analytics created', analytics));
};

export const getAnalyticsForPublisher = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let result: any = [];
	try {
		let analytics: any = await publisher_analytics_model.findOne({
			publisher_id: req.params.publisher_id
		});
		if (!analytics)
			return res
				.status(400)
				.jsonp(
					response(400, 'Analytics for this record not found', {})
				);

		for (let script of analytics.scripts) {
			if (script.script_id == req.params.script_id) {
				for (let year of script.data) {
					const yearEntry = {
						year: year.year,
						months: []
					};
					for (let month of year.months) {
						// @ts-expect-error
						yearEntry.months.push(month.opens);
					}
					result.push(yearEntry);
				}
			}
		}
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Analytics getted', result));
};

export const getPublisherPayFromAnalytics = async (
	req: Request,
	res: Response
) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let result: any = 0;
	try {
		let analytics = await user_analytics_model.find();
		if (!analytics)
			return res
				.status(400)
				.jsonp(
					response(400, 'Analytics for this record not found', {})
				);

		const publisher: any = await publisher_model.findOne({
			_id: req.params.publisher_id
		});

		if (!publisher)
			return res
				.status(400)
				.jsonp(
					response(400, 'Analytics for this record not found', {})
				);

		let scripts: Array<String> = publisher.scripts;
		let total_pay: number = 0;
		for (let user of analytics) {
			let user_scripts_data = [];
			// @ts-ignore
			for (let script of user.scripts) {
				if (scripts.includes(script.script_id)) {
					for (let scriptData of script.data) {
						if (scriptData.year == new Date().getFullYear())
							for (let month of scriptData.months) {
								if (month.num == req.params.month_num) {
									user_scripts_data.push({
										script_id: script.script_id,
										vpc: month.vpc
									});
								}
							}
					}
				}
			}
			console.log(user_scripts_data);
			// Getting MSVPC
			let MSVPC = 0;
			user_scripts_data.forEach((data: any) => {
				MSVPC = MSVPC + data.vpc;
			});

			// Getting Script Final number for that user
			user_scripts_data.forEach((data: any) => {
				let x2 = data.vpc / MSVPC;
				let x3 = x2 * 5;
				let x4 = x3 * 0.5;
				total_pay = total_pay + x4;
				console.log(total_pay);
			});
			result = total_pay.toFixed(2);
		}
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Analytics getted', result));
};

export const getPublisherAllTimeViews = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let result: any = 0;
	try {
		let analytics: any = await publisher_analytics_model.findOne({
			publisher_id: req.params.publisher_id
		});
		if (!analytics)
			return res
				.status(400)
				.jsonp(
					response(400, 'Analytics for this record not found', {})
				);

		analytics.scripts.forEach((script: any) => {
			script.data.forEach((entry: any) => {
				entry.months.forEach((month: any) => {
					result = result + month.opens;
				});
			});
		});
	} catch (error) {
		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Analytics getted', result));
};

export const getPublisherPayForMonths = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let result: any = [];
	try {
		let analytics = await user_analytics_model.find();
		if (!analytics)
			return res
				.status(400)
				.jsonp(
					response(400, 'Analytics for this record not found', {})
				);

		const publisher: any = await publisher_model.findOne({
			_id: req.params.publisher_id
		});

		if (!publisher)
			return res
				.status(400)
				.jsonp(
					response(400, 'Analytics for this record not found', {})
				);

		let scripts: Array<String> = publisher.scripts;
		for (let i = 0; i <= 11; i++) {
			let total_pay: number = 0;
			for (let user of analytics) {
				let user_scripts_data = [];
				// @ts-ignore
				for (let script of user.scripts) {
					if (scripts.includes(script.script_id)) {
						for (let scriptData of script.data) {
							if (scriptData.year == new Date().getFullYear())
								for (let month of scriptData.months) {
									if (month.num == i) {
										user_scripts_data.push({
											script_id: script.script_id,
											vpc: month.vpc
										});
									}
								}
						}
					}
				}
				// Getting MSVPC
				let MSVPC = 0;
				user_scripts_data.forEach((data: any) => {
					MSVPC = MSVPC + data.vpc;
				});

				// Getting Script Final number for that user
				user_scripts_data.forEach((data: any) => {
					let x2 = data.vpc / MSVPC;
					let x3 = x2 * 5;
					let x4 = x3 * 0.5;
					total_pay = total_pay + x4;
				});
			}
			result.push(parseFloat(total_pay.toFixed(2)));
		}
	} catch (error) {
		console.log(error);

		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Analytics getted', result));
};

export const getAdminTotalViews = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let result: Number = 0;
	try {
		let analytics: any = await publisher_analytics_model.find();
		if (!analytics)
			return res
				.status(400)
				.jsonp(
					response(400, 'Analytics for this record not found', {})
				);

		// Month
		if (req.params.type == '1') {
			for (let analytic of analytics) {
				for (let script of analytic.scripts) {
					for (let year of script.data) {
						if (year.year == new Date().getFullYear()) {
							for (let month of year.months) {
								if (month.num == new Date().getMonth()) {
									result = result + month.opens;
								}
							}
						}
					}
				}
			}
		}

		// Year
		if (req.params.type == '2') {
			for (let analytic of analytics) {
				for (let script of analytic.scripts) {
					for (let year of script.data) {
						if (year.year == new Date().getFullYear()) {
							for (let month of year.months) {
								result = result + month.opens;
							}
						}
					}
				}
			}
		}

		// Total views
		if (req.params.type == '3') {
			for (let analytic of analytics) {
				for (let script of analytic.scripts) {
					for (let year of script.data) {
						for (let month of year.months) {
							result = result + month.opens;
						}
					}
				}
			}
		}
	} catch (error) {
		console.log(error);

		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Analytics getted', result));
};

export const getAdminTotalPayments = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let result: number = 0;
	try {
		let analytics = await user_analytics_model.find();
		if (!analytics)
			return res
				.status(400)
				.jsonp(
					response(400, 'Analytics for this record not found', {})
				);

		const publishers: any = await publisher_model.find();

		if (!publishers)
			return res
				.status(400)
				.jsonp(
					response(400, 'Analytics for this record not found', {})
				);

		// Month
		if (req.params.type == '1') {
			for (let publisher of publishers) {
				let scripts: Array<String> = publisher.scripts;
				let total_pay: number = 0;
				for (let user of analytics) {
					let user_scripts_data = [];
					// @ts-ignore
					for (let script of user.scripts) {
						if (scripts.includes(script.script_id)) {
							for (let scriptData of script.data) {
								if (scriptData.year == new Date().getFullYear())
									for (let month of scriptData.months) {
										if (
											month.num == new Date().getMonth()
										) {
											user_scripts_data.push({
												script_id: script.script_id,
												vpc: month.vpc
											});
										}
									}
							}
						}
					}
					// Getting MSVPC
					let MSVPC = 0;
					user_scripts_data.forEach((data: any) => {
						MSVPC = MSVPC + data.vpc;
					});

					// Getting Script Final number for that user
					user_scripts_data.forEach((data: any) => {
						let x2 = data.vpc / MSVPC;
						let x3 = x2 * 5;
						let x4 = x3 * 0.5;
						total_pay = total_pay + x4;
					});
				}
				result = result + total_pay;
			}
		}
		// Year
		if (req.params.type == '2') {
			for (let publisher of publishers) {
				let scripts: Array<String> = publisher.scripts;
				let total_pay: number = 0;
				for (let i = 0; i <= 11; i++) {
					for (let user of analytics) {
						let user_scripts_data = [];
						// @ts-ignore
						for (let script of user.scripts) {
							if (scripts.includes(script.script_id)) {
								for (let scriptData of script.data) {
									if (
										scriptData.year ==
										new Date().getFullYear()
									)
										for (let month of scriptData.months) {
											if (month.num == i) {
												user_scripts_data.push({
													script_id: script.script_id,
													vpc: month.vpc
												});
											}
										}
								}
							}
						}
						// Getting MSVPC
						let MSVPC = 0;
						user_scripts_data.forEach((data: any) => {
							MSVPC = MSVPC + data.vpc;
						});

						// Getting Script Final number for that user
						user_scripts_data.forEach((data: any) => {
							let x2 = data.vpc / MSVPC;
							let x3 = x2 * 5;
							let x4 = x3 * 0.5;
							total_pay = total_pay + x4;
						});
					}
				}
				result = result + total_pay;
			}
		}

		if (req.params.type == '3') {
			for (let publisher of publishers) {
				let scripts: Array<String> = publisher.scripts;
				let total_pay: number = 0;
				for (
					let a = new Date().getFullYear() - 5;
					a <= new Date().getFullYear();
					a++
				) {
					console.log(a);
					for (let i = 0; i <= 11; i++) {
						for (let user of analytics) {
							let user_scripts_data = [];
							// @ts-ignore
							for (let script of user.scripts) {
								if (scripts.includes(script.script_id)) {
									for (let scriptData of script.data) {
										if (scriptData.year == a)
											for (let month of scriptData.months) {
												if (month.num == i) {
													user_scripts_data.push({
														script_id:
															script.script_id,
														vpc: month.vpc
													});
												}
											}
									}
								}
							}
							// Getting MSVPC
							let MSVPC = 0;
							user_scripts_data.forEach((data: any) => {
								MSVPC = MSVPC + data.vpc;
							});

							// Getting Script Final number for that user
							user_scripts_data.forEach((data: any) => {
								let x2 = data.vpc / MSVPC;
								let x3 = x2 * 5;
								let x4 = x3 * 0.5;
								total_pay = total_pay + x4;
							});
						}
					}
				}
				result = result + total_pay;
			}
		}
	} catch (error) {
		console.log(error);

		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Analytics getted', result));
};
export const getAdminTotalProfits = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).jsonp(response(400, errors.array()));
	let result: Number = 0;
	try {
	} catch (error) {
		console.log(error);

		return res
			.status(400)
			.jsonp(response(400, 'TryCatch Error', { error }));
	}
	return res.status(200).jsonp(response(200, 'Analytics getted', result));
};
