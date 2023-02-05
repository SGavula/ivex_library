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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCategories = void 0;
const models_1 = require("../models");
let categories = [
    'math',
    'psychology',
    'finance',
    'computer science',
    'medicie',
    'chemistry',
    'managment',
    'fyizio',
    'asdasdasd',
    'asdasd',
    'fasfasfas',
    'adaqw',
    'asdasd92p0',
    'asdasd012dmasp',
    'neviem',
    'stale_neviem',
    'sak daco',
    'messas',
    'oasdkpoqwmmnmcinqi',
    'jhtjijizxi',
    'asdmpi2j-dkas[l',
    'lololol',
    'asdasdasd',
    'papapapapapa',
    'asalalala',
    'alalalalala',
    'asdasdasdasdasdasd',
    'asd',
    'lala',
    'qwerty',
    'magnifico',
    'trululi',
    'carabka',
    'harry potter je super',
    'abraka dabra',
    'avada kedavra',
    'expecto patronum',
    'expeliarmus',
    'sectusmepra',
    'homeum revelio',
    'accio',
    'protego maxima',
    'mugulum repelio',
    'bombarda',
    'alohomora'
];
function seedCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('seeding categories');
        models_1.category_model.collection.drop();
        for (let category in categories) {
            let data = new models_1.category_model({
                category_name: categories[category]
            });
            yield data.save();
        }
    });
}
exports.seedCategories = seedCategories;
//# sourceMappingURL=category.seeder.js.map