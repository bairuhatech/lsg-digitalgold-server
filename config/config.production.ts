import { Dialect } from 'sequelize/types';

export const config = {
  database: {
    dialect: 'postgres' as Dialect,
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'qwerty',
    database: 'lsg-digitalgold',
    logging: false,
  },
  jwtPrivateKey: 'jwtPrivateKey',
};
