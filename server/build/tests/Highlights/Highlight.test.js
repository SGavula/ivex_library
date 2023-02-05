"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const faker_1 = require("faker");
const nanoid_1 = require("nanoid");
const first_name = faker_1.name.firstName();
const last_name = faker_1.name.lastName();
const email = faker_1.internet.email();
const add = faker_1.address.streetName();
const password = faker_1.internet.password();
const credit_card = '4111111111111111';
const script_name = faker_1.name.findName();
let categories = [
    'math',
    'psychology',
    'finance',
    'computer science',
    'medicie',
    'chemistry'
];
const category = [faker_1.random.arrayElement(categories)];
let script_id, user_id;
beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
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
}));
beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post('/api/script')
        .send({
        name: script_name,
        category: category
    })
        .then((res) => {
        script_id = res.body.data._id;
        done();
    });
}));
test('Create highlight with not existing user', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post(`/api/highlight/script/${script_id}/`)
        .send({
        user_id: (0, nanoid_1.nanoid)(5),
        textLayer: 'Lorem Ipsum',
        page: 1
    })
        .expect(404);
    done();
}));
test('Create highlight with not existing script', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post(`/api/highlight/script/${(0, nanoid_1.nanoid)(7)}/`)
        .send({
        user_id: user_id,
        textLayer: 'Lorem Ipsum',
        page: 1
    })
        .expect(404);
    done();
}));
test('Test validator fields', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post(`/api/highlight/script/${script_id}/`)
        .send({
        textLayer: 'Lorem Ipsum'
    })
        .expect(400);
    yield (0, supertest_1.default)(app_1.app)
        .post(`/api/highlight/script/${script_id}/`)
        .send({
        page: 1
    })
        .expect(400);
    done();
}));
test('Should create highlight', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post(`/api/highlight/script/${script_id}/`)
        .send({
        user_id: user_id,
        textLayer: 'Lorem Ipsum',
        page: 1
    })
        .expect(200);
    done();
}));
test('Should create highlight on same page', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post(`/api/highlight/script/${script_id}/`)
        .send({
        user_id: user_id,
        textLayer: 'Lorem Ipsum',
        page: 1
    })
        .expect(200);
    done();
}));
test('Should create highlight on another page', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post(`/api/highlight/script/${script_id}/`)
        .send({
        user_id: user_id,
        textLayer: 'Lorem Ipsum',
        page: 2
    })
        .expect(200);
    done();
}));
test('Should attempt to get highlight - no script with that id', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .get(`/api/highlight/script/${(0, nanoid_1.nanoid)(7)}/user/${user_id}/page/1`)
        .expect(404);
    done();
}));
test('Should attempt to get highlight - no user with that id', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .get(`/api/highlight/script/${script_id}/user/${(0, nanoid_1.nanoid)(5)}/page/1`)
        .expect(404);
    done();
}));
test('Should attempt to get highlight - wrong page format', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .get(`/api/highlight/script/${script_id}/user/${user_id}/page/a`)
        .expect(400);
    done();
}));
test('Should get highlight', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .get(`/api/highlight/script/${script_id}/user/${user_id}/page/1`)
        .expect(200);
    done();
}));
//# sourceMappingURL=Highlight.test.js.map