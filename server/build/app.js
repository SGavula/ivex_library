"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const port = parseInt(process.env.PORT) || 8000;
const connection_1 = require("./database/connection");
const path_1 = __importDefault(require("path"));
const jobs_1 = require("./jobs");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: '*'
}));
exports.app.use((req, res, next) => {
    if (req.originalUrl === '/api/webhook') {
        console.log('skipping express.json');
        next();
    }
    else {
        express_1.default.json()(req, res, next);
    }
});
(0, connection_1.DBConnect)();
require('./routes/router');
exports.app.use(express_1.default.static(path_1.default.join(__dirname, '../public/images')));
exports.app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
(0, jobs_1.pickedScriptEveryDay)();
exports.app.get('/', (_req, res) => {
    res
        .status(200)
        .sendFile(path_1.default.join(__dirname, '../../client/build/index.html'));
});
if (process.env.NODE_ENV !== 'test') {
    exports.app.listen(port, () => {
        console.log(`Express server listening on port ${port}!`);
    });
}
//# sourceMappingURL=app.js.map