import { Request, Response, NextFunction } from 'express-serve-static-core';
import { HttpStatusCode } from '../constants/http-status-code';

import { API_KEY } from '../config/env';
import { ErrorsMessages } from '../constants/error-messages';

export const requireAPIKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== API_KEY) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({ error: ErrorsMessages.UNAUTHORIZED, details: 'API key is missing or invalid' });
    return;
  }

  next();
};
