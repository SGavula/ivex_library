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
exports.DBConnect = void 0;
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const syncDb_1 = require("./syncDb");
require('dotenv').config({
    path: path_1.default.resolve(__dirname, '../../../.env'),
});
let db_url = 'mongodb://localhost:27017/ivex';
if (process.env.NODE_ENV == 'PROD') {
    db_url =
        process.env.DB_URL ||
            'mongodb://localhost:27017/ivex';
}
if (process.env.NODE_ENV == 'test')
    db_url = 'mongodb://0.0.0.0:27017/ivex-testing';
console.log(process.env.NODE_ENV);
const DBConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    let db;
    if (process.env.NODE_ENV == 'PROD') {
        db = yield mongoose_1.default.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            ssl: true,
            sslValidate: false,
            sslCA: require('fs').readFileSync(path_1.default.join(__dirname, '../../../cert.pem')),
        });
    }
    else {
        db = yield mongoose_1.default.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            autoIndex: true,
        });
    }
    if (db) {
        console.log('Database connected');
        console.log('Syncing db');
        (0, syncDb_1.SyncDB)();
    }
    if (!db)
        throw new Error('Database connection failed!');
});
exports.DBConnect = DBConnect;
//# sourceMappingURL=connection.js.map