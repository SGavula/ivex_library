import { user_model } from '../models';
import bcrypt from 'bcrypt';
import { internet, name, address, random, vehicle } from 'faker/locale/sk';

export const seedUsers = async () => {
	console.log('removing existing users');
	user_model.collection.drop();
	console.log('seeding users');
	for (let i = 0; i <= 15; i++) {
		let date = new Date();
		date.setDate(date.getDate() + random.number(30));
		let salt = 10;
		let randomNum = random.number({ min: 1, max: 2 });
		let password = await bcrypt.hash('password', salt);
		let user: any = new user_model({
			email: internet.email(),
			password: password,
			first_name: name.firstName(),
			last_name: name.lastName(),
			address: address.streetAddress(),
			credit_card: '4111111145551142',
			subscription_ending: date,
			verified: true
		});
		if (randomNum == 1) {
			(user.university = vehicle.vehicle()),
				(user.faculty = vehicle.manufacturer()),
				(user.subject = vehicle.model()),
				(user.year = random.number({ min: 1, max: 4 })),
				(user.gender = name.gender());
		}
		try {
			user.save();
		} catch (error) {
			console.log(error);
		}
	}
};
