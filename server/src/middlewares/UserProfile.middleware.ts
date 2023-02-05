import { NextFunction, Request, Response } from 'express';
import { response } from '../helpers';

export const UserProfileMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.body.jwt.user_type == 'ADMIN') return next();
	else if (req.body.jwt.user_id == req.params.user_id) return next();
	else return res.status(401).jsonp(response(401, 'User id does not match'));
};

export const PublisherProfileMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.body.jwt.user_type == 'ADMIN') return next();
	else if (req.body.jwt.user_id == req.params.publisher_id) return next();
	else return res.status(401).jsonp(response(401, 'Unauthorized'));
};
