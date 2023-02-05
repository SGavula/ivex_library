import request from 'supertest';
import { app } from '../../app';
import { name, internet, address } from 'faker';
import { nanoid } from 'nanoid';

const first_name = name.firstName();
const last_name = name.lastName();
const email = internet.email();
const add = address.streetName();
const password = internet.password();
const credit_card = '4111111111111111';
let id: String;
let fakeId = nanoid(7);
let token: String;

beforeAll(async (done) => {
	await request(app).post('/api/user').send({
		email: email,
		first_name: first_name,
		last_name: last_name,
		credit_card: credit_card,
		address: add,
		password: password
	});
	done();
});

beforeAll(async (done) => {
	try {
		await request(app)
			.post('/api/auth/login')
			.send({
				email: email,
				password: password
			})
			.then((response) => {
				id = response.body.data.user_id;
				token = response.body.data.token; // save the token!
				done();
			});
	} catch (error) {
		console.log(error);
	}
});

test('Should get user with error - wrong id', async (done) => {
	// @ts-expect-error
	await request(app)
		.get(`/api/user/${fakeId}`)
		.set('x-token', token)
		.send()
		.expect(401);
	done();
});
test('Should get user', async (done) => {
	// @ts-expect-error
	await request(app)
		.get(`/api/user/${id}`)
		.set('x-token', token)
		.send()
		.expect(200);
	done();
});

test('Should get user with error - not authorized to access', async (done) => {
	await request(app).get('/api/user/' + id).send().expect(401);
	done();
});
