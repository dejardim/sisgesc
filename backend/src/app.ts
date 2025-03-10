import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import 'reflect-metadata';
import { AppDataSource } from './database/app-data-source';
import { CORS_WHITELIST } from './config/env';

import enrollmentRouter from './routers/enrollments';

export const createExpressApp = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }

  const app = express();

  const whitelist = CORS_WHITELIST?.split(',') || [];
  const corsOptions = { origin: whitelist };
  app.use(cors(corsOptions));

  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(helmet());

  app.use('/api/enrollments', enrollmentRouter);

  return app;
};
