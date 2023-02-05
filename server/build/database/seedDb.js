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
const connection_1 = require("./connection");
const seeders_1 = require("./seeders");
const category_seeder_1 = require("./seeders/category.seeder");
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.DBConnect)();
    yield (0, seeders_1.seedUsers)();
    yield (0, seeders_1.seedPublishers)();
    yield (0, seeders_1.seedAdmins)();
    yield (0, category_seeder_1.seedCategories)();
    yield (0, seeders_1.seedScripts)();
    yield (0, seeders_1.seedUserAnalytics)();
    yield (0, seeders_1.seedPublisherAnalytics)();
    process.exit(0);
});
seed();
//# sourceMappingURL=seedDb.js.map