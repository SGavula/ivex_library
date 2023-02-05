import express from 'express';
import { login } from '../controllers/';
import { loginValidator } from '../validators/Auth/auth.validator';

export const AuthRouter = express.Router();
const prefix: string = `/auth`;

AuthRouter.post(`${prefix}/login`, loginValidator, login);
