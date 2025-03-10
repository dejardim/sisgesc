import { Request, Response } from 'express-serve-static-core';
import { validationResult } from 'express-validator';

import bcrypt from 'bcrypt';

import { AppDataSource } from '../../../database/app-data-source';
import { Role } from '../../../database/entities/Role';
import { User } from '../../../database/entities/User';

import { HttpStatusCode } from '../../../constants/http-status-code';
import { ErrorsMessages } from '../../../constants/error-messages';

export async function signup(req: Request, res: Response<object | { error: string; details?: string }>) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });

    console.error(`${req.ip} - - [ERROR] "${req.method} ${req.originalUrl}" Invalid request data`);
    console.error(`${req.ip} - - [ERROR] "${req.method} ${req.originalUrl}" "req.headers" "${JSON.stringify(req.headers)}"`);
    return;
  }

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  try {
    const { email, password, role, name } = req.body;

    const roleEntity = await queryRunner.manager.findOne(Role, { where: { uuid: role } });
    if (!roleEntity) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        error: ErrorsMessages.NOT_FOUND,
        details: 'Role not found'
      });
      console.error(`${req.ip} - - [ERROR] "${req.method} ${req.originalUrl}" "Role not found" "${role}"`);
      return;
    }

    const userEntity = await queryRunner.manager.findOne(User, { where: { email } });
    if (userEntity) {
      res.status(HttpStatusCode.CONFLICT).json({
        error: ErrorsMessages.CONFLICT,
        details: 'User already exists'
      });
      console.error(`${req.ip} - - [ERROR] "${req.method} ${req.originalUrl}" "User already exists" "${email}"`);
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = queryRunner.manager.create(User, {
      name,
      email,
      role: roleEntity,
      password: hashedPassword
    });

    await queryRunner.manager.save(newUser);

    res.status(201).json({ message: 'User created successfully' });
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
