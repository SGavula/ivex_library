import {
	deleteScriptById,
	editScript,
	getAdminLibrary,
	getCategories,
	getLibrary,
	getPdfScript,
	searchController,
	uploadScraped
} from '../controllers/Script.controller';
import express from 'express';
import {
	createScript,
	getScript,
	getPickedScripts,
	getScriptsByCategory,
	getScriptsByIds
} from '../controllers/';
import {
	createScriptValidator,
	getScriptValidator,
	getScriptsByCategoryValidator,
	getScriptsByIdsValidator,
	editScriptValidator
} from '../validators/';
import { AuthMiddleware } from '../middlewares';
import multer from 'multer';
import path from 'path';

export const ScriptRouter = express.Router();
const prefix: string = `/script`;
const filesPath = './../files';
const imagesPath =
	process.env.NODE_ENV == 'PROD'
		? './../client/build/img'
		: './../client/public/img';

const storage = multer.diskStorage({
	destination: function(_req, file, cb) {
		if (file.mimetype == 'application/pdf') {
			cb(null, path.resolve(filesPath));
		} else {
			cb(null, path.resolve(imagesPath));
		}
	},
	filename: function(_req, file, cb) {
		cb(
			null,
			`${file.originalname.split(
				'.'
			)[0]}-${Date.now()}.${file.originalname.split('.')[
				file.originalname.split('.').length - 1
			]}`
		);
	}
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		const validExtensions = [
			'application/pdf',
			'image/png',
			'image/jpg',
			'image/jpeg'
		];
		let extension: string = file.mimetype;
		if (validExtensions.indexOf(extension) == -1) {
			(req as any).fileValidationError = 'not valid file type';
			return cb(null, false);
		}
		cb(null, true);
	},
	limits: {
		fileSize: 50 * 1024 * 1024 * 1024
	}
}).array('files', 2);

// get categories
ScriptRouter.get(`${prefix}/categories`, getCategories);

ScriptRouter.get(
	`${prefix}/pdf/:script_id`,
	AuthMiddleware([ 'ADMIN', 'USER' ]),
	// getPdfScriptValidator,
	getPdfScript
);

ScriptRouter.get(`${prefix}/picked`, getPickedScripts);
ScriptRouter.post(
	`${prefix}`,
	AuthMiddleware([ 'ADMIN', 'PUBLISHER' ]),
	upload,
	createScriptValidator,
	createScript
);

ScriptRouter.post(
	`${prefix}/scraper`,
	AuthMiddleware(['ADMIN']),
	upload,
	uploadScraped
)

ScriptRouter.put(
	`${prefix}/:script_id`,
	AuthMiddleware([ 'ADMIN' ]),
	upload,
	editScriptValidator,
	editScript
);

ScriptRouter.post(
	`${prefix}/search`,
	// searchValidator,
	searchController
);

ScriptRouter.post(
	`${prefix}/byIds/`,
	// AuthMiddleware([ 'ADMIN', 'USER' ]),
	getScriptsByIdsValidator,
	getScriptsByIds
);

ScriptRouter.get(
	`${prefix}/:script_id`,
	// AuthMiddleware([ 'ADMIN', 'USER' ]),
	getScriptValidator,
	getScript
);

ScriptRouter.get(
	`${prefix}/:tag/:limit`,
	// AuthMiddleware([ 'ADMIN', 'USER' ]),
	getScriptsByCategoryValidator,
	getScriptsByCategory
);

// ** Library
ScriptRouter.get('/library', getLibrary);
ScriptRouter.get(
	'/library/admin',
	AuthMiddleware([ 'ADMIN' ]),
	getAdminLibrary
);

ScriptRouter.delete(
	`${prefix}/:script_id`,
	AuthMiddleware([ 'ADMIN' ]),
	deleteScriptById
);
