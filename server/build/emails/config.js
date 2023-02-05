"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const path_1 = __importDefault(require("path"));
require('dotenv').config({
    path: path_1.default.resolve(__dirname, '../../../.env'),
});
exports.transporter = nodemailer_1.default.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    auth: {
        user: 'apikey',
        pass: process.env.EMAIL_PASS,
    },
});
exports.transporter.use('compile', (0, nodemailer_express_handlebars_1.default)({
    viewEngine: {
        engine: 'express-handlebars',
        defaultLayout: './src/emails/templates/main',
    },
    viewPath: './src/emails/templates',
}));
//# sourceMappingURL=config.js.map