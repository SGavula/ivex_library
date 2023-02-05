import path from 'path';
import mongoose from 'mongoose';
import { SyncDB } from './syncDb';
require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env'),
});

let db_url = 'mongodb://localhost:27017/ivex';
if (process.env.NODE_ENV == 'PROD') {
  db_url =
    process.env.DB_URL ||
    'mongodb://localhost:27017/ivex';
}
if (process.env.NODE_ENV == 'test')
  db_url = 'mongodb://0.0.0.0:27017/ivex-testing';

console.log(process.env.NODE_ENV);

export const DBConnect = async () => {
  let db;
  if (process.env.NODE_ENV == 'PROD') {
    db = await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      ssl: true,
      sslValidate: false,
      sslCA: require('fs').readFileSync(
        path.join(__dirname, '../../../cert.pem')
      ),
    });
  } else {
    db = await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
    });
  }
  if (db) {
    console.log('Database connected');
    console.log('Syncing db');
    SyncDB();
  }
  if (!db)
    throw new Error(
      'Database connection failed!'
    );
};
