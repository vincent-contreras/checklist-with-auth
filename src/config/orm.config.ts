import * as path from 'path';

import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const connectionOptions: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  logger: 'advanced-console',
  synchronize: false,
  supportBigNumbers: true,
  bigNumberStrings: false,
  migrations: [path.join(__dirname, '..', 'migrations/*{.ts,.js}')],
  entities: [path.join(__dirname, '..', '**/*.entity{.ts,.js}')],
  migrationsRun: process.env.IS_MIGRATE_RUN == 'true' ? true : false,
  cli: {
    migrationsDir: 'src/migrations'
  }
};

export = connectionOptions;
