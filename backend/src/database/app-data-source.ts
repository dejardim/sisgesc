import { DataSource } from 'typeorm';
import { TYPEORM_DATABASE, TYPEORM_HOST, TYPEORM_PASSWORD, TYPEORM_PORT, TYPEORM_USERNAME } from '../config/env';

import { User } from './entities/User';
import { Role } from './entities/Role';
import { Contact } from './entities/Contact';
import { Grade } from './entities/Grade';
import { Shift } from './entities/Shift';
import { Enrollment } from './entities/Enrollment';
import { Student } from './entities/Student';
import { Tuition } from './entities/Tuition';
import { Guardian } from './entities/Guardian';

import { InitialDatabase1741042601338 } from './migrations/1741042601338-InitialDatabase';
import { InitialRows1741042613699 } from './migrations/1741042613699-InitialRows';
import { AddCodeColumnToTheTuitionTable1741451960359 } from './migrations/1741451960359-AddCodeColumnToTheTuitionTable';

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: Number(TYPEORM_PORT),
  host: TYPEORM_HOST,
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  entities: [
    User,
    Role,
    Contact,
    Grade,
    Shift,
    Enrollment,
    Student,
    Tuition,
    Guardian,
  ],
  migrations: [
    InitialDatabase1741042601338,
    InitialRows1741042613699,
    AddCodeColumnToTheTuitionTable1741451960359,
  ],
  logging: false,
  synchronize: false,
});
