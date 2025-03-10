import { Request, Response } from 'express-serve-static-core';
import { validationResult } from 'express-validator';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AppDataSource } from '../../../database/app-data-source';
import { User } from '../../../database/entities/User';

import { JWT_SECRET } from '../../../config/env';
import { HttpStatusCode } from '../../../constants/http-status-code';
import { ErrorsMessages } from '../../../constants/error-messages';

export async function signin(req: Request, res: Response<object | { error: string; details?: string }>) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });

    console.error(`${req.ip} - - [ERROR] "${req.method} ${req.originalUrl}" Invalid request data`);
    console.error(`${req.ip} - - [ERROR] "${req.method} ${req.originalUrl}" "req.body" "${JSON.stringify(req.body)}"`);
    return;
  }

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    const { email, password } = req.body;

    const userEntity = await queryRunner.manager.findOne(User, { where: { email } });
    if (!userEntity) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        error: ErrorsMessages.NOT_FOUND,
        details: 'User not found'
      });
      console.error(`${req.ip} - - [ERROR] "${req.method} ${req.originalUrl}" "User not found" "${email}"`);
      return;
    }

    if (!userEntity.password) {
      res.status(HttpStatusCode.DATABASE_ERROR).json({
        error: ErrorsMessages.INTERNAL_SERVER_ERROR,
        details: 'User has no password'
      });
      console.error(`${req.ip} - - [ERROR] "${req.method} ${req.originalUrl}" "User has no password" "${email}"`);
      return;
    }

    const match = await bcrypt.compare(password, userEntity.password);
    if (!match) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        error: ErrorsMessages.UNAUTHORIZED,
        details: 'Invalid password'
      });
      console.error(`${req.ip} - - [ERROR] "${req.method} ${req.originalUrl}" "Invalid password" "${email}"`);
      return;
    }

    const token = jwt.sign(
      { userId: userEntity.uuid },
      JWT_SECRET || 'default_secret',
      { expiresIn: '1h' }
    );

    res.status(HttpStatusCode.OK).json({ token });
  } catch (error) {
    await queryRunner.rollbackTransaction();
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: ErrorsMessages.INTERNAL_SERVER_ERROR,
      details: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
    console.error(`${req.ip} - - [ERROR] "${req.method} ${req.originalUrl}" "Internal server error" "${error}"`);
  } finally {
    await queryRunner.release();
  }
}
