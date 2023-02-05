import express from 'express';
import {
	createAnalyticsEntryValidator,
	createScriptAnalyticsEntryValidator
} from '../validators';
import { AuthMiddleware } from '../middlewares';
import {
	createAnalyticsEntry,
	CreateScriptAnalyticsEntry,
	getAdminTotalPayments,
	getAdminTotalProfits,
	getAdminTotalViews,
	getAnalyticsForPublisher,
	getPublisherAllTimeViews,
	getPublisherPayForMonths,
	getPublisherPayFromAnalytics
} from '../controllers/';

export const AnalyticsRouter = express.Router();
const prefix: string = `/analytics`;

AnalyticsRouter.post(
	`${prefix}`,
	AuthMiddleware([ 'ADMIN', 'USER' ]),
	// User Middleware
	createAnalyticsEntryValidator,
	createAnalyticsEntry
);

AnalyticsRouter.post(
	`${prefix}/script/:script_id`,
	// AuthMiddleware([ 'ADMIN', 'USER' ]),
	createScriptAnalyticsEntryValidator,
	CreateScriptAnalyticsEntry
);

AnalyticsRouter.get(
	`${prefix}/publisher/:publisher_id/script/:script_id/`,
	AuthMiddleware([ 'ADMIN', 'PUBLISHER' ]),
	// getAnalyticsForPublisherValidator,
	getAnalyticsForPublisher
);

AnalyticsRouter.get(
	`${prefix}/publisher/:publisher_id/month/:month_num/pay`,
	AuthMiddleware([ 'ADMIN', 'PUBLISHER' ]),
	// getAnalyticsForPublisherValidator,
	getPublisherPayFromAnalytics
);

AnalyticsRouter.get(
	`${prefix}/publisher/:publisher_id/months/pay`,
	AuthMiddleware([ 'ADMIN', 'PUBLISHER' ]),
	// getAnalyticsForPublisherValidator,
	getPublisherPayForMonths
);

AnalyticsRouter.get(
	`${prefix}/publisher/:publisher_id/views/`,
	AuthMiddleware([ 'ADMIN', 'PUBLISHER' ]),
	getPublisherAllTimeViews
);

AnalyticsRouter.get(
	`${prefix}/admin/views/:type`,
	AuthMiddleware([ 'ADMIN' ]),
	getAdminTotalViews
);

AnalyticsRouter.get(
	`${prefix}/admin/payments/:type`,
	AuthMiddleware([ 'ADMIN' ]),
	getAdminTotalPayments
);

AnalyticsRouter.get(
	`${prefix}/admin/profits/:type`,
	// AuthMiddleware(['ADMIN'])
	getAdminTotalProfits
);
