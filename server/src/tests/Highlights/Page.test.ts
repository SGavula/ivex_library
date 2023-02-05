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

beforeAll(async (done) => {
	await request(app)
		.post('/api/script')
		.send({
			name: script_name,
			category: category
		})
		.expect(200)
		.then((res) => {
			script_id = res.body.data._id;
			done();
		});
});

test('Should attempt to create saved page - not existing script', async (
	done
) => {
	await request(app)
		.post(`/api/highlight/script/${nanoid(5)}/user/${user_id}/page`)
		.send({
			page: 2
		})
		.expect(404);

	done();
});
test('Should attempt to create saved page - not existing user', async (
	done
) => {
	await request(app)
		.post(`/api/highlight/script/${script_id}/user/${nanoid(5)}/page`)
		.send({
			page: 2
		})
		.expect(404);

	done();
});

test('Should attempt to create saved page - wrong page format', async (
	done
) => {
	await request(app)
		.post(`/api/highlight/script/${script_id}/user/${user_id}/page`)
		.send({
			page: 'page'
		})
		.expect(400);

	done();
});

test('Should create saved page', async (done) => {
	await request(app)
		.post(`/api/highlight/script/${script_id}/user/${user_id}/page`)
		.send({
			page: 2
		})
		.expect(200);

	done();
});

test('Should rewrite saved page to 3', async (done) => {
	await request(app)
		.post(`/api/highlight/script/${script_id}/user/${user_id}/page`)
		.send({
			page: 3
		})
		.expect(200)
		.then((res) => {
			expect(res.body.data.last_page).toBe(3);
			done();
		});
});

test('Should attempt to get page - wrong script id', async (done) => {
	await request(app)
		.get(`/api/highlight/script/${nanoid(5)}/user/${user_id}/page`)
		.expect(404);

	done();
});

test('Should attempt to get page - wrong user id', async (done) => {
	await request(app)
		.get(`/api/highlight/script/${script_id}/user/${nanoid(5)}/page`)
		.expect(404);

	done();
});

test('Should attempt to get page - wrong user id', async (done) => {
	await request(app)
		.get(`/api/highlight/script/${script_id}/user/${user_id}/page`)
		.expect(200)
		.then((res) => {
			expect(res.body.data).toBe(3);
			done();
		});
});
