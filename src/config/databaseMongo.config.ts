import * as path from 'path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const optionsMongo: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: 'mongodb://localhost:27017/books',
  entities: [
    path.resolve(__dirname, '..', 'users', 'entities', '*'),
    path.resolve(__dirname, '..', 'posts', 'entities', '*'),
    path.resolve(__dirname, '..', 'books', 'entities', '*')
  ],
  logging: true,
  // migrationsRun: true
  synchronize: true,
  useUnifiedTopology: true
};

module.exports = optionsMongo;
