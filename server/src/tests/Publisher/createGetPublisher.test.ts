import request from 'supertest';
import { app } from '../../app';
import { internet, name } from 'faker';
import { nanoid } from 'nanoid';

const p_name = name.findName();
const email = internet.email();
let publisher_id: String;
test('Should attempt to create publisher - validator errors', async (done) => {
	await request(app)
		.post(`/api/publisher`)
		.send({
			name: p_name
		})
		.expect(400);

	await request(app)
		.post(`/api/publisher`)
		.send({
			email
		})
		.expect(400);
	done();
});

test('Should create publisher', async (done) => {
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

test('Should attempt to create publisher with email that already exists', async (
	done
) => {
	await request(app)
		.post(`/api/publisher`)
		.send({
			name: p_name,
			email
		})
		.expect(400);

	done();
});

test('Should get publisher', async (done) => {
	await request(app)
		.get(`/api/publisher/${publisher_id}`)
		.expect(200)
		.then((res) => {
			expect(res.body.data.name).toBe(p_name);
			expect(res.body.data.email).toBe(email);
			done();
		});
});

test('Should attempt to get publisher - doesnt exist', async (done) => {
	await request(app).get(`/api/publisher/${nanoid(5)}`).expect(400);
	done();
});
