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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteScriptById = exports.getPdfScript = exports.editScript = exports.getCategories = exports.getAdminLibrary = exports.getLibrary = exports.getScriptsByIds = exports.searchController = exports.getScriptsByCategory = exports.getPickedScripts = exports.getScript = exports.uploadScraped = exports.createScript = void 0;
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const models_1 = require("../database/models");
const fs_1 = __importDefault(require("fs"));
const emails_1 = require("../emails");
const path_1 = __importDefault(require("path"));
const createScript = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    if (req.fileValidationError != undefined)
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, req.fileValidationError));
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let script;
    try {
        let category = yield models_1.category_model.findOne({
            category_name: req.body.category.toLowerCase()
        });
        if (!category) {
            category = new models_1.category_model({
                category_name: req.body.category.toLowerCase()
            });
            yield category.save();
        }
        let publisher = yield models_1.publisher_model.findOne({
            _id: req.body.publisher
        });
        if (!publisher)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No publisher with that id', {}));
        const publisher_analytics = yield models_1.publisher_analytics_model.findOne({
            publisher_id: publisher._id
        });
        if (!publisher_analytics)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No analytics for that publisher with that id', {}));
        const fileIndexer = req.files.findIndex((file) => file.mimetype == 'application/pdf');
        const imageIndexer = req.files.findIndex((file) => file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/jpg');
        console.log(req.body);
        script = new models_1.script_model({
            name: req.body.name,
            author: JSON.parse(req.body.author),
            isbn: req.body.isbn,
            category: req.body.category,
            tags: req.body.tags,
            year: req.body.year,
            info: req.body.info,
            publisher: req.body.publisher,
            city: req.body.city,
            publishing: req.body.publishing,
            image: `/${req.files[imageIndexer].filename}`,
            path: req.files[fileIndexer].path,
            published: req.body.published,
            free: req.body.free,
            lang: req.body.lang,
            licence: req.body.licence,
            licence_link: req.body.licence_link,
            publishing_link: req.body.publishing_link,
            keywords: JSON.parse(req.body.keywords)
        });
        if (req.body.free == false) {
            script.pricing = parseInt(req.body.pricing);
        }
        publisher.scripts.push(script.id);
        publisher.save();
        script.save();
        const newScriptAnalyticsEntry = {
            script_id: script._id,
            data: [
                {
                    year: new Date().getFullYear(),
                    months: []
                }
            ]
        };
        for (let i = 0; i <= 11; i++) {
            const newMonth = {
                num: i,
                opens: 0
            };
            newScriptAnalyticsEntry.data[0].months.push(newMonth);
        }
        publisher_analytics.scripts.push(newScriptAnalyticsEntry);
        yield publisher_analytics.save();
        if (req.body.publisher_request == true) {
            const admins = yield models_1.admin_model.find().select('email -_id');
            const admin_emails = admins.map((admin) => admin.email);
            const publisher = yield models_1.publisher_model.findOne({ _id: req.body.publisher });
            const message = {
                to: admin_emails,
                from: 'noreply@ivexlibrary.sk',
                subject: 'Nová požiadavka na vytvorenie knihy',
                template: 'layouts/script',
                context: {
                    publisher_name: publisher.name,
                    script_name: script.name,
                    admin_url: process.env.NODE_ENV == 'PROD'
                        ? `https://ivexlibrary.sk/script/${script._id}`
                        : `http://localhost:3000/script/${script._id}`
                }
            };
            emails_1.transporter.sendMail(message);
        }
        (0, helpers_1.sendEmailToRelevantUsersByCategory)(req.body.category, script._id);
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Script created', script));
});
exports.createScript = createScript;
const uploadScraped = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let script;
    try {
        let category = yield models_1.category_model.findOne({
            category_name: req.body.category.toLowerCase()
        });
        if (!category) {
            category = new models_1.category_model({
                category_name: req.body.category.toLowerCase()
            });
            yield category.save();
        }
        let publisher = yield models_1.publisher_model.findOne({
            _id: req.body.publisher
        });
        if (!publisher)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No publisher with that id', {}));
        const publisher_analytics = yield models_1.publisher_analytics_model.findOne({
            publisher_id: publisher._id
        });
        if (!publisher_analytics)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No analytics for that publisher with that id', {}));
        const fileIndexer = req.files.findIndex((file) => file.mimetype == 'application/pdf');
        const imageIndexer = req.files.findIndex((file) => file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/jpg');
        script = new models_1.script_model({
            name: req.body.name,
            author: JSON.parse(req.body.author),
            isbn: req.body.isbn || '',
            category: req.body.category,
            tags: req.body.tags || '',
            year: req.body.year || '',
            info: req.body.info || '',
            publisher: req.body.publisher,
            city: req.body.city || '',
            publishing: req.body.publishing || '',
            image: `/${req.files[imageIndexer].filename}`,
            path: req.files[fileIndexer].path,
            published: req.body.published || true,
            free: req.body.free,
            lang: req.body.lang || '',
            licence: req.body.licence || '',
            licence_link: req.body.licence_link || '',
            publishing_link: req.body.publishing_link || '',
            keywords: JSON.parse(req.body.keywords) || []
        });
        if (req.body.free == false) {
            script.pricing = parseInt(req.body.pricing);
        }
        publisher.scripts.push(script.id);
        publisher.save();
        script.save();
        const newScriptAnalyticsEntry = {
            script_id: script._id,
            data: [
                {
                    year: new Date().getFullYear(),
                    months: []
                }
            ]
        };
        for (let i = 0; i <= 11; i++) {
            const newMonth = {
                num: i,
                opens: 0
            };
            newScriptAnalyticsEntry.data[0].months.push(newMonth);
        }
        publisher_analytics.scripts.push(newScriptAnalyticsEntry);
        yield publisher_analytics.save();
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Script created', script));
});
exports.uploadScraped = uploadScraped;
const getScript = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let script;
    try {
        script = yield models_1.script_model.findOne({ _id: req.params.script_id });
        if (!script)
            return res.status(404).jsonp((0, helpers_1.response)(404, 'Script not found', []));
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Script getted', script));
});
exports.getScript = getScript;
const getPickedScripts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let scripts;
    try {
        scripts = yield models_1.script_model
            .find({ picked: true })
            .select('picked name author year image');
        if (!scripts)
            return res
                .status(404)
                .jsonp((0, helpers_1.response)(404, 'Scripts not found', []));
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Script getted', scripts));
});
exports.getPickedScripts = getPickedScripts;
const getScriptsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let scripts;
    try {
        scripts = yield models_1.script_model
            .find({ category: req.params.tag })
            .select('picked name author year image free')
            .limit(parseInt(req.params.limit));
        if (!scripts)
            return res
                .status(404)
                .jsonp((0, helpers_1.response)(404, 'Scripts not found', []));
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Script getted', scripts));
});
exports.getScriptsByCategory = getScriptsByCategory;
const searchController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let scripts;
    try {
        scripts = yield models_1.script_model
            .find({
            published: true,
            $text: {
                $search: req.body.searchphrase,
                $diacriticSensitive: false
            }
        }, { score: { $meta: 'textScore' } })
            .select('picked name author year image category')
            .sort({ score: { $meta: 'textScore' } });
        if (!scripts)
            return res
                .status(404)
                .jsonp((0, helpers_1.response)(404, 'Scripts not found', []));
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Script getted', scripts));
});
exports.searchController = searchController;
const getScriptsByIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let scripts;
    try {
        scripts = yield models_1.script_model
            .find({ _id: { $in: req.body.scripts }, published: true })
            .select('picked name author year image');
        if (!scripts)
            return res
                .status(404)
                .jsonp((0, helpers_1.response)(404, 'Scripts not found', []));
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Script getted', scripts));
});
exports.getScriptsByIds = getScriptsByIds;
const getLibrary = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let scripts = [];
    try {
        scripts = yield models_1.script_model
            .find({ published: true })
            .select('picked name author year image category free');
        if (!scripts)
            return res
                .status(404)
                .jsonp((0, helpers_1.response)(404, 'Scripts not found', []));
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Script getted', scripts));
});
exports.getLibrary = getLibrary;
const getAdminLibrary = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let scripts = [];
    let result = [];
    try {
        scripts = yield models_1.script_model
            .find()
            .select('picked name author year image category published');
        let publisher_analytics = yield models_1.publisher_analytics_model.find();
        publisher_analytics.forEach((analytics) => {
            analytics.scripts.forEach((script) => {
                script.data.forEach((data) => {
                    if (data.year == new Date().getFullYear()) {
                        let opens = data.months[new Date().getMonth()].opens;
                        scripts.forEach((scriptEntry) => {
                            if (scriptEntry._id == script.script_id) {
                                let entry = {
                                    name: scriptEntry.name,
                                    author: scriptEntry.author,
                                    picked: scriptEntry.picked,
                                    year: scriptEntry.year,
                                    image: scriptEntry.image,
                                    category: scriptEntry.category,
                                    published: scriptEntry.published,
                                    _id: scriptEntry._id,
                                    opens
                                };
                                result.push(entry);
                            }
                        });
                    }
                });
            });
        });
        if (!scripts)
            return res
                .status(404)
                .jsonp((0, helpers_1.response)(404, 'Scripts not found', []));
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Script getted', result));
});
exports.getAdminLibrary = getAdminLibrary;
const getCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let categories;
    try {
        categories = yield models_1.category_model.find().select('-_id');
        if (!categories)
            return res
                .status(404)
                .jsonp((0, helpers_1.response)(404, 'categories not found', []));
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Script getted', categories));
});
exports.getCategories = getCategories;
const editScript = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let script;
    try {
        script = yield models_1.script_model.findOne({ _id: req.params.script_id });
        if (!script)
            return res.status(404).jsonp((0, helpers_1.response)(404, 'Script not found', {}));
        if (req.body.category) {
            let category = yield models_1.category_model.findOne({
                category_name: req.body.category
            });
            if (!category) {
                category = new models_1.category_model({
                    category_name: req.body.category
                });
                yield category.save();
            }
            script.category = req.body.category;
        }
        let publisher = yield models_1.publisher_model.findOne({
            _id: req.body.publisher
        });
        if (!publisher) {
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No publisher with that id', {}));
        }
        publisher.scripts.push(script._id);
        publisher.save();
        if (req.files.length !== 0) {
            script.image = `/${req.files[0].filename}`;
        }
        if (req.body.published == 'true' &&
            req.body.published !== script.published) {
            console.log('sent email');
            const message = {
                from: 'noreply@ivexlibrary.sk',
                to: 'misogally@gmail.com',
                subject: 'Vytvorenie prístupu do IVEX-Library',
                template: 'layouts/script_approved',
                context: {
                    image: script.image,
                    name: publisher.name,
                    link: `${script.script_id}`
                }
            };
            emails_1.transporter.sendMail(message);
        }
        const author = req.body.author
            ? JSON.parse(req.body.author)
            : script.author;
        const keywords = req.body.keywords
            ? JSON.parse(req.body.keywords)
            : script.keywords;
        script.author = author;
        script.keywords = keywords;
        script.name = req.body.name || script.name;
        script.year = req.body.year || script.year;
        script.info = req.body.info || script.info;
        script.isbn = req.body.isbn || script.isbn;
        script.city = req.body.city || script.city;
        script.publishing = req.body.publishing || script.publishing;
        script.publisher = req.body.publisher || script.publisher;
        script.published = req.body.published || script.published;
        script.free = req.body.free || script.free;
        script.lang = req.body.lang || script.lang;
        script.publishing_link =
            req.body.publishing_link || script.publishing_link;
        script.licence = req.body.licence || script.licence;
        script.licence_link = req.body.licence_link || script.licence_link;
        script.pricing = parseInt(req.body.pricing) || script.pricing;
        if (req.body.free == true) {
            script.pricing = '';
        }
        else {
            script.pricing = parseInt(req.body.pricing) || script.pricing;
        }
        script.save();
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Script getted', script));
});
exports.editScript = editScript;
const getPdfScript = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).jsonp((0, helpers_1.response)(400, errors.array()));
    let script;
    try {
        script = yield models_1.script_model.findOne({ _id: req.params.script_id });
        if (!script)
            return res.status(404).jsonp((0, helpers_1.response)(404, 'Script not found', {}));
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return fs_1.default.createReadStream(script.path).pipe(res);
});
exports.getPdfScript = getPdfScript;
const deleteScriptById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const script = yield models_1.script_model.findOneAndDelete({
            _id: req.params.script_id
        });
        if (!script)
            return res
                .status(400)
                .jsonp((0, helpers_1.response)(400, 'No script with that id', {}));
        fs_1.default.unlinkSync(path_1.default.join(script.path));
    }
    catch (error) {
        return res
            .status(400)
            .jsonp((0, helpers_1.response)(400, 'TryCatch Error', { error }));
    }
    return res.status(200).jsonp((0, helpers_1.response)(200, 'Script removed', {}));
});
exports.deleteScriptById = deleteScriptById;
//# sourceMappingURL=Script.controller.js.map