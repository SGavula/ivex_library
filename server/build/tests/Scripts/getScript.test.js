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
let script_id;
beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post('/api/script')
        .send({
        name: script_name,
        category: category
    })
        .then((response) => {
        script_id = response.body.data._id;
        done();
    });
}));
test('Should get script', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app).get(`/api/script/${script_id}`).expect(200);
    done();
}));
test('Should attempt to get script - wrong id', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app).get(`/api/script/${() => (0, nanoid_1.nanoid)(5)}`).expect(404);
    done();
}));
test('Should attempt to get script - no id', (done) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app).get(`/api/script/`).expect(404);
    done();
}));
//# sourceMappingURL=getScript.test.js.map