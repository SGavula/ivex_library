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
const p_name = faker_1.name.findName();
const email = faker_1.internet.email();
const new_name = faker_1.name.findName();
const new_email = faker_1.internet.email();
const password = faker_1.internet.password();
let publisher_id;
beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
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
}));
test('Shiould attempt to edit publisher - validation errors', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .put(`/api/publisher/${publisher_id}`)
        .send({
        name: 1
    })
        .expect(400);
    done();
    yield (0, supertest_1.default)(app_1.app)
        .put(`/api/publisher/${publisher_id}`)
        .send({
        email: 1
    })
        .expect(400);
    done();
    yield (0, supertest_1.default)(app_1.app)
        .put(`/api/publisher/${publisher_id}`)
        .send({
        email: 'this is not an email'
    })
        .expect(400);
    done();
    yield (0, supertest_1.default)(app_1.app)
        .put(`/api/publisher/${publisher_id}`)
        .send({
        password: 1
    })
        .expect(400);
    done();
}));
test('Shiould attempt to edit publisher - wrong id', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .put(`/api/publisher/${(0, nanoid_1.nanoid)(5)}`)
        .send({
        name: new_name,
        email: new_email
    })
        .expect(400);
    done();
}));
test('Shiould edit publisher name and email', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
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
}));
test('Shiould edit publisher password', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .put(`/api/publisher/${publisher_id}`)
        .send({
        password: password
    })
        .expect(200);
    done();
}));
//# sourceMappingURL=editPublisher.test.js.map