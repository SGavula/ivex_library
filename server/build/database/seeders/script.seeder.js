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
exports.seedScripts = void 0;
const models_1 = require("../models");
const sk_1 = require("faker/locale/sk");
const path_1 = __importDefault(require("path"));
const seedScripts = () => __awaiter(void 0, void 0, void 0, function* () {
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
    const keywords = [
        'marketing',
        'ľudské zdroje',
        'financie',
        'projektový manažment',
        'manažérske rozhodovanie',
        'podnikanie',
        'operačný manažment',
        'logistika',
        'strategický manažment',
        'obchod',
        'medicine',
        'právo'
    ];
    const images = ['/sample.png', '/sample2.png', '/sample3.png'];
    console.log('removing existing scripts');
    models_1.script_model.collection.drop();
    let pickedCounter = 0;
    console.log('seeding scripts');
    const publishers = yield models_1.publisher_model.find().select('_id');
    for (let i = 0; i <= 750; i++) {
        let picked = false;
        let published = true;
        if (pickedCounter < 5) {
            picked = true;
            pickedCounter++;
        }
        else {
            picked = false;
        }
        let finalArr = [];
        if (i < 30 && i > 25) {
            published = false;
        }
        for (let o = 0; o < sk_1.random.number({ min: 1, max: 4 }); o++) {
            let authorName = sk_1.name.findName();
            finalArr.push(authorName);
        }
        let publisher = yield models_1.publisher_model.findOne({
            _id: sk_1.random.arrayElement(publishers)
        });
        let script = new models_1.script_model({
            name: sk_1.commerce.productName(),
            author: finalArr,
            path: path_1.default.resolve('../files/sample.pdf'),
            category: sk_1.random.arrayElement(categories),
            year: sk_1.random.number({ min: 2000, max: 2021 }),
            info: sk_1.lorem.paragraph(),
            isbn: sk_1.random.uuid(),
            keywords: sk_1.random.arrayElements(keywords),
            image: sk_1.random.arrayElement(images),
            picked: picked,
            publisher: publisher._id,
            city: sk_1.address.city(),
            publishing: sk_1.company.companyName(),
            published: published,
            lang: 'SK'
        });
        if (i <= 10) {
            script.free = true;
        }
        else {
            script.free = false;
            script.pricing = sk_1.random.number({ min: 10, max: 25 });
        }
        publisher.scripts.push(script._id);
        try {
            yield publisher.save();
            yield script.save();
        }
        catch (error) {
            console.log(error);
        }
    }
});
exports.seedScripts = seedScripts;
//# sourceMappingURL=script.seeder.js.map