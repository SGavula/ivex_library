import request from 'supertest';
import { app } from '../../app';
import { internet, name } from 'faker';
import { nanoid } from 'nanoid';

const p_name = name.findName();
const email = internet.email();
let publisher_id: String;

// Create publisher to delete
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

// ** Tests
test('Should attempt to delete publisher that doesnt exist', async (done) => {
	await request(app).delete(`/api/publisher/${nanoid(6)}`).expect(400);
	done();
});

test('Should delete publisher', async (done) => {
	await request(app).delete(`/api/publisher/${publisher_id}`).expect(200);
	done();
});

// Check if publisher is deleted
afterAll(async (done) => {
	await request(app)
		.get(`/api/publisher/${publisher_id}`)
		.send({
			name: p_name,
			email
		})
		.expect(400);

	done();
});
