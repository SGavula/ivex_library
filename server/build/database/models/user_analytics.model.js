"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_analytics_model = exports.user_analytics = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.user_analytics = new Schema({
    user_id: { type: String, required: true },
    subscription_type: { type: Number, required: false },
    scripts: [
        {
            script_id: { type: String, required: true },
            max_pages: { type: Number, required: true, default: 0 },
            full_pages: { type: Number, required: true, default: 0 },
            pages_read: [Number],
            percentile: { type: Number, required: false, default: 0 },
            data: [
                {
                    year: { type: Number, required: true },
                    months: [
                        {
                            num: { type: Number, required: true },
                            pages: [Number],
                            month_pages: Number,
                            vpc: { type: Number, required: true }
                        }
                    ]
                }
            ]
        }
    ]
});
exports.user_analytics_model = mongoose_1.default.model('user_analytics', exports.user_analytics);
//# sourceMappingURL=user_analytics.model.js.map