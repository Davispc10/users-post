import * as path from 'path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'manager',
  entities: [
    path.resolve(__dirname, '..', 'users', 'entities', '*'),
    path.resolve(__dirname, '..', 'posts', 'entities', '*')
  ],
  logging: true,
  // migrationsRun: true
  synchronize: true
};

module.exports = options;
