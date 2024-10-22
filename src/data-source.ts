import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Service } from './entities/service.entitiy';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'crisfagra',
  database: process.env.DB_NAME || 'simphonyDB',
  entities: [User, Service],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
