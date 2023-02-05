"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publisher_analytics_model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const publisher_analytics = new Schema({
    publisher_id: { type: String, required: true },
    scripts: [
        {
            script_id: { type: String, required: true },
            data: [
                {
                    year: { type: Number, required: true },
                    months: [
                        {
                            num: { type: Number, required: true },
                            opens: { type: Number, required: true }
                        }
                    ]
                }
            ]
        }
    ]
});
exports.publisher_analytics_model = mongoose_1.default.model('publisher_analytics', publisher_analytics);
//# sourceMappingURL=publisher_analytics.model.js.map