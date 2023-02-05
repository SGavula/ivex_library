import express from 'express';
import path from 'path';
import {
	createPublisher,
	deletePublisher,
	editPublisher,
	getAllPublishers,
	getPublisher
} from '../controllers';
import {
	createPublisherValidator,
	editPublisherPasswordValidator,
	editPublisherValidator,
	publisherIdValidator,
	requestScriptChangeValidator
} from '../validators';
import { AuthMiddleware, PublisherProfileMiddleware } from '../middlewares';
import { requestScriptChange } from '../controllers/Publisher.controller';
require('dotenv').config({
	path: path.resolve(__dirname, '../../.env')
});
let prefix = '/publisher';
export const PublisherRouter = express.Router();

PublisherRouter.post(
	`${prefix}`,
	// AuthMiddleware([ 'ADMIN' ]),
	createPublisherValidator,
	createPublisher
);

PublisherRouter.post(
	`${prefix}/:publisher_id/script-change`,
	AuthMiddleware([ 'PUBLISHER', 'ADMIN' ]),
	requestScriptChangeValidator,
	requestScriptChange
);

PublisherRouter.put(
	`${prefix}/:publisher_id`,
	AuthMiddleware([ 'ADMIN', 'PUBLISHER' ]),
	PublisherProfileMiddleware,
	editPublisherValidator,
	editPublisher
);
PublisherRouter.put(
	`${prefix}/:publisher_id`,
	AuthMiddleware([ 'ADMIN', 'PUBLISHER' ]),
	PublisherProfileMiddleware,
	editPublisherPasswordValidator,
	editPublisher
);

PublisherRouter.get(
	`${prefix}/`,
	AuthMiddleware([ 'ADMIN', 'PUBLISHER' ]),
	// PublisherProfileMiddleware,
	// publisherIdValidator,
	getAllPublishers
);

PublisherRouter.get(
	`${prefix}/:publisher_id`,
	AuthMiddleware([ 'ADMIN', 'PUBLISHER' ]),
	PublisherProfileMiddleware,
	publisherIdValidator,
	getPublisher
);

PublisherRouter.delete(
	`${prefix}/:publisher_id`,
	AuthMiddleware([ 'ADMIN' ]),
	publisherIdValidator,
	deletePublisher
);
