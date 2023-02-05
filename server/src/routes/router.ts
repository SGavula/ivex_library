import { app } from '../app';
import { UserRouter, AuthRouter, HighlightRouter, PublisherRouter } from './';
import path from 'path';
import { ScriptRouter } from './scripts.router';
import { AdminRouter } from './admin.router';
import { AnalyticsRouter } from './Analytics.router';
import { CategoryRouter } from './Cateogies.router';
import { SubRouter } from './subscription.router';

require('dotenv').config({
	path: path.resolve(__dirname, '../../.env')
});

const APP_ENVIRONMENT: string = process.env.APP_ENVIRONMENT!;
let prefix: string;
if (APP_ENVIRONMENT === 'development') prefix = '/api';
else if (APP_ENVIRONMENT === 'production') prefix = '';
else prefix = '/api';

app.use(`${prefix}`, UserRouter);
app.use(`${prefix}`, AuthRouter);
app.use(`${prefix}`, HighlightRouter);
app.use(`${prefix}`, ScriptRouter);
app.use(`${prefix}`, PublisherRouter);
app.use(`${prefix}`, AdminRouter);
app.use(`${prefix}`, AnalyticsRouter);
app.use(`${prefix}`, CategoryRouter);
app.use(`${prefix}`, SubRouter);

export default app;
