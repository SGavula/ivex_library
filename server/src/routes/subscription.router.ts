import {
	cancelSubscription,
	changeSubscription,
	renewSubscription
} from '../controllers/Subscription.controller';
import express from 'express';
import { Webhook } from '../controllers/';
import { AuthMiddleware } from '../middlewares';

export const SubRouter = express.Router();
const prefix: string = `/webhook`;

SubRouter.post(`${prefix}`, express.raw({ type: 'application/json' }), Webhook);
SubRouter.delete(
	`/subscription/delete/:user_id`,
	AuthMiddleware([ 'ADMIN', 'USER' ]),
	cancelSubscription
);
SubRouter.put(
	`/subscription/renew/:user_id`,
	AuthMiddleware([ 'ADMIN', 'USER' ]),
	renewSubscription
);

SubRouter.put(
	'/subscription/change/:user_id',
	AuthMiddleware([ 'ADMIN', 'USER' ]),
	changeSubscription
);
