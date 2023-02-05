import { transporter } from '../emails';
import {
	ScriptInterface,
	script_model,
	UserAnalayticsInterface,
	UserInterface,
	user_analytics_model,
	user_model
} from '../database/models';
import { MessageInterface } from './emailMessage.interface';
import schedule from 'node-schedule';

const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

// @ts-ignore
const _randomslice = (ar: Array<any>, size: number) => {
	let new_ar: Array<any> = [ ...ar ];
	new_ar.splice(Math.floor(Math.random() * ar.length), 1);
	return ar.length <= size + 1 ? new_ar : _randomslice(new_ar, size);
};

export async function sendEmailToRelevantUsersByCategory(
	category: string,
	script_id: string
) {
	const eligableUsers: Array<UserInterface> = await user_model
		.find({
			got_email: false,
			email_subscription: true
		})
		.select('_id');
	if (!eligableUsers) return false;

	const eligableUsersIds = eligableUsers.map((obj) => obj._id);

	const eligableScripts: Array<ScriptInterface> = await script_model.find({
		category: category
	});

	if (!eligableScripts || eligableScripts.length < 3) return false;

	const eligableScriptIds = eligableScripts.map((obj) => obj._id);
	console.log(eligableScriptIds);

	const user_analytics_data: Array<
		UserAnalayticsInterface
	> = await user_analytics_model.find({ user_id: { $in: eligableUsersIds } });

	const new_script: ScriptInterface = await script_model.findOne({
		_id: script_id
	});

	const secondaryScriptIds: Array<any> = _randomslice(eligableScriptIds, 2);
	console.log(secondaryScriptIds);

	user_analytics_data.forEach(async (data) => {
		const user_scripts: Array<boolean> = [];
		data.scripts.forEach((script) => {
			if (eligableScriptIds.includes(script.script_id)) {
				user_scripts.push(true);
			}
		});
		if (user_scripts.length / eligableScripts.length >= 0.5) {
			let user: UserInterface = await user_model.findOne({
				_id: data.user_id
			});
			user.got_email = true;
			await user.save();

			const first_script: ScriptInterface = await script_model.findOne({
				_id: secondaryScriptIds[0]
			});

			const second_script: ScriptInterface = await script_model.findOne({
				_id: secondaryScriptIds[1]
			});

			const unsubscribe_url =
				process.env.NODE_ENV == 'PROD'
					? `https://ivexlibrary.sk/unsubscribe/${user.email_subscription_token}`
					: `http://localhost:3000/unsubscribe/${user.email_subscription_token}`;

			const message: MessageInterface = {
				from: 'noreply@ivexlibrary.sk',
				to: 'misogally@gmail.com',
				subject: `Nová kniha v kategórií ${capitalize(category)}`,
				template: 'layouts/new_script',
				context: {
					first_image: new_script.image,
					script_id: script_id,
					second_image: first_script.image,
					second_name: first_script.name,
					second_author: first_script.author,
					second_year: first_script.year,
					second_id: first_script._id,
					third_image: second_script.image,
					third_name: second_script.name,
					third_author: second_script.author,
					third_year: second_script.year,
					third_id: second_script._id,
					unsubscribe_url
				}
			};

			transporter.sendMail(message);
			console.log(
				'Email sent to: ',
				user.email,
				' in event of added similar script to database! This user wont recive another email about updates in another 5 days'
			);
			const date: Date = new Date();
			date.setDate(date.getDate() + 5);
			schedule.scheduleJob(date, () => {
				user.got_email = false;
				user.save();
				console.log('User ', user.email, 'can now recive emails');
			});
		}
	});

	return true;
}
