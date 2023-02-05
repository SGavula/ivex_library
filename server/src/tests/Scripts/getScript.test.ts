import request from 'supertest';
import { app } from '../../app';
import { name, random } from 'faker';
import { nanoid } from 'nanoid';

// ** User
// const first_name = name.firstName();
// const last_name = name.lastName();
// const email = internet.email();
// const add = address.streetName();
// const password = internet.password();
// const credit_card = '4111111111111111';
// let id: String, token: String;

// ** Script
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
let script_id: String;

// ** Login
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

// ** Create script to get
beforeAll(async (done) => {
	await request(app)
		.post('/api/script')
		.send({
			name: script_name,
			category: category
		})
		.then((response) => {
			script_id = response.body.data._id;
			done();
		});
});

// **
// ** Actual tests
// **

test('Should get script', async (done) => {
	await request(app).get(`/api/script/${script_id}`).expect(200);
	done();
});

test('Should attempt to get script - wrong id', async (done) => {
	await request(app).get(`/api/script/${() => nanoid(5)}`).expect(404);
	done();
});

test('Should attempt to get script - no id', async (done) => {
	await request(app).get(`/api/script/`).expect(404);
	done();
});
