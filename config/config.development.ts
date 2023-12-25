import { Dialect } from 'sequelize/types';

export const config = {
  database: {
    dialect: 'postgres' as Dialect,
    host: 'postgres://bairuhapgsqluser:BAiruhamysqluser123_@51.159.104.4:5432/ls-digitalgold',
    port: 5432,
    username: 'postgres',
    password: 'BAiruhamysqluser123_',
    database: 'ls-digitalgold',
    logging: false,
  },
  jwtPrivateKey: 'jwtPrivateKey',
};
