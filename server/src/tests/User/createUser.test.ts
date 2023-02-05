import request from 'supertest';
import { app } from '../../app';
import { name, internet, address } from 'faker';

const first_name = name.firstName();
const last_name = name.lastName();
const email = internet.email();
const add = address.streetName();
const password = internet.password();
const credit_card = '4111111111111111';

test('Should create user with error - not a email', async (done) => {
	await request(app)
		.post('/api/user')
		.send({
			first_name: first_name,
			last_name: last_name,
			credit_card: credit_card,
			address: add,
			password: password
		})
		.expect(400);
	done();
});

test('Should create user with error - wrong email format', async (done) => {
	await request(app)
		.post('/api/user')
		.send({
			email: 'this is not a email',
			first_name: first_name,
			last_name: last_name,
			credit_card: credit_card,
			address: add,
			password: password
		})
		.expect(400);
	done();
});

test('Should create user with error - no first name', async (done) => {
	await request(app)
		.post('/api/user')
		.send({
			email: email,
			last_name: last_name,
			credit_card: credit_card,
			address: add,
			password: password
		})
		.expect(400);
	done();
});

test('Should create user with error - no last name', async (done) => {
	await request(app)
		.post('/api/user')
		.send({
			email: email,
			first_name: first_name,
			credit_card: credit_card,
			address: add,
			password: password
		})
		.expect(400);
	done();
});

test('Should create user with error - no credit card', async (done) => {
	await request(app)
		.post('/api/user')
		.send({
			email: email,
			first_name: first_name,
			last_name: last_name,
			address: add,
			password: password
		})
		.expect(400);
	done();
});

test('Should create user with error - wrong credtit card format', async (
	done
) => {
	await request(app)
		.post('/api/user')
		.send({
			credit_card: '41111111111',
			email: email,
			first_name: first_name,
			last_name: last_name,
			address: add,
			password: password
		})
		.expect(400);
	done();
});

test('Should create user with error - no adress', async (done) => {
	await request(app)
		.post('/api/user')
		.send({
			email: email,
			first_name: first_name,
			last_name: last_name,
			credit_card: credit_card,
			password: password
		})
		.expect(400);
	done();
});

test('Should create user with error - no password', async (done) => {
	await request(app)
		.post('/api/user')
		.send({
			email: email,
			first_name: first_name,
			last_name: last_name,
			credit_card: credit_card,
			address: add,
			password: ''
		})
		.expect(400);
	done();
});

test('Should create user', async (done) => {
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
		.expect(200);
	done();
});

test('Should create user with error - email already exists', async (done) => {
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
		.expect(400);
	done();
});
