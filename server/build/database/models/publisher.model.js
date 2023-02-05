"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publisher_model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const Schema = mongoose_1.default.Schema;
const publisher_schema = new Schema({
    _id: {
        type: String,
        default: () => (0, nanoid_1.nanoid)(7)
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    scripts: {
        type: [String],
        default: []
    },
    refresh_token: {
        type: String
    },
    verification_token: {
        token: String,
        expiration: Date
    }
});
exports.publisher_model = mongoose_1.default.model('publishers', publisher_schema);
//# sourceMappingURL=publisher.model.js.map