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
exports.seedPublishers = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sk_1 = require("faker/locale/sk");
const seedPublishers = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('removing existing publishers');
    models_1.publisher_model.collection.drop();
    console.log('seeding publishers');
    for (let i = 0; i <= 10; i++) {
        let salt = 10;
        let password = yield bcrypt_1.default.hash('password', salt);
        let user = new models_1.publisher_model({
            email: sk_1.internet.email(),
            password: password,
            name: sk_1.name.findName()
        });
        try {
            user.save();
        }
        catch (error) {
            console.log(error);
        }
    }
});
exports.seedPublishers = seedPublishers;
//# sourceMappingURL=publisher.seeder.js.map