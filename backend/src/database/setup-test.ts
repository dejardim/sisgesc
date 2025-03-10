import { AppDataSource } from '../database/app-data-source';

afterAll(async () => {
  await AppDataSource.destroy();
});
