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
exports.seedUsers = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sk_1 = require("faker/locale/sk");
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('removing existing users');
    models_1.user_model.collection.drop();
    console.log('seeding users');
    for (let i = 0; i <= 15; i++) {
        let date = new Date();
        date.setDate(date.getDate() + sk_1.random.number(30));
        let salt = 10;
        let randomNum = sk_1.random.number({ min: 1, max: 2 });
        let password = yield bcrypt_1.default.hash('password', salt);
        let user = new models_1.user_model({
            email: sk_1.internet.email(),
            password: password,
            first_name: sk_1.name.firstName(),
            last_name: sk_1.name.lastName(),
            address: sk_1.address.streetAddress(),
            credit_card: '4111111145551142',
            subscription_ending: date,
            verified: true
        });
        if (randomNum == 1) {
            (user.university = sk_1.vehicle.vehicle()),
                (user.faculty = sk_1.vehicle.manufacturer()),
                (user.subject = sk_1.vehicle.model()),
                (user.year = sk_1.random.number({ min: 1, max: 4 })),
                (user.gender = sk_1.name.gender());
        }
        try {
            user.save();
        }
        catch (error) {
            console.log(error);
        }
    }
});
exports.seedUsers = seedUsers;
//# sourceMappingURL=users.seeder.js.map