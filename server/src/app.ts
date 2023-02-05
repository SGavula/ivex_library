import express, { Request, Response } from 'express';
// import bodyParser from 'body-parser';
import cors from 'cors';

const port = parseInt(process.env.PORT as string) || 8000;
import { DBConnect } from './database/connection';
import path from 'path';
import { pickedScriptEveryDay } from './jobs';

export const app: express.Application = express();

// @ts-ignore
app.use(
	cors({
		origin: '*'
	})
);

app.use((req, res, next) => {
	if (req.originalUrl === '/api/webhook') {
		console.log('skipping express.json');
		next();
	} else {
		express.json()(req, res, next);
	}
});

// Use static folder for pdf files
DBConnect();

// Router
require('./routes/router');
// Static files
app.use(express.static(path.join(__dirname, '../public/images')));
app.use(express.static(path.join(__dirname, '../../client/build')));

// Jobs
pickedScriptEveryDay();

app.get('/', (_req: Request, res: Response) => {
	res
		.status(200)
		.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`Express server listening on port ${port}!`);
	});
}
