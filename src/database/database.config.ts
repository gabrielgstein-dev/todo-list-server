import { enviroment } from '../enviroment';
import { DbType } from '../shared/types/common.type';
import * as entities from './entities';
import * as path from 'path';

console.log(`${__dirname}/migrations/*.ts`);
export default {
  type: enviroment.DATABASE_TYPE as DbType,
  host: enviroment.DATABASE_HOST,
  port: +enviroment.DATABASE_PORT,
  username: enviroment.DATABASE_USER,
  password: enviroment.DATABASE_PASSWORD,
  database: enviroment.DATABASE_DB,
  entities: Object.values(entities),
  migrations: [path.resolve(__dirname, `./migrations/*.ts`)],
  synchronize: false,
};
