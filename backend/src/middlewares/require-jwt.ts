import { expressjwt, } from 'express-jwt';
import { JWT_SECRET } from '../config/env';

export const requireJwt = expressjwt({
  secret: JWT_SECRET || 'default_secret',
  algorithms: ['HS256'],
  credentialsRequired: true
});
