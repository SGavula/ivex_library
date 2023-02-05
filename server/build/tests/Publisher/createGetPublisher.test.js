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
let publisher_id;
test('Should attempt to create publisher - validator errors', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post(`/api/publisher`)
        .send({
        name: p_name
    })
        .expect(400);
    yield (0, supertest_1.default)(app_1.app)
        .post(`/api/publisher`)
        .send({
        email
    })
        .expect(400);
    done();
}));
test('Should create publisher', (done) => __awaiter(void 0, void 0, void 0, function* () {
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
test('Should attempt to create publisher with email that already exists', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post(`/api/publisher`)
        .send({
        name: p_name,
        email
    })
        .expect(400);
    done();
}));
test('Should get publisher', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .get(`/api/publisher/${publisher_id}`)
        .expect(200)
        .then((res) => {
        expect(res.body.data.name).toBe(p_name);
        expect(res.body.data.email).toBe(email);
        done();
    });
}));
test('Should attempt to get publisher - doesnt exist', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app).get(`/api/publisher/${(0, nanoid_1.nanoid)(5)}`).expect(400);
    done();
}));
//# sourceMappingURL=createGetPublisher.test.js.map