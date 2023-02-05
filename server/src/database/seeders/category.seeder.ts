import { category_model } from '../models';

let categories = [
	'math',
	'psychology',
	'finance',
	'computer science',
	'medicie',
	'chemistry',
	'managment',
	'fyizio',
	'asdasdasd',
	'asdasd',
	'fasfasfas',
	'adaqw',
	'asdasd92p0',
	'asdasd012dmasp',
	'neviem',
	'stale_neviem',
	'sak daco',
	'messas',
	'oasdkpoqwmmnmcinqi',
	'jhtjijizxi',
	'asdmpi2j-dkas[l',
	'lololol',
	'asdasdasd',
	'papapapapapa',
	'asalalala',
	'alalalalala',
	'asdasdasdasdasdasd',
	'asd',
	'lala',
	'qwerty',
	'magnifico',
	'trululi',
	'carabka',
	'harry potter je super',
	'abraka dabra',
	'avada kedavra',
	'expecto patronum',
	'expeliarmus',
	'sectusmepra',
	'homeum revelio',
	'accio',
	'protego maxima',
	'mugulum repelio',
	'bombarda',
	'alohomora'
];

export async function seedCategories() {
	console.log('seeding categories');
	category_model.collection.drop();
	// categories.forEach(async (category) => {
	// 	let data = new category_model({
	// 		category_name: category
	// 	});
	// 	console.log(data);
	// 	await data.save();
	// });

	for (let category in categories) {
		let data = new category_model({
			category_name: categories[category]
		});
		await data.save();
	}
}
