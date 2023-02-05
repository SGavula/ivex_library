"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptRouter = void 0;
const Script_controller_1 = require("../controllers/Script.controller");
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers/");
const validators_1 = require("../validators/");
const middlewares_1 = require("../middlewares");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
exports.ScriptRouter = express_1.default.Router();
const prefix = `/script`;
const filesPath = './../files';
const imagesPath = process.env.NODE_ENV == 'PROD'
    ? './../client/build/img'
    : './../client/public/img';
const storage = multer_1.default.diskStorage({
    destination: function (_req, file, cb) {
        if (file.mimetype == 'application/pdf') {
            cb(null, path_1.default.resolve(filesPath));
        }
        else {
            cb(null, path_1.default.resolve(imagesPath));
        }
    },
    filename: function (_req, file, cb) {
        cb(null, `${file.originalname.split('.')[0]}-${Date.now()}.${file.originalname.split('.')[file.originalname.split('.').length - 1]}`);
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const validExtensions = [
            'application/pdf',
            'image/png',
            'image/jpg',
            'image/jpeg'
        ];
        let extension = file.mimetype;
        if (validExtensions.indexOf(extension) == -1) {
            req.fileValidationError = 'not valid file type';
            return cb(null, false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 50 * 1024 * 1024 * 1024
    }
}).array('files', 2);
exports.ScriptRouter.get(`${prefix}/categories`, Script_controller_1.getCategories);
exports.ScriptRouter.get(`${prefix}/pdf/:script_id`, (0, middlewares_1.AuthMiddleware)(['ADMIN', 'USER']), Script_controller_1.getPdfScript);
exports.ScriptRouter.get(`${prefix}/picked`, controllers_1.getPickedScripts);
exports.ScriptRouter.post(`${prefix}`, (0, middlewares_1.AuthMiddleware)(['ADMIN', 'PUBLISHER']), upload, validators_1.createScriptValidator, controllers_1.createScript);
exports.ScriptRouter.post(`${prefix}/scraper`, (0, middlewares_1.AuthMiddleware)(['ADMIN']), upload, Script_controller_1.uploadScraped);
exports.ScriptRouter.put(`${prefix}/:script_id`, (0, middlewares_1.AuthMiddleware)(['ADMIN']), upload, validators_1.editScriptValidator, Script_controller_1.editScript);
exports.ScriptRouter.post(`${prefix}/search`, Script_controller_1.searchController);
exports.ScriptRouter.post(`${prefix}/byIds/`, validators_1.getScriptsByIdsValidator, controllers_1.getScriptsByIds);
exports.ScriptRouter.get(`${prefix}/:script_id`, validators_1.getScriptValidator, controllers_1.getScript);
exports.ScriptRouter.get(`${prefix}/:tag/:limit`, validators_1.getScriptsByCategoryValidator, controllers_1.getScriptsByCategory);
exports.ScriptRouter.get('/library', Script_controller_1.getLibrary);
exports.ScriptRouter.get('/library/admin', (0, middlewares_1.AuthMiddleware)(['ADMIN']), Script_controller_1.getAdminLibrary);
exports.ScriptRouter.delete(`${prefix}/:script_id`, (0, middlewares_1.AuthMiddleware)(['ADMIN']), Script_controller_1.deleteScriptById);
//# sourceMappingURL=scripts.router.js.map