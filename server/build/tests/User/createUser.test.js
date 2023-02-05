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
const first_name = faker_1.name.firstName();
const last_name = faker_1.name.lastName();
const email = faker_1.internet.email();
const add = faker_1.address.streetName();
const password = faker_1.internet.password();
const credit_card = '4111111111111111';
test('Should create user with error - not a email', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
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
}));
test('Should create user with error - wrong email format', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
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
}));
test('Should create user with error - no first name', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
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
}));
test('Should create user with error - no last name', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
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
}));
test('Should create user with error - no credit card', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
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
}));
test('Should create user with error - wrong credtit card format', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
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
}));
test('Should create user with error - no adress', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
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
}));
test('Should create user with error - no password', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
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
}));
test('Should create user', (done) => __awaiter(void 0, void 0, void 0, function* () {
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
        .expect(200);
    done();
}));
test('Should create user with error - email already exists', (done) => __awaiter(void 0, void 0, void 0, function* () {
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
        .expect(400);
    done();
}));
//# sourceMappingURL=createUser.test.js.map