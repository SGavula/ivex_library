"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers/");
exports.CategoryRouter = express_1.default.Router();
const prefix = `/categories`;
exports.CategoryRouter.get(`${prefix}`, controllers_1.getCategoriesC);
exports.CategoryRouter.put(`${prefix}/:cat_id`, controllers_1.editCategory);
exports.CategoryRouter.delete(`${prefix}/:cat_id`, controllers_1.deleteCategory);
//# sourceMappingURL=Cateogies.router.js.map