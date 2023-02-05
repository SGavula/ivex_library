import { admin_model } from '../models';
import bcrypt from 'bcrypt';
import { internet } from 'faker/locale/sk';

export const seedAdmins = async () => {
	console.log('removing existing admins');
	admin_model.collection.drop();
	console.log('seeding admins');
	for (let i = 0; i <= 2; i++) {
		let salt = 10;
		let password = await bcrypt.hash('password', salt);
		let user: any = new admin_model({
			email: internet.email(),
			password: password
		});
		try {
			user.save();
		} catch (error) {
			console.log(error);
		}
	}
};
