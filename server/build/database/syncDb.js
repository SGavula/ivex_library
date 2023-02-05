"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncDB = void 0;
const models_1 = require("./models");
const SyncDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.user_model.createCollection();
    yield models_1.script_model.createCollection();
    yield models_1.publisher_model.createCollection();
    yield models_1.admin_model.createCollection();
    yield models_1.category_model.createCollection();
    yield models_1.highlightsModel.createCollection();
    yield models_1.publisher_analytics_model.createCollection();
    yield models_1.user_analytics_model.createCollection();
});
exports.SyncDB = SyncDB;
//# sourceMappingURL=syncDb.js.map