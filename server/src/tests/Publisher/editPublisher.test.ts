import request from 'supertest';
import { app } from '../../app';
import { internet, name } from 'faker';
import { nanoid } from 'nanoid';

const p_name = name.findName();
const email = internet.email();

const new_name = name.findName();
const new_email = internet.email();
const password = internet.password();

let publisher_id: String;

beforeAll(async (done) => {
	await request(app)
		.post(`/api/publisher`)
		.send({
			name: p_name,
			email
		})
		.expect(200)
		.then((res) => {
			publisher_id = res.body.data._id;
			done();
		});
});

test('Shiould attempt to edit publisher - validation errors', async (done) => {
	await request(app)
		.put(`/api/publisher/${publisher_id}`)
		.send({
			name: 1
		})
		.expect(400);

	done();

	await request(app)
		.put(`/api/publisher/${publisher_id}`)
		.send({
			email: 1
		})
		.expect(400);

	done();

	await request(app)
		.put(`/api/publisher/${publisher_id}`)
		.send({
			email: 'this is not an email'
		})
		.expect(400);

	done();

	await request(app)
		.put(`/api/publisher/${publisher_id}`)
		.send({
			password: 1
		})
		.expect(400);

	done();
});

test('Shiould attempt to edit publisher - wrong id', async (done) => {
	await request(app)
		.put(`/api/publisher/${nanoid(5)}`)
		.send({
			name: new_name,
			email: new_email
		})
		.expect(400);

	done();
});

test('Shiould edit publisher name and email', async (done) => {
	await request(app)
		.put(`/api/publisher/${publisher_id}`)
		.send({
			name: new_name,
			email: new_email
		})
		.expect(200)
		.then((res) => {
			expect(res.body.data.name).toBe(new_name);
			expect(res.body.data.email).toBe(new_email);
			done();
		});
});

test('Shiould edit publisher password', async (done) => {
	await request(app)
		.put(`/api/publisher/${publisher_id}`)
		.send({
			password: password
		})
		.expect(200);
	done();
});
