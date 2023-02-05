"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.script_model = exports.scriptSchema = void 0;
const nanoid_1 = require("nanoid");
const mongoose_1 = __importDefault(require("mongoose"));
exports.scriptSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        default: () => (0, nanoid_1.nanoid)(5)
    },
    name: { type: String, required: true, index: true },
    author: { type: [String], index: true },
    category: String,
    picked: { type: Boolean, default: false },
    year: { type: Number, },
    info: { type: String, index: true },
    keywords: { type: [String], index: true },
    isbn: String,
    path: { type: String },
    image: { type: String },
    publisher: { type: String },
    city: { type: String },
    publishing: { type: String },
    published: {
        type: Boolean,
        default: false
    },
    pricing: { type: Number },
    free: { type: Boolean },
    lang: { type: String },
    licence: String,
    licence_link: String,
    publishing_link: String
});
exports.scriptSchema.index({
    name: 'text',
    author: 'text',
    info: 'text',
    keywords: 'text',
    category: 'text',
    year: 'text',
    publishing: 'text',
    city: 'text',
    isbn: 'text'
}, {
    weights: {
        name: 1,
        author: 1,
        info: 1,
        keywords: 1,
        category: 1,
        year: 1,
        publishing: 1,
        city: 1,
        isbn: 1
    }
});
exports.script_model = mongoose_1.default.model('scripts', exports.scriptSchema);
//# sourceMappingURL=script.model.js.map