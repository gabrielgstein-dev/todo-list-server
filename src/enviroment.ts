import { config } from 'dotenv';
config();
export const enviroment = {
  get PORT() {
    return process.env.PORT || 3000;
  },
  get DATABASE_TYPE(): string {
    return process.env.DATABASE_TYPE || 'postgres';
  },
  get DATABASE_DB() {
    return process.env.DATABASE_DB;
  },
  get DATABASE_HOST() {
    return process.env.DATABASE_HOST;
  },
  get DATABASE_PORT() {
    return process.env.DATABASE_PORT;
  },
  get DATABASE_USER() {
    return process.env.DATABASE_USER;
  },
  get DATABASE_PASSWORD() {
    return process.env.DATABASE_PASSWORD;
  },
};
