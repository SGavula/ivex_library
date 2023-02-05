import express from 'express';
import path from 'path';
import {
	adminCreateUser,
	createAdmin,
	editAdmin,
	getAdmin,
	getAllUsers
} from '../controllers';
import {
	createAdminValidator,
	editAdminValidator,
	getAdminValidator
} from '../validators';
import { AuthMiddleware } from '../middlewares';
require('dotenv').config({
	path: path.resolve(__dirname, '../../.env')
});
let prefix = '/admin';
export const AdminRouter = express.Router();

AdminRouter.post(
	`${prefix}`,
	AuthMiddleware([ 'ADMIN' ]),
	createAdminValidator,
	createAdmin
);

AdminRouter.put(
	`${prefix}/:admin_id`,
	AuthMiddleware([ 'ADMIN' ]),
	// AdminProfileMiddleware,
	editAdminValidator,
	editAdmin
);
AdminRouter.get(`${prefix}/users`, AuthMiddleware([ 'ADMIN' ]), getAllUsers);

AdminRouter.get(
	`${prefix}/:admin_id`,
	AuthMiddleware([ 'ADMIN' ]),
	// AdminProfileMiddleware,
	getAdminValidator,
	getAdmin
);

AdminRouter.post(
	`${prefix}/user/`,
	AuthMiddleware([ 'ADMIN' ]),
	adminCreateUser
);
