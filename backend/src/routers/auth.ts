import { Router } from 'express';
import { body, checkExact, header } from 'express-validator';

import { requireJwt } from '../middlewares/require-jwt';
import { requireAPIKey } from '../middlewares/require-api-key';

import { signup } from './handlers/auth/signup';
import { signin } from './handlers/auth/signin';

const router = Router();

router.post(
  '/signup',
  requireAPIKey,
  header('x-api-key').exists().withMessage('API key is required'),
  checkExact([], { message: 'Only the specified fields are allowed' }),
  signup
);

router.post(
  '/signin',
  requireJwt,
  body('email').isEmail().withMessage('Email must be a valid email address'),
  body('password').isString().withMessage('Password must be a string'),
  checkExact([], { message: 'Only the specified fields are allowed' }),
  signin
);



export default router;
