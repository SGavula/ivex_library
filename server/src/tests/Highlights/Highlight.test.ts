import request from 'supertest';
import { app } from '../../app';
import { address, internet, name, random } from 'faker';
import { nanoid } from 'nanoid';

// User
const first_name = name.firstName();
const last_name = name.lastName();
const email = internet.email();
const add = address.streetName();
const password = internet.password();
const credit_card = '4111111111111111';

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
let script_id: String, user_id: String;

// let id: String, token: String;
// Login
beforeAll(async (done) => {
	await request(app)
		.post('/api/user')
		.send({
			email: email,
			first_name: first_name,
			last_name: last_name,
			credit_card: credit_card,
			address: add,
			password: password
		})
		.then((res) => {
			user_id = res.body.data._id;
			done();
		});
});

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

beforeAll(async (done) => {
	await request(app)
		.post('/api/script')
		.send({
			name: script_name,
			category: category
		})
		.then((res) => {
			script_id = res.body.data._id;
			done();
		});
});

test('Create highlight with not existing user', async (done) => {
	await request(app)
		.post(`/api/highlight/script/${script_id}/`)
		.send({
			user_id: nanoid(5),
			textLayer: 'Lorem Ipsum',
			page: 1
		})
		.expect(404);
	done();
});

test('Create highlight with not existing script', async (done) => {
	await request(app)
		.post(`/api/highlight/script/${nanoid(7)}/`)
		.send({
			user_id: user_id,
			textLayer: 'Lorem Ipsum',
			page: 1
		})
		.expect(404);
	done();
});

test('Test validator fields', async (done) => {
	await request(app)
		.post(`/api/highlight/script/${script_id}/`)
		.send({
			textLayer: 'Lorem Ipsum'
		})
		.expect(400);

	await request(app)
		.post(`/api/highlight/script/${script_id}/`)
		.send({
			page: 1
		})
		.expect(400);

	done();
});

test('Should create highlight', async (done) => {
	await request(app)
		.post(`/api/highlight/script/${script_id}/`)
		.send({
			user_id: user_id,
			textLayer: 'Lorem Ipsum',
			page: 1
		})
		.expect(200);
	done();
});

test('Should create highlight on same page', async (done) => {
	await request(app)
		.post(`/api/highlight/script/${script_id}/`)
		.send({
			user_id: user_id,
			textLayer: 'Lorem Ipsum',
			page: 1
		})
		.expect(200);

	done();
});

test('Should create highlight on another page', async (done) => {
	await request(app)
		.post(`/api/highlight/script/${script_id}/`)
		.send({
			user_id: user_id,
			textLayer: 'Lorem Ipsum',
			page: 2
		})
		.expect(200);

	done();
});

test('Should attempt to get highlight - no script with that id', async (
	done
) => {
	await request(app)
		.get(`/api/highlight/script/${nanoid(7)}/user/${user_id}/page/1`)
		.expect(404);

	done();
});

test('Should attempt to get highlight - no user with that id', async (done) => {
	await request(app)
		.get(`/api/highlight/script/${script_id}/user/${nanoid(5)}/page/1`)
		.expect(404);

	done();
});

test('Should attempt to get highlight - wrong page format', async (done) => {
	await request(app)
		.get(`/api/highlight/script/${script_id}/user/${user_id}/page/a`)
		.expect(400);

	done();
});

test('Should get highlight', async (done) => {
	await request(app)
		.get(`/api/highlight/script/${script_id}/user/${user_id}/page/1`)
		.expect(200);

	done();
});
