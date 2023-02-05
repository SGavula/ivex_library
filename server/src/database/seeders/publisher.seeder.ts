import { publisher_model } from '../models';
import bcrypt from 'bcrypt';
import { internet, name } from 'faker/locale/sk';

export const seedPublishers = async () => {
	console.log('removing existing publishers');
	publisher_model.collection.drop();
	console.log('seeding publishers');
	for (let i = 0; i <= 10; i++) {
		let salt = 10;
		let password = await bcrypt.hash('password', salt);
		let user: any = new publisher_model({
			email: internet.email(),
			password: password,
			name: name.findName()
		});
		try {
			user.save();
		} catch (error) {
			console.log(error);
		}
	}
};
