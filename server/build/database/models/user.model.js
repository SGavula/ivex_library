"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_model = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
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
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    credit_card: {
        type: String
    },
    paid: {
        type: Boolean,
        default: false,
        required: true
    },
    last_payment: {
        type: Date,
        default: new Date(),
        required: true
    },
    subscription_ending: {
        type: Date,
        required: true
    },
    payments: [
        {
            type: Date
        }
    ],
    favorite_scripts: [
        {
            type: String
        }
    ],
    last_scripts: [
        {
            type: String
        }
    ],
    university: {
        type: String
    },
    faculty: {
        type: String
    },
    subject: {
        type: String
    },
    year: {
        type: String
    },
    refresh_token: {
        type: String
    },
    subscription_type: Number,
    verified: {
        type: Boolean,
        default: false
    },
    verification_token: {
        token: String,
        expiration: {
            type: Date,
            default: () => {
                let date = new Date();
                date.setDate(date.getDate() + 1);
                return date;
            }
        }
    },
    got_email: {
        type: Boolean,
        default: false
    },
    email_subscription: {
        type: Boolean,
        default: true
    },
    email_subscription_token: {
        type: String,
        default: () => (0, nanoid_1.nanoid)(25)
    },
    stripeCustomerId: {
        type: String,
        required: false
    },
    stripe: {
        type: Object
    },
    user_state: String
});
exports.user_model = mongoose_1.default.model('users', userSchema);
//# sourceMappingURL=user.model.js.map