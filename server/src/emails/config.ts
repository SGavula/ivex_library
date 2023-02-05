import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env'),
});

export const transporter =
  nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    auth: {
      user: 'apikey',
      pass: process.env.EMAIL_PASS,
    },
  });
transporter.use(
  'compile',
  hbs({
    // @ts-expect-error
    viewEngine: {
      engine: 'express-handlebars',
      defaultLayout:
        './src/emails/templates/main',
    },
    viewPath: './src/emails/templates',
  })
);
