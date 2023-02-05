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
let id;
let fakeId = (0, nanoid_1.nanoid)(7);
let token;
beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app).post('/api/user').send({
        email: email,
        first_name: first_name,
        last_name: last_name,
        credit_card: credit_card,
        address: add,
        password: password
    });
    done();
}));
beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, supertest_1.default)(app_1.app)
            .post('/api/auth/login')
            .send({
            email: email,
            password: password
        })
            .then((response) => {
            id = response.body.data.user_id;
            token = response.body.data.token;
            done();
        });
    }
    catch (error) {
        console.log(error);
    }
}));
test('Should get user with error - wrong id', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .get(`/api/user/${fakeId}`)
        .set('x-token', token)
        .send()
        .expect(401);
    done();
}));
test('Should get user', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .get(`/api/user/${id}`)
        .set('x-token', token)
        .send()
        .expect(200);
    done();
}));
test('Should get user with error - not authorized to access', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app).get('/api/user/' + id).send().expect(401);
    done();
}));
//# sourceMappingURL=getUser.test.js.map