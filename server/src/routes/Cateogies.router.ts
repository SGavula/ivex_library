import express from 'express';
// import { AuthMiddleware } from '../middlewares';
import { editCategory, getCategoriesC, deleteCategory } from '../controllers/';
import {} from '../validators/';

export const CategoryRouter = express.Router();
const prefix: string = `/categories`;

CategoryRouter.get(
	`${prefix}`,
	// AuthMiddleware(['ADMIN'])
	getCategoriesC
);

CategoryRouter.put(
	`${prefix}/:cat_id`,
	// AuthMiddleware(['ADMIN']),
	editCategory
);

CategoryRouter.delete(
	`${prefix}/:cat_id`,
	// AuthMiddleware(['ADMIN']),
	deleteCategory
);
