"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_scripts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const Schema = mongoose_1.default.Schema;
exports.user_scripts = new Schema({
    _id: {
        type: String,
        default: () => (0, nanoid_1.nanoid)(5)
    },
    script: {
        type: String,
        required: true
    },
    highlights: []
});
//# sourceMappingURL=user_script.model.js.map