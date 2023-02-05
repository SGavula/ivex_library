import express from 'express';
import path from 'path';
import {
	createUser,
	deleteUser,
	editUser,
	editUserPassword,
	editUserScriptData,
	getUser,
	isFavorite,
	passwordByTokenReset,
	sendContactEmail,
	unfavoriteScript,
	unsubscribeFromEmails,
	userForgottenPassword,
	userVerification
} from '../controllers';
import {
	createUserValidator,
	deleteUserValidator,
	editUserPasswordValidator,
	editUserScriptDataValidator,
	editUserValidator,
	getFavoriteScript,
	getUserValidator,
	passwordByTokenResetValidator,
	sendContactEmailValidator,
	unfavoriteScriptValidator,
	userForgottenPasswordValidator,
	userVerificationValidator
} from '../validators';
import { AuthMiddleware, UserProfileMiddleware } from '../middlewares';
require('dotenv').config({
	path: path.resolve(__dirname, '../../.env')
});
let prefix = '/user';
export const UserRouter = express.Router();

// Register
UserRouter.post(`${prefix}`, createUserValidator, createUser);
UserRouter.post(
	`${prefix}/verification/:token`,
	userVerificationValidator,
	userVerification
);
UserRouter.post(
	`${prefix}/forgotten-password/`,
	userForgottenPasswordValidator,
	userForgottenPassword
);

UserRouter.post(
	`${prefix}/password-reset-by-token`,
	passwordByTokenResetValidator,
	passwordByTokenReset
);
// Get favorites
UserRouter.get(
	`${prefix}/:user_id/script/:script_id/favorites`,
	AuthMiddleware([ 'USER', 'ADMIN' ]),
	UserProfileMiddleware,
	getFavoriteScript,
	isFavorite
);
// Get user information
UserRouter.get(
	`${prefix}/:user_id`,
	AuthMiddleware([ 'USER', 'ADMIN' ]),
	// UserProfileMiddleware,
	getUserValidator,
	getUser
);

// Edit user information
// TODO: Test this
UserRouter.put(
	`${prefix}/:user_id`,
	AuthMiddleware([ 'USER', 'ADMIN' ]),
	UserProfileMiddleware,
	editUserValidator,
	editUser
);
UserRouter.put(
	`${prefix}/:user_id/password`,
	AuthMiddleware([ 'USER', 'ADMIN' ]),
	UserProfileMiddleware,
	editUserPasswordValidator,
	editUserPassword
);

UserRouter.put(
	`${prefix}/:user_id/scriptdata`,
	AuthMiddleware([ 'USER', 'ADMIN' ]),
	UserProfileMiddleware,
	editUserScriptDataValidator,
	editUserScriptData
);

UserRouter.delete(
	`${prefix}/:user_id`,
	AuthMiddleware([ 'ADMIN' ]),
	UserProfileMiddleware,
	deleteUserValidator,
	deleteUser
);

UserRouter.delete(
	`${prefix}/:user_id/script/:script_id/favorites`,
	AuthMiddleware([ 'USER', 'ADMIN' ]),
	UserProfileMiddleware,
	unfavoriteScriptValidator,
	unfavoriteScript
);

UserRouter.post(`/contact`, sendContactEmailValidator, sendContactEmail);
UserRouter.put(`${prefix}/unsubcribe-emails/:token`, unsubscribeFromEmails);
