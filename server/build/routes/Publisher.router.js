"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublisherRouter = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
const middlewares_1 = require("../middlewares");
const Publisher_controller_1 = require("../controllers/Publisher.controller");
require('dotenv').config({
    path: path_1.default.resolve(__dirname, '../../.env')
});
let prefix = '/publisher';
exports.PublisherRouter = express_1.default.Router();
exports.PublisherRouter.post(`${prefix}`, validators_1.createPublisherValidator, controllers_1.createPublisher);
exports.PublisherRouter.post(`${prefix}/:publisher_id/script-change`, (0, middlewares_1.AuthMiddleware)(['PUBLISHER', 'ADMIN']), validators_1.requestScriptChangeValidator, Publisher_controller_1.requestScriptChange);
exports.PublisherRouter.put(`${prefix}/:publisher_id`, (0, middlewares_1.AuthMiddleware)(['ADMIN', 'PUBLISHER']), middlewares_1.PublisherProfileMiddleware, validators_1.editPublisherValidator, controllers_1.editPublisher);
exports.PublisherRouter.put(`${prefix}/:publisher_id`, (0, middlewares_1.AuthMiddleware)(['ADMIN', 'PUBLISHER']), middlewares_1.PublisherProfileMiddleware, validators_1.editPublisherPasswordValidator, controllers_1.editPublisher);
exports.PublisherRouter.get(`${prefix}/`, (0, middlewares_1.AuthMiddleware)(['ADMIN', 'PUBLISHER']), controllers_1.getAllPublishers);
exports.PublisherRouter.get(`${prefix}/:publisher_id`, (0, middlewares_1.AuthMiddleware)(['ADMIN', 'PUBLISHER']), middlewares_1.PublisherProfileMiddleware, validators_1.publisherIdValidator, controllers_1.getPublisher);
exports.PublisherRouter.delete(`${prefix}/:publisher_id`, (0, middlewares_1.AuthMiddleware)(['ADMIN']), validators_1.publisherIdValidator, controllers_1.deletePublisher);
//# sourceMappingURL=Publisher.router.js.map