import { Dialect } from 'sequelize/types';

export const config = {
  database: {
    dialect: 'postgres' as Dialect,
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'anshab',
    database: 'lsg-digitalgold',
    logging: false,
  },
  jwtPrivateKey: 'jwtPrivateKey',
};
