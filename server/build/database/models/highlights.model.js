"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlightsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const Schema = mongoose_1.default.Schema;
const bigHighlightSchema = new Schema({
    page: Number,
    highlights: String
}, { _id: false });
const fullHighlightsSchema = new Schema({
    _id: {
        type: String,
        default: () => (0, nanoid_1.nanoid)(5)
    },
    last_page: {
        type: Number
    },
    dark_mode: {
        type: Boolean
    },
    info: { type: Boolean },
    script_id: String,
    user_id: String,
    highlights: [bigHighlightSchema]
});
exports.highlightsModel = mongoose_1.default.model('highlights', fullHighlightsSchema);
//# sourceMappingURL=highlights.model.js.map