import request from 'supertest';
import { app } from '../../app';
import { name, random } from 'faker';

// User
// const first_name = name.firstName();
// const last_name = name.lastName();
// const email = internet.email();
// const add = address.streetName();
// const password = internet.password();
// const credit_card = '4111111111111111';
// Script
const script_name = name.findName();
let categories = [
	'math',
	'psychology',
	'finance',
	'computer science',
	'medicie',
	'chemistry'
];
const category = [ random.arrayElement(categories) ];

// let id: String, token: String;
// // Login
// beforeAll(async (done) => {
// 	await request(app).post('/api/user').send({
// 		email: email,
// 		first_name: first_name,
// 		last_name: last_name,
// 		credit_card: credit_card,
// 		address: add,
// 		password: password
// 	});
// 	done();
// });

// beforeAll(async (done) => {
// 	try {
// 		await request(app)
// 			.post('/api/auth/login')
// 			.send({
// 				email: email,
// 				password: password
// 			})
// 			.then((response) => {
// 				id = response.body.data.user_id;
// 				token = response.body.data.token; // save the token!
// 				done();
// 			});
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

test('Should create script', async (done) => {
	await request(app)
		.post('/api/script')
		.send({
			name: script_name,
			category: category
		})
		.expect(200);
	done();
});

test('Attempt to create script - no name', async (done) => {
	await request(app)
		.post('/api/script')
		.send({
			category: category
		})
		.expect(400);
	done();
});

test('Attempt to create script - no category', async (done) => {
	await request(app)
		.post('/api/script')
		.send({
			name: script_name
		})
		.expect(400);
	done();
});
