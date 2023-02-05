import express from 'express';
import { AuthMiddleware } from '../middlewares';
import {
	createHighlight,
	getHighlight,
	getUserScriptConfig,
	saveUserScriptConfig
} from '../controllers/';
import {
	createHighlightValidator,
	gethighlightValidator,
	saveUserScriptPageValidator,
	getUserScriptPageValidator
} from '../validators/';

export const HighlightRouter = express.Router();
const prefix: string = `/highlight`;

HighlightRouter.post(
	`${prefix}/script/:script_id`,
	AuthMiddleware([ 'ADMIN', 'USER' ]),
	// User Middleware
	createHighlightValidator,
	createHighlight
);

HighlightRouter.get(
	`${prefix}/script/:script_id/user/:user_id`,
	AuthMiddleware([ 'USER', 'ADMIN' ]),
	// User Middleware
	gethighlightValidator,
	getHighlight
);

HighlightRouter.post(
	`${prefix}/script/:script_id/user/:user_id/config`,
	AuthMiddleware([ 'ADMIN', 'USER' ]),
	saveUserScriptPageValidator,
	saveUserScriptConfig
);

HighlightRouter.get(
	`${prefix}/script/:script_id/user/:user_id/config`,
	AuthMiddleware([ 'ADMIN', 'USER' ]),
	getUserScriptPageValidator,
	getUserScriptConfig
);
