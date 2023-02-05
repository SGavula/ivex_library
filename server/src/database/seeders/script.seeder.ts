import { publisher_model, script_model } from '../models';
import {
	random,
	name,
	lorem,
	commerce,
	address,
	company
} from 'faker/locale/sk';
import path from 'path';
export const seedScripts = async () => {
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
	const keywords = [
		'marketing',
		'ľudské zdroje',
		'financie',
		'projektový manažment',
		'manažérske rozhodovanie',
		'podnikanie',
		'operačný manažment',
		'logistika',
		'strategický manažment',
		'obchod',
		'medicine',
		'právo'
	];

	const images = [ '/sample.png', '/sample2.png', '/sample3.png' ];
	console.log('removing existing scripts');
	script_model.collection.drop();
	let pickedCounter = 0;
	console.log('seeding scripts');
	const publishers: any = await publisher_model.find().select('_id');
	for (let i = 0; i <= 750; i++) {
		let picked: Boolean = false;
		let published: Boolean = true;
		if (pickedCounter < 5) {
			picked = true;
			pickedCounter++;
		} else {
			picked = false;
		}
		let finalArr = [];

		if (i < 30 && i > 25) {
			published = false;
		}

		for (let o = 0; o < random.number({ min: 1, max: 4 }); o++) {
			let authorName = name.findName();
			finalArr.push(authorName);
		}

		let publisher: any = await publisher_model.findOne({
			_id: random.arrayElement(publishers)
		});

		let script: any = new script_model({
			name: commerce.productName(),
			author: finalArr,
			path: path.resolve('../files/sample.pdf'),
			category: random.arrayElement(categories),
			year: random.number({ min: 2000, max: 2021 }),
			info: lorem.paragraph(),
			isbn: random.uuid(),
			keywords: random.arrayElements(keywords),
			image: random.arrayElement(images),
			picked: picked,
			publisher: publisher._id,
			city: address.city(),
			publishing: company.companyName(),
			published: published,
			lang: 'SK'
		});

		if (i <= 10) {
			script.free = true;
		} else {
			script.free = false;
			script.pricing = random.number({ min: 10, max: 25 });
		}

		publisher.scripts.push(script._id);
		try {
			await publisher.save();
			await script.save();
		} catch (error) {
			console.log(error);
		}
	}
};
